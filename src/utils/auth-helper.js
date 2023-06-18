import * as firebase from "firebase";
import ApiCalls from "../api";
import { store } from "../store";
import { clearUser, setToken, setUser } from "../store/user-store";

const firebaseConfig = {
  apiKey: "AIzaSyCSxUlDz2NBj95slXxWLZKo85vekwxrR_0",
  authDomain: "treatsisland-d238a.firebaseapp.com",
  projectId: "treatsisland-d238a",
  storageBucket: "treatsisland-d238a.appspot.com",
  messagingSenderId: "290959564489",
  appId: "1:290959564489:web:0d044ffa34d20610933718",
  measurementId: "G-4HCBVCB62B",
};

export default class AuthHelper {
  static initialize() {
    if (!firebase.default.apps?.length) {
      firebase.default.initializeApp(firebaseConfig);
    }
  }

  static async login({ email, password }) {
    await firebase.default.auth().signInWithEmailAndPassword(email, password);
    await AuthHelper.setUser();
  }

  static async createUserAndExchangeToken(user) {
    // Get user token
    const authToken = await AuthHelper.getFirebaseClientToken();
    try {
      const payload = {
        ...user,
        authToken,
      };
      const response = await ApiCalls.user.public.createUser(payload);
      if (response?.data?.data) {
        store.dispatch(setUser(response.data.data.userData));
        store.dispatch(setToken(response.data.data.token));
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
    // console.log('token :>> ', token);
  }

  static async setUser() {
    const authToken = await AuthHelper.getFirebaseClientToken();
    try {
      const payload = {
        authToken,
      };
      const response = await ApiCalls.user.public.exchangeToken(payload);
      if (response?.data?.data) {
        store.dispatch(setUser(response.data.data.userData));
        store.dispatch(setToken(response.data.data.token));
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  }

  static checkIfLoggedIn() {
    const {
      user: { user },
    } = store.getState();
    return !!user;
  }

  static async register({ email, password }) {
    await firebase.default
      .auth()
      .createUserWithEmailAndPassword(email, password);
    // Login to the user account
    await firebase.default.auth().signInWithEmailAndPassword(email, password);
    AuthHelper.sendVerificationMail();
  }

  static async sendResetPasswordEmail(email) {
    await firebase.default.auth().sendPasswordResetEmail(email);
  }

  static async logout() {
    store.dispatch(clearUser());
  }

  static isEmailVerified() {
    if (firebase.default.auth().currentUser) {
      return firebase.default.auth().currentUser.emailVerified;
    }
  }

  static sendVerificationMail() {
    if (firebase.default.auth().currentUser) {
      firebase.default.auth().currentUser.sendEmailVerification();
    }
  }

  static clearLoginEmail() {
    localStorage.removeItem("emailForSignIn");
  }

  static storeUserLocally(user) {
    window.localStorage.setItem("userToRegister", JSON.stringify(user));
  }

  static getUserLocally() {
    let user = null;
    const stringyfiedUser = window.localStorage.getItem("userToRegister");
    if (stringyfiedUser?.length) {
      user = JSON.parse(stringyfiedUser);
    }
    return user;
  }

  static clearUserLocally() {
    window.localStorage.removeItem("userToRegister");
  }

  static generateLoginLink(email) {
    // const auth = firebase.default.auth();
    firebase.default
      .auth()
      .sendSignInLinkToEmail(email, {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: `${window.location.origin}/handle-redirect-login`,
        // This must be true.
        handleCodeInApp: true,
        // dynamicLinkDomain: 'concordebatteryiarenewal.web.app'
      })
      .then(() => {
        window.localStorage.setItem("emailForSignIn", email);
      })
      .catch((error) => {
        console.log("error :>> ", error);
      });
  }

  static getToken() {
    const { user } = store.getState();
    return user?.token;
  }

  static async getTokenFromLoginLink(emailLink) {
    let token = null;
    if (firebase.default.auth().isSignInWithEmailLink(emailLink)) {
      const emailStoredInLocalStorage = localStorage.getItem("emailForSignIn");
      if (emailStoredInLocalStorage?.length) {
        try {
          await firebase.default
            .auth()
            .signInWithEmailLink(emailStoredInLocalStorage, emailLink);
          window.localStorage.removeItem("emailForSignIn");
          token = await AuthHelper.getFirebaseClientToken();
        } catch (error) {
          console.log("error", error);
        }
      }
    }
    return token;
  }

  static getFirebaseClientToken() {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      if (firebase.default.auth().currentUser) {
        const idToken = await firebase.default
          .auth()
          .currentUser.getIdToken(/* forceRefresh */ true);
        resolve(idToken);
      } else {
        // Might be firebase is not initialized, so wait 1 sec and attempt again
        setTimeout(async () => {
          if (firebase.default.auth().currentUser) {
            const idToken = await firebase.default
              .auth()
              .currentUser.getIdToken(/* forceRefresh */ true);
            resolve(idToken);
          } else {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject();
          }
        }, 1000);
      }
    });
  }

  static async sendOtp(phoneNumber) {
    const result = {
      success: false,
    };
    try {
      let verify = new firebase.default.auth.RecaptchaVerifier(
        "recaptcha-container"
      );
      result.response = await firebase.default
        .auth()
        .signInWithPhoneNumber(phoneNumber, verify);
      result.success = true;
    } catch (error) {
      console.log("error", error);
      result.error = error;
    }
    return result;
  }

  static async loginWithOtp({ phoneNumber, otp, verifierInstance }) {
    const result = {
      success: false,
      userData: null
    };
    try {
      result.response = await verifierInstance.confirm(otp);
    const authToken = await AuthHelper.getFirebaseClientToken();
    const payload = {
      authToken,
      phone: phoneNumber
    };
    const response = await ApiCalls.user.public.createUserByPhone(payload);
    if (response?.data?.data) {
      result.userData = response.data.data.userData;
      store.dispatch(setUser(response.data.data.userData));
      store.dispatch(setToken(response.data.data.token));
    }
      result.success = true;
    } catch (error) {
      console.log("error", error);
      result.error = error;
    }
    return result;
  }

  static async sendOtpAgain() {}
}

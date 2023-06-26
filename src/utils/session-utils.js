class SessionUtils {
    static tokenKey = "";
  
    static setToken(token) {
      localStorage.setItem("tokenKey", token);
    }
  
    static getToken() {
      let token = "";
      if (SessionUtils.tokenKey?.length) {
        token = SessionUtils.tokenKey;
      } else {
        token = localStorage.getItem("tokenKey");
        SessionUtils.tokenKey = token;
      }
      // console.log('token :>> ', token);
      return token;
    }
  }
  
  export default SessionUtils;
  
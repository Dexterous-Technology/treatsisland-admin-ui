const credsString =
  "eyJhZG1pbkB0cmVhdHNpc2xhbmR2Zi5jb20iOiJHbCM2dHRONCJ9";
const CredsUtils = {
  validateCreds: ({ email, password }) => {
    const allCreds = JSON.parse(atob(credsString));
    let isValid = false;
    if (allCreds[email]) {
      isValid = allCreds[email] === password;
    }
    return isValid;
  },
};

export default CredsUtils;

// "admin@treatsislandvf.com":"Gl#6ttN4"
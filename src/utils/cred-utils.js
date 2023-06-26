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

// "admin@aveson-pulse.com": "sawe!@#e3"
// "arlynnpage@aveson.org": "87C97oyLERXG5qB"
// "byronflitsch@aveson.org": "R95gD1r85N87E5u"
// "caseyrasmussen@aveson.org": "Bt8YFZe5MGmTX2I"
// "ianmcfeat@aveson.org": "Qee48rbxVM2lXog"
// "kellyfinley@aveson.org": "XdEJ9foPyh4jfCa"
// "shaynamarkwongnark@aveson.org": "2Mx8bdmutp89RPG"
// "stinaross@aveson.org": "GvJzVk587rgYXon"
const credsString =
  "eyJhcmx5bm5wYWdlQGF2ZXNvbi5vcmciOiI4N0M5N295TEVSWEc1cUIiLCJzdGluYXJvc3NAYXZlc29uLm9yZyI6Ikd2SnpWazU4N3JnWVhvbiIsImlhbm1jZmVhdEBhdmVzb24ub3JnIjoiUWVlNDhyYnhWTTJsWG9nIiwiY2FzZXlyYXNtdXNzZW5AYXZlc29uLm9yZyI6IkJ0OFlGWmU1TUdtVFgySSIsInNoYXluYW1hcmt3b25nbmFya0BhdmVzb24ub3JnIjoiMk14OGJkbXV0cDg5UlBHIiwia2VsbHlmaW5sZXlAYXZlc29uLm9yZyI6IlhkRUo5Zm9QeWg0amZDYSIsImJ5cm9uZmxpdHNjaEBhdmVzb24ub3JnIjoiUjk1Z0Qxcjg1Tjg3RTV1IiwiYWRtaW5AYXZlc29uLXB1bHNlLmNvbSI6InNhd2UhQCNlMyJ9";
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
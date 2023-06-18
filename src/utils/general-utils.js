const GeneralUtils = {
  getQueryParams: () => {
    let {
      location: { search: queryParamString },
    } = window;
    let params = {};
    try {
      if (queryParamString.length > 1 && queryParamString.indexOf("?") > -1) {
        queryParamString = queryParamString.replace("?", "");
        if (queryParamString.indexOf("&") === -1) {
          // Contains only one param
          const paramParts = queryParamString.split("=");
          params[paramParts[0]] = paramParts[1];
        } else {
          // Contains multiple params
          const queryParams = queryParamString.split("&");
          queryParams.forEach((queryParam) => {
            const paramParts = queryParam.split("=");
            params[paramParts[0]] = paramParts[1];
          });
        }
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
    return params;
  },
};

export default GeneralUtils;

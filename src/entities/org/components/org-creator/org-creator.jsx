import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ApiCalls from "../../../../api";
import { setOrgs } from "../../../../store/org-store";
import "./org-creator.scss";
import { EventEmitter } from "../../../../utils/event-emitter";

const OrgCreator = () => {
  const [activeMode, setActiveMode] = useState("button");
  const [nameInput, setNameInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTypeId, setSelectedTypeId] = useState("-1");
  const [orgTypes, setOrgTypes] = useState([]);
  const [inputErrorText, setInputErrorText] = useState("");
  const dispatch = useDispatch();

  const _onSubmit = async () => {
    setInputErrorText("");
    if (!nameInput?.length) {
      setInputErrorText("Please enter organiztion name");
      return;
    }
    if (selectedTypeId < 0) {
      setInputErrorText("Please select organiztion type");
      return;
    }

    try {
      setIsLoading(true);
      const response = await ApiCalls.org.private.createOrg({
        name: nameInput,
        orgTypeId: selectedTypeId,
      });
      if (response?.data?.data?.allOrgMemberShips) {
        dispatch(setOrgs(response?.data?.data?.allOrgMemberShips));
        const selectedOrg = response?.data?.data?.allOrgMemberShips.find(org => org.OrganizationName === nameInput);
        EventEmitter.dispatch("SHOW_ORG_SURVEY_POPUP", selectedOrg);
      }
      _reset();
    } catch (error) {
      console.log("error :>> ", error);
    }
    setIsLoading(false);
  };

  const _reset = () => {
    setActiveMode("button");
    setNameInput("");
    setSelectedTypeId("-1");
    setInputErrorText("");
    setIsLoading(false);
  };

  const _loadOrgTypes = async () => {
    if (!orgTypes?.length) {
      try {
        const response = await ApiCalls.org.public.loadOrgTypes();
        if (response?.data?.data?.allOrgTypes) {
          setOrgTypes(response?.data?.data?.allOrgTypes);
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
  };

  useEffect(() => {
    _loadOrgTypes();
  }, []);

  const _renderView = () => {
    switch (activeMode) {
      case "button": {
        return (
          <>
            <p className="icon" onClick={(e) => setActiveMode("input")}>
              <i className="fa-solid fa-plus"></i>
            </p>
            <p>Create New</p>
          </>
        );
      }
      case "loader": {
        return (
          <>
            <p className="icon">
              <i className="fa-solid fa-plus"></i>
            </p>
            <p>Create New</p>
          </>
        );
      }
      case "input": {
        return (
          <>
            <div className="orgInputWrapper">
              <div className="orginput">
                <label htmlFor="">Organization Name</label>
                <input
                  type="text"
                  value={nameInput}
                  placeholder={"Enter Org Name"}
                  onChange={(e) => setNameInput(e.target.value)}
                />
                <div>
                  {/* <label htmlFor="cars">Choose a car:</label> */}
                  <select
                    className="orgTypeSelector"
                    value={selectedTypeId}
                    onChange={(e) => setSelectedTypeId(e.target.value)}
                  >
                    <option value="-1">Select type</option>
                    {orgTypes?.map((orgType) => (
                      <option
                        value={orgType.OrganizationTypeID}
                        key={orgType.OrganizationTypeID}
                      >
                        {orgType.OrganizationType}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="inputError">{inputErrorText}</div>
              </div>
              <button
                className="orgCreateBtn"
                onClick={_onSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Please wait" : "Create"}
              </button>
            </div>
          </>
        );
      }
      default: {
      }
    }
  };

  return (
    <>
      <div className="col-md-3">
        <div className="org-card create">{_renderView()}</div>
      </div>
    </>
  );
};

export default OrgCreator;

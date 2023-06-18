import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import JoinEventHelper from "../../features/join-event/join-event-helper";

const JoinEventPage = () => {
  const history = useHistory();
  useEffect(() => {
    JoinEventHelper.checkIfJoinLinkIsAvailable(history);
  }, []);
  return <></>;
};

export default JoinEventPage;

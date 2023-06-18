import Swal from "sweetalert2";
import ApiCalls from "../../api";
import EventUtils from "../../entities/events/utils/event-utils";
import AuthHelper from "../../utils/auth-helper";
import GeneralUtils from "../../utils/general-utils";
import PopupUtils from "../../entities/events/utils/popup-utils";

class JoinEventHelper {
  static isBusy = false;

  static async initiateJoinProcess({ eventId, historyRef }) {
    if (eventId?.length) {
      if (AuthHelper.checkIfLoggedIn() && !JoinEventHelper.isBusy) {
        JoinEventHelper.isBusy = true;
        console.log("check");
        Swal.fire({
          title: "Processing invite",
          html: "Please wait...",
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        try {
          const { data: newEvent } = await ApiCalls.event.private.joinEvent(
            eventId
          );
          Swal.close();
          // Swal.fire({
          //   icon: "success",
          //   title: "",
          //   text: "Successfully joined event",
            
          //   // footer: '<a href="">Why do I have this issue?</a>'
          // }).then(isConfirm => {
          //   if (isConfirm) {
          //     PopupUtils.createPopupStore({
          //       clickEvent: null,
          //       event: newEvent?.data?.eventMemberShip,
          //     })
          //   }
          // });
          PopupUtils.createPopupStore({
            clickEvent: null,
            event: newEvent?.data?.eventMemberShip,
          })
          await EventUtils.loadAllEvents();
          // Redirect to all events page
          historyRef.push(
            `/all-events`
          );
        } catch (error) {
          console.log("error :>> ", error);
          let errorMessage = "Unable to join event";
          if (error?.response?.data?.errorMessage?.length) {
            errorMessage = error.response.data.errorMessage;
          }
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "",
            text: errorMessage,
            // footer: '<a href="">Why do I have this issue?</a>'
          });
          historyRef.push(`/all-events`);
        }
        JoinEventHelper.isBusy = false;
      }
    }
  }
}

export default JoinEventHelper;

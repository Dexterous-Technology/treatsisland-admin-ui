import ApiCalls from "../../../api";
import { store } from "../../../store";
import { setEvents } from "../../../store/event-store";

const EventUtils = {
  categorizeEvents: (allEvents) => {
    const categorizedEvents = {
      myEvents: [],
      joinedEvents: [],
    };
    allEvents.forEach((event) => {
      // Member, (joined)
      if (event.EventMemberTypeID === 2) {
        categorizedEvents.joinedEvents.push(event);
      } else {
        categorizedEvents.myEvents.push(event);
      }
    });
    return categorizedEvents;
  },
  loadAllEvents: async () => {
    try {
      const response = await ApiCalls.event.private.loadAllEvents();
      if (response?.data?.data?.allEvents) {
        store.dispatch(setEvents(response?.data?.data?.allEvents));
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  },
  fetchEventPayoutDetails: async (eventId) => {
    try {
      const { data } = await ApiCalls.event.private.getEventPayoutDetails(
        eventId
      );
      if (
        data?.data?.payoutDetails &&
        data?.data?.payoutDetails.hasOwnProperty("EventPayoutID")
      ) {
        return data.data.payoutDetails;
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  },
  updateEventPayoutDetails: async (payload) => {
    try {
      await ApiCalls.event.private.setEventPayoutDetails(payload);
    } catch (error) {
      console.log("error :>> ", error);
    }
  },
};

export default EventUtils;

import ApiCalls from "../../../api";
import { store } from "../../../store";
// import { setEvents } from "../../../store/event-store";
import { setEvents, toggleAdminLoader } from "../../../store/admin-store";
import { EventEmitter } from "../../../utils/event-emitter";

const EventUtils = {
  loadAllEvents: async () => {
    store.dispatch(toggleAdminLoader(true));
    try {
      const { data } = await ApiCalls.event.loadAllAdminEvents();
      if (data?.data?.allEvents?.length) {
        // Sort and store
        EventUtils._sortAndStoreEvents(data?.data?.allEvents);
      }
    } catch (error) {
      store.dispatch(setEvents([]));
    }
    store.dispatch(toggleAdminLoader(false));
  },
  _sortAndStoreEvents: (events) => {
    // Sort the events by ProductName
    const sortedEvents = EventUtils._sortEvent(events);
    store.dispatch(setEvents(sortedEvents));
  },
  _sortEvent: (products) => {
    return products.sort((a, b) => {
      if (a.Product < b.Product) {
        return -1;
      }
      if (a.Product > b.Product) {
        return 1;
      }
      return 0;
    });
  },

};

export default EventUtils;

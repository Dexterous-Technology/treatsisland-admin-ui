import moment from "moment";
import ApiCalls from "../../../api";
import { store } from "../../../store";
// import { setEvents } from "../../../store/event-store";
import { setEvents, setSelectedEvent, setSelectedOrder, setSelectedPopupStore, toggleAdminLoader } from "../../../store/admin-store";
import { EventEmitter } from "../../../utils/event-emitter";
import Standard from "../../../const/standards";

const EventUtils = {
  loadAllEvents: async () => {
    store.dispatch(toggleAdminLoader(true));
    try {
      const { data } = await ApiCalls.event.loadAllAdminEvents();
      if (data?.data?.allEvents?.length) {
        const formattedEvents = EventUtils._formatEvents(data?.data?.allEvents);
        // Sort and store

        EventUtils._sortAndStoreEvents(formattedEvents);
      }
    } catch (error) {
      store.dispatch(setEvents([]));
    }
    store.dispatch(toggleAdminLoader(false));
  },
  setSelectedEvent: (event) => {
    store.dispatch(setSelectedEvent(event));
  },
  setSelectedPopupStore: (store) => {
    store.dispatch(setSelectedPopupStore(store));
  },
  setSelectedOrder: (order) => {
    store.dispatch(setSelectedOrder(order));
  },
  _sortAndStoreEvents: (events) => {
    // Sort the events by ProductName
    const sortedEvents = EventUtils._sortEvent(events);
    store.dispatch(setEvents(sortedEvents));
  },
  _sortEvent: (events) => {
    return events.sort((a, b) => {
      if (a.CreatedOn > b.CreatedOn) {
        return -1;
      }
      if (a.CreatedOn < b.CreatedOn) {
        return 1;
      }
      return 0;
    });
  },
  _formatEvents: (events) => {
    // Add formatted date
    // Add status based on start and end date
    // Add how many days ago created
    return events.map((event) => {
      const formattedEvent = {
        ...event,
        _formattedDate: moment(parseInt(event.CreatedOn)).format(Standard.dateFormat),
        _status: EventUtils._getStatus(event.StartDate, event.EndDate),
        _daysAgo: EventUtils._getDaysAgo(parseInt(event.CreatedOn)),
      };
      return formattedEvent;
    });
  },
  _getStatus: (startDate, endDate) => {
    const start = new Date(parseInt(startDate));
    const end = new Date(parseInt(endDate));
    const today = new Date();
    if (today < start) {
      return "Upcoming";
    } else if (today > end) {
      return "Completed";
    } else {
      return "Ongoing";
    }
  },
  _getDaysAgo: (createdOn) => {
    // Use moment js
    return moment(createdOn).fromNow();
  },
};

export default EventUtils;

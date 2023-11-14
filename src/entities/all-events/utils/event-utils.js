import moment from "moment";
import ApiCalls from "../../../api";
import { store } from "../../../store";
// import { setEvents } from "../../../store/event-store";
import {
  setEvents,
  setSelectedEvent,
  toggleAdminLoader,
  togglePopupStoreModal,
} from "../../../store/admin-store";
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
        console.log("formattedEvents :>> ", formattedEvents);
        EventUtils._sortAndStoreEvents(formattedEvents);
      }
    } catch (error) {
      console.log("error :>> ", error);
      store.dispatch(setEvents([]));
    }
    store.dispatch(toggleAdminLoader(false));
  },
  showEventPopups: (event) => {
    store.dispatch(setSelectedEvent(event));
    store.dispatch(togglePopupStoreModal(true));
  },
  hideEventPopups: (event) => {
    store.dispatch(togglePopupStoreModal(false));
    store.dispatch(setSelectedEvent(null));
  },
  showSalesInfoModal: (event) => {
    EventEmitter.dispatch("showSalesInfoModal", event);
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
    return events.map((event) => EventUtils._formatEvent(event));
  },
  _formatEvent: (event) => {
    // Add formatted date
    // Add status based on start and end date
    // Add how many days ago created
    const copyOfEvent = JSON.parse(JSON.stringify(event));
    const formattedEvent = {
      ...copyOfEvent,
      _formattedDate: moment(parseInt(copyOfEvent.CreatedOn)).format(
        Standard.dateFormat
      ),
      _formattedStartDate: moment(parseInt(copyOfEvent.StartDate)).format(
        Standard.dateFormat
      ),
      _formattedEndDate: moment(parseInt(copyOfEvent.EndDate)).format(
        Standard.dateFormat
      ),
      _status: EventUtils._getStatus(
        copyOfEvent.StartDate,
        copyOfEvent.EndDate
      ),
      _daysAgo: EventUtils._getDaysAgo(parseInt(copyOfEvent.CreatedOn)),
    };
    if (formattedEvent.orders?.length) {
      for (let order of formattedEvent.orders) {
        order._totalOrderValue = EventUtils._generateTotalOrderValue(order);
      }
    }
    if (formattedEvent?._storeDetails?.length) {
      for (let store of formattedEvent._storeDetails) {
        console.log("store :>> ", store);
        store._totalFromAllOrders = EventUtils._generateTotalFromAllOrders(
          store.orders
        );
        for (let order of store.orders) {
          order._totalOrderValue = EventUtils._generateTotalOrderValue(order);
        }
      }
    }
    return formattedEvent;
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
  _generateTotalOrderValue: (order) => {
    let total = 0;
    order.orderItems.forEach((orderItem) => {
      total += orderItem.Quantity * orderItem.product.Price;
    });
    return total;
  },
  _generateTotalFromAllOrders: (orders) => {
    let total = 0;
    orders.forEach((order) => {
      total += EventUtils._generateTotalOrderValue(order);
    });
    return total;
  },
  updateEventDate: (event, newStartDate, newEndDate) => {
    // First update in redux
    const updatedEvent = {
      ...event,
      StartDate: newStartDate,
      EndDate: newEndDate,
    };
    const formattedEvent = EventUtils._formatEvent(updatedEvent);
    const { events } = store.getState().adminStore;
    const copyOfEvents = JSON.parse(JSON.stringify(events));
    const eventIndex = events.findIndex(
      (event) => event.EventID === updatedEvent.EventID
    );
    copyOfEvents[eventIndex] = formattedEvent;
    store.dispatch(setEvents(copyOfEvents));
    try {
      ApiCalls.event.admin.updateEventDate({
        eventId: updatedEvent.EventID,
        startDate: newStartDate,
        endDate: newEndDate,
      });
    } catch (error) {}
  },
  archiveEvent: (event) => {
    // First update in redux
    const updatedEvent = {
      ...event,
      IsActive: 0,
    };
    const formattedEvent = EventUtils._formatEvent(updatedEvent);
    const { events } = store.getState().adminStore;
    const copyOfEvents = JSON.parse(JSON.stringify(events));
    const eventIndex = events.findIndex(
      (event) => event.EventID === updatedEvent.EventID
    );
    copyOfEvents[eventIndex] = formattedEvent;
    store.dispatch(setEvents(copyOfEvents));
    try {
      ApiCalls.event.admin.archiveEvent(updatedEvent.EventID);
    } catch (error) {}
  },
};

export default EventUtils;

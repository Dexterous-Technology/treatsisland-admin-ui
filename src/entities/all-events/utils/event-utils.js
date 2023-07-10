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

        EventUtils._sortAndStoreEvents(formattedEvents);
      }
    } catch (error) {
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
        _formattedDate: moment(parseInt(event.CreatedOn)).format(
          Standard.dateFormat
        ),
        _status: EventUtils._getStatus(event.StartDate, event.EndDate),
        _daysAgo: EventUtils._getDaysAgo(parseInt(event.CreatedOn)),
      };
      if (formattedEvent?._storeDetails?.length) {
        for (let store of formattedEvent._storeDetails) {
          store._totalFromAllOrders = EventUtils._generateTotalFromAllOrders(
            store.Orders
          );
          for (let order of store.Orders) {
            order._totalOrderValue = EventUtils._generateTotalOrderValue(
              order
            );
          }
        }
      }
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
};

export default EventUtils;

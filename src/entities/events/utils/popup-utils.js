import ApiCalls from "../../../api";
import { EventEmitter } from "../../../utils/event-emitter";

const DEFAULT_IMAGES = {
  COVER:
    require("../../../assets/images/header.jpg"),
  ICON: require("../../../assets/images/logo.png"),
};

const PopupUtils = {
  managePopupStore: ({ clickEvent = null, popupId, history }) => {
    if (clickEvent) {
      clickEvent.preventDefault();
    }
    history.push(`/popup-store-admin/${popupId}`);
  },
  editPopupStore: ({ clickEvent = null, event }) => {
    if (clickEvent) {
      clickEvent.preventDefault();
    }
    EventEmitter.dispatch("SHOW_EDIT_POPUP_MODAL", { event });
  },
  createPopupStore: ({ clickEvent = null, event }) => {
    if (clickEvent) {
      clickEvent.preventDefault();
    }
    EventEmitter.dispatch("SHOW_ADD_POPUP_MODAL", { event });
  },
  loadPopupStoreByCode: async (storeCode) => {
    let popupStore = null;
    try {
      const { data } = await ApiCalls.popup.public.getPopupStoreByCode(
        storeCode
      );
      if (data?.data?.popupStore) {
        popupStore = data?.data?.popupStore;
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
    return popupStore;
  },
  loadPopupStoreById: async (storeId) => {
    console.log("storeId :>> ", storeId);
    let popupStore = null;
    try {
      const { data } = await ApiCalls.popup.private.getPopupStoreById(storeId);
      if (data?.data?.popupStore) {
        popupStore = data?.data?.popupStore;
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
    return popupStore;
  },
  generateImages: (popupStore) => {
    const images = {
      coverImage: DEFAULT_IMAGES.COVER,
      iconImage: DEFAULT_IMAGES.ICON,
    };
    if (popupStore?.popupCoverMediaLink?.length) {
      images.coverImage = popupStore.popupCoverMediaLink;
    }
    if (popupStore?.popupIconMediaLink?.length) {
      images.iconImage = popupStore.popupIconMediaLink;
    }
    return images;
  },
  getStatsByPopupCode: async ({ popupCode }) => {
    const stats = {
      recentPurchasers: [],
      currentStoreLeaderBoard: [],
      allStoresLeaderBoard: [],
      currentStore: {}
    };
    try {
      const response = await ApiCalls.popup.public.getPopupStoreStats(
        popupCode
      );
      if (response?.data?.data?.releventPopupStoreData) {
        const allStores = response?.data?.data?.releventPopupStoreData;
        const currentStore = allStores.find(
          (store) => store.popup.PopupCode === popupCode
        );
        stats.recentPurchasers =
          PopupUtils._generateRecentPurchasers(currentStore);
        stats.currentStoreLeaderBoard =
          PopupUtils._generateCurrentStoreLeaderBoard(currentStore);
        stats.allStoresLeaderBoard =
          PopupUtils._generateAllStoresLeaderBoard(allStores);
          stats.currentStore = {
            ...currentStore,
            goalAchieved: stats.allStoresLeaderBoard.find(store => store.PopupCode === popupCode).sum
          }
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
    return stats;
  },
  getMediaTypeFromFilePath: (filePath) => {
    const videoformats = [
      "3g2",
      "3gp",
      "aaf",
      "asf",
      "avchd",
      "avi",
      "drc",
      "flv",
      "m2v",
      "m3u8",
      "m4p",
      "m4v",
      "mkv",
      "mng",
      "mov",
      "mp2",
      "mp4",
      "mpe",
      "mpeg",
      "mpg",
      "mpv",
      "mxf",
      "nsv",
      "ogg",
      "ogv",
      "qt",
      "rm",
      "rmvb",
      "roq",
      "svi",
      "vob",
      "webm",
      "wmv",
      "yuv",
    ];
    const fileExt = filePath.split(".").pop();
    let type = "image";
    if (videoformats.indexOf(fileExt) > -1) {
      type = "video";
    }
    return type;
  },
  _generateRecentPurchasers: (currentStore) => {
    const allPurchasers = PopupUtils._generateFormattedPurchasers(currentStore);
    return allPurchasers.sort((p1, p2) => p2.date - p1.date);
  },
  _generateCurrentStoreLeaderBoard: (currentStore) => {
    const allPurchasers = PopupUtils._generateFormattedPurchasers(currentStore);
    return allPurchasers.sort((p1, p2) => p2.sum - p1.sum);
  },
  _generateAllStoresLeaderBoard: (allStores) => {
    const formattedStores = [];
    allStores.forEach((store) => {
      let sum = 0;
      store.orders.forEach(
        (order) =>
          (sum += order.orderSum + parseInt(order.shippingCost))
      );
      formattedStores.push({
        ...store.popup,
        sum,
      });
    });
    return formattedStores.sort((s1, s2) => s2.sum - s1.sum);
  },
  _generateFormattedPurchasers: (currentStore) => {
    const allPurchasers = [];
    currentStore.orders.forEach((order) => {
      allPurchasers.push({
        customerName: order.customer.Name,
        sum: order.orderSum + parseInt(order.shippingCost),
        date: order.order.CreatedOn,
        purchaseNote: order.order.PurchaseNote
      });
    });
    return allPurchasers;
  },
};

export default PopupUtils;

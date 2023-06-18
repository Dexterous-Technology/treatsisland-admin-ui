import EventApi from "./event-api";
import OrderApi from "./order-api";
import OrgApi from "./org-api";
import PopupApi from "./popup-api";
import ProductApi from "./product-api";
import UserApi from "./user-api";
import PaymentApi from "./payment-api";

const ApiCalls = {
  user: UserApi,
  org: OrgApi,
  event: EventApi,
  product: ProductApi,
  popup: PopupApi,
  order: OrderApi,
  payment: PaymentApi
};

export default ApiCalls;

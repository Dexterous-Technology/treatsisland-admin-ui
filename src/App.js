import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import HomePage from "./Pages/home-page";
import AboutUsPage from "./Pages/about-us";
import LayoutPage from "./Pages/layout/layout";
import LoginPage from "./Pages/login-page/login-page";
import SignupPage from "./Pages/signup-page/signup-page";
import OrganizationPage from "./Pages/organization-page/organization-page";
import OrganizationForm from "./Pages/organization-page/organization-form";
import PopupStorePage from "./Pages/popup-store-page/popup-store-page";
import ShopPremiumCandy from "./Pages/shop-premium-candy/shop-premium-candy";
import PopupStoreNewPage from "./Pages/popup-store-new-page/popup-store-new-page";
import PopupStoreAdminPage from "./Pages/popup-store-admin-page/popup-store-admin-page";

import EventPage from "./Pages/event-page/event-page";
import EventForm from "./Pages/event-page/event-form";

import AuthHelper from "./utils/auth-helper";
import PublicRoute from "./core/route/public-route/public-route";
import ProtectedRoute from "./core/route/protected-route/protected-route";
import JoinEventHelper from "./features/join-event/join-event-helper";
import AllEventsPage from "./Pages/all-events-page/all-events-page";
import EventViewPage from "./Pages/event-view-page/event-view-page";
import JoinEventPage from "./Pages/join-event-page/join-event-page";
import PopupStoreEditor from "./entities/popup-store/components/popup-store-editor/popup-store-editor";
import QuickStartWizard from "./features/quick-start-wizard/quick-start-wizard";
import { ToastContainer } from "react-toastify";
import InvoicePage from "./Pages/invoice-page/invoice-page";
import SiteDownPage from "./Pages/site-down-page/site-down-page";
import SuperAdminLogin from "./Pages/super-admin-login/super-admin-login";
import SuperAdminAllEvents from "./Pages/super-admin-all-events/super-admin-all-events";
import SuperAdminProductManagement from "./Pages/super-admin-product-management/super-admin-product-management";
import SuperAdminForgotPassword from "./Pages/super-admin-forgot-password/super-admin-forgot-password";

function App() {
  useEffect(() => {
    AuthHelper.initialize();
  }, []);
  // Testing jira automation
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={"/join-event"} component={HomePage} />
          {/* <ProtectedRoute
            exact
            path="/orgs"
            component={OrganizationPage}
            redirectRoute={"/"}
          /> */}
          <ProtectedRoute
            exact
            path="/home"
            component={HomePage}
            redirectRoute={"/"}
          />
          <ProtectedRoute
            exact
            path="/all-events"
            component={AllEventsPage}
            redirectRoute={"/"}
          />
          <ProtectedRoute
            exact
            path="/event-view-page/:eventId"
            component={EventViewPage}
            redirectRoute={"/"}
          />
          <PublicRoute
            exact
            path="/login"
            component={LoginPage}
            redirectRoute={"/home"}
          />
          <PublicRoute
            exact
            path="/join-event"
            component={LoginPage}
            redirectRoute={"/home"}
          />
          <PublicRoute
            exact
            path="/register"
            component={SignupPage}
            redirectRoute={"/home"}
          />
          <ProtectedRoute
            exact
            path="/event/:orgid"
            component={EventPage}
            redirectRoute={"/login"}
          />
          <Route
            exact
            path="/popup-store/:storeId"
            component={PopupStorePage}
          />
          <Route
            exact
            path="/shop-premium-candy"
            component={ShopPremiumCandy}
          />
          <Route exact path="/popup-store-new/" component={PopupStoreNewPage} />
          <Route exact path="/about-us/" component={AboutUsPage} />
          <Route exact path="/site-down/" component={SiteDownPage} />

          <Route exact path="/super-login" component={SuperAdminLogin} />
          <Route exact path="/super-all-events/" component={SuperAdminAllEvents} />
          <Route exact path="/super-product-management/" component={SuperAdminProductManagement} />
          <Route exact path="/super-admin-forgot-password" component={SuperAdminForgotPassword} />
          
          <ProtectedRoute
            exact
            path="/popup-store-admin/:storeId"
            component={PopupStoreAdminPage}
          />

          <Route exact path="/invoice/:orderId" component={InvoicePage} />

          <Route path="*" component={HomePage} />
        </Switch>
        <PopupStoreEditor />
        <QuickStartWizard />
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;

import { useEffect } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.scss";
import HomePage from "./Pages/home-page";

import { ToastContainer } from "react-toastify";
import SuperAdminLogin from "./Pages/super-admin-login/super-admin-login";
import SuperAdminProductManagement from "./Pages/super-admin-product-management/super-admin-product-management";
import ProtectedRoute from "./core/route/protected-route/protected-route";
import PublicRoute from "./core/route/public-route/public-route";
import AuthHelper from "./utils/auth-helper";

function App() {
  useEffect(() => {
    // AuthHelper.initialize();
  }, []);
  console.log('App render 1111121');
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* <ProtectedRoute
            exact
            path="/orgs"
            component={OrganizationPage}
            redirectRoute={"/"}
          /> */}
          {/* <ProtectedRoute
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

          <Route path="*" component={HomePage} /> */}

          <ProtectedRoute
            path="/home"
            exact
            component={SuperAdminProductManagement}
            redirectRoute={"/login"}
          />
          <PublicRoute
            path="*"
            component={SuperAdminLogin}
            redirectRoute={"/home"}
          />
        </Switch>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;

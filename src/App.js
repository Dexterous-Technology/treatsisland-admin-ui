import { useEffect } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import SuperAdminLogin from "./Pages/super-admin-login/super-admin-login";
import SuperAdminProductManagement from "./Pages/super-admin-product-management/super-admin-product-management";
import SuperAdminAllEvents from "./Pages/super-admin-all-events/super-admin-all-events";
import ProtectedRoute from "./core/route/protected-route/protected-route";
import PublicRoute from "./core/route/public-route/public-route";
import AuthHelper from "./utils/auth-helper";

// import SuperAdminAllEvents from "./Pages/super-admin-all-events/super-admin-all-events";

function App() {
  useEffect(() => {
    // AuthHelper.initialize();
  }, []);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route 
            path="/events" 
            exact 
            component={SuperAdminAllEvents} 
          />

          <ProtectedRoute // to protected
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

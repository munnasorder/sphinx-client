import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "animate.css/animate.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/Home/Home/Home';
import Login from './components/Authentication/Login';
import SignUp from './components/Authentication/SignUp';
import { createContext, useEffect, useState } from 'react';
import User from './components/Authentication/User/User';
import PrivateRoute from './components/Authentication/PrivateRoute';
import Dashboard from './components/Dashboard/Dashboard';
import AddAdmin from './components/Dashboard/AddAdmin';
import EditService from './components/Dashboard/EditService';
import AddService from './components/Dashboard/AddService';
import PaymentMethod from './components/PaymentMethod/PaymentMethod';
import PricingAndPlan from './components/Dashboard/PricingAndPlan';
export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})

  useEffect( () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (userInfo) {
      setLoggedInUser(userInfo)
    }
  }, [])

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signUp">
          <SignUp />
        </Route>
        <PrivateRoute path="/user">
          <User />
        </PrivateRoute>
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute path="/addProduct">
          <AddService />
        </PrivateRoute>
        <PrivateRoute path="/addAdmin">
          <AddAdmin />
        </PrivateRoute>
        <PrivateRoute path="/plan">
          <PricingAndPlan />
        </PrivateRoute>
        <PrivateRoute path="/editProduct/:id">
          <EditService />
        </PrivateRoute>
        <PrivateRoute path="/payment/:id">
          <PaymentMethod />
        </PrivateRoute>
      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;

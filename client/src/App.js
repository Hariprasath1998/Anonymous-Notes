import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import Response from './components/Response/Response';
import PrivateRoute from './components/routing/PrivateRoute';
import './App.css';
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap';


if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => { 
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])
  return (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing}/>
        <section className="container">
        <Alert />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/dashboard/:id" component={Response}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
)}
export default App;
// <Route path="/edit/:id" component={submitResponsePage} />
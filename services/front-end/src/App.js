import React from 'react';
import jwtDecode from "jwt-decode";
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import { Provider } from 'react-redux';
import { Container } from 'react-bootstrap';

import './App.css';
import Login from './pages/Login'
import Home from './pages/Home'

import PrivateRoute from './components/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
import { milisecondsToSeconds } from './utils/dateTime';

import store from "./redux/store";
import { setCurrentUser, logoutUser } from './redux/actions/authActions';

/*
if (localStorage.jwtToken && localStorage.jwtToken !== "undefined") {
  var retrievedObj = localStorage.getItem('jwtToken');
  var res = JSON.parse(retrievedObj);
  // console.log(res)
  const { access_token } = res.data
  setAuthToken(access_token);
  const decoded = jwtDecode(access_token);
  // console.log(decoded);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = milisecondsToSeconds(Date.now());
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = './login';
  }
}
*/

function App() {
  
  let location = useLocation();

  React.useEffect(() => {
    document.body.classList.add('is-loaded')
    // childRef.current.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);


  return (
      <div style={{ minHeight: '100vh', background: '#eeeeee' }}>
        <Provider store={store}> 
          <main>
            <Switch>
              <>
                <Container
                  style={{
                    marginTop: '25px',
                    background: '#ffffff',
                  }}>
                  <Route path="/" component={Home} exact/>
                </Container>
              </>
            </Switch>
          </main>
        </Provider>
      </div>
  );
}

export default App;

/*
<Route path="/login" component={Login} />
*/
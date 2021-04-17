import React from 'react';
import { Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';

import { Container } from 'react-bootstrap';

import Home from './pages/Home';
import Login from './pages/Login';
// import Signup from './pages/Signup';
// import PasswordReset from './pages/PasswordReset';

import PrivateRoute from './components/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
import { milisecondsToSeconds } from './utils/dateTime';

import store from './redux/store';
import { setCurrentUser, logoutUser } from './redux/actions/authActions';

import './styles/App.css';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwtDecode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = milisecondsToSeconds(Date.now());
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = './login';
  }
}

function App() {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#eeeeee',
      }}
    >
      <Provider store={store}>
        <main>
          <Switch>
            <Route path="/login" component={Login} />
            {/*<Route path="/signup" component={Signup} />
            <Route path="/passwordreset" component={PasswordReset} />*/}
            <>
              <Container
                style={{
                  marginTop: '25px',
                  background: '#ffffff',
                }}
              >
                <Route path="/" component={Home} exact />
              </Container>
            </>
          </Switch>
        </main>
      </Provider>
    </div>
  );
}

export default App;

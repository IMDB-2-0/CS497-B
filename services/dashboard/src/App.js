import React from 'react';
import { Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';

import { Container } from 'react-bootstrap';

// import './App.css';
import Login from './pages/Login'
import Home from './pages/Home'
import Liked from './pages/Liked';
import Disliked from './pages/Disliked';
import SearchMovie from './pages/SearchMoviePage';
import Recommendations from './pages/Recommendations';

import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';

import setAuthToken from './utils/setAuthToken';
import { milisecondsToSeconds } from './utils/dateTime';

import NavBar from './components/NavBar';

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
      <div style={{ 
        position: 'relative',
        minHeight: '100vh', 
        background: '#eeeeee' }}>
        <Provider store={store}> 
          <NavBar />
          <main>
            <Switch>
              <Route path="/login" component={Login} />
              <>
                <Container
                  style={{
                    marginTop: '25px',
                    background: '#ffffff',
                  }}>
                  <PrivateRoute exact path="/" component={Home}/>
                  <PrivateRoute path="/liked" component={Liked} />
                  <PrivateRoute path="/disliked" component={Disliked} />
                  <Route path="/searchMovie" component={SearchMovie} />
                  <PrivateRoute path="/recommendations" component={Recommendations}/>
                </Container>
                <Footer />
              </>
            </Switch>
          </main>          
        </Provider>
      </div>
  );

/* 
 return (
  <div>
  <Provider store={store}> 
    <NavBar />
    <main>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/liked" component={Liked} />
        <Route path="/disliked" component={Disliked} />
        <Route path="/searchMovie" component={SearchMovie} />
        </Switch>
    </main>
  </Provider>
</div>
 );
 */
}

export default App;

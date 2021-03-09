To setup React:

# Intent:
- Here we'll be learning how to installing React and setup a simple application. 
React is a JS framework that's simple to use and is scalable because of sharable
UI components and hooks. 

# Setup/Install
```
npx create-react-app client
cd client
npm start
```

# App.js file - in the ./client/src folder
- Below is an app component that is automatically created when started
```
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
```

# React Hooks & Functional Programming
- In React, you can define functional components and
they have their own set of states and reducers. It's 
helps maintain cleaner code overall and it's easier to 
understand. 

- To create a searchbar with hooks:
```
import React, { useState } from "react";

const Search = (props) => {

  // Here is a state hook that contains information when searching.
  // It's defaulted with the empty string.
  const [searchValue, setSearchValue] = useState("");
  
  const handleSearchInputChanges = (e) => {
    // To update the searchValue, use "setSearchValue"
    setSearchValue(e.target.value);
  }

  const resetInputField = () => {
    // To update the searchValue, use "setSearchValue". Here we reset.
    setSearchValue("")
  }

  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  }

  return (
      <form className="search">
        <input
          value={searchValue}
          onChange={handleSearchInputChanges}
          type="text"
        />
        <input onClick={callSearchFunction} type="submit" value="SEARCH" />
      </form>
    );
}

export default Search;
```

# Utilizing axios & react redux 

1. Create a folder called `redux`
2. Create two folders 
    A. `actions`
        - All the files that stores your routes essentially
    B. `reducers`
        - Files that contain functions that determine changes
        to an application state

Here is an example with our authentication system with reducers:

In `./client/src/redux/reducers/authReducer.js`:
```
import {
    SET_CURRENT_USER,
    USER_LOADING,
    UPDATE_CURRENT_USER,
} from '../actions/types';

const isEmpty = require('is-empty');

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
};

export default function authReducer (state = initialState, action) {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
            };
        case UPDATE_CURRENT_USER:
            return {
                ...state,
                user: action.payload,
            };
        case USER_LOADING:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
}
```

In the actions folder, we usually have states for actions that 
we label as constants in `types.js`.

In `./client/src/redux/actions/types.js`:
```
export const USER_LOADING = 'USER_LOADING';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';
```

In `./client/src/redux/actions/authActions.js`, we're looking
to register a user for example. We send a request to our
endpoint "register" in our server. 

```

import { GET_ERRORS } from './types';

...
import axios from 'axios';
export const registerUser = (userData, history) => (dispatch) => {
    axios
    .post('http://localhost:8000/register', userData)
    .then(() => history.push('/login'))
    .catch((err) => {
        console.log(err)
        dispatch({
            type: GET_ERRORS,
            payload: err,
        });
    });
};
```
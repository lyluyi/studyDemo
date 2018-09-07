import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import GamesPage from './components/GamesPage'
import GameForm from './components/GameForm'

import { Provider } from  'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'

import { composeWithDevTools } from  'redux-devtools-extension'
import { logger } from 'redux-logger'
import thunk from 'redux-thunk'

import registerServiceWorker from './registerServiceWorker';

import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom'

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      logger,
      thunk
    )
  )
)



ReactDOM.render(
<Provider store = { store }>
  <Router>
    <div className="ui container">
      <div className="ui three item menu">
        <NavLink exact activeClassName="active" className="item" to="/">HOME</NavLink>
        <NavLink exact activeClassName="active" className="item" to="/games">GAMES</NavLink>
        <NavLink activeClassName="active" className="item" to="/games/new">Add New Game</NavLink>
      </div>
        <Route exact path="/" component={ App } ></Route>
        <Route exact path="/games" component={ GamesPage } ></Route>
        <Route path="/games/new" component={ GameForm } ></Route>
        <Route path="/game/:_id" component={ GameForm } ></Route>
    </div>
  </Router>
</Provider>  
, 
document.getElementById('root'));
registerServiceWorker();

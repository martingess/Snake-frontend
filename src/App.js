import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import Header from "./layout/Header";
import Results from "./pages/Results";
import Main from "./layout/Main";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import AddResult from "./pages/AddResult";
import store from "./store";
import {Provider} from "react-redux";
import {softLogin} from './modules/redLogin'
import Result from './pages/Result';
import RegisterPage from './pages/Register';
import { setResultsData } from './modules/redResults';

function App() {
  if(localStorage.getItem("authToken")){
    store.dispatch(softLogin());
    setResultsData(store.dispatch)()
  }
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Header/>
          <Main>
            <Route path={'/'} exact>
              <Results/>
            </Route>
            <Route path={'/about'}>
              <div>About us</div>
            </Route>
            <Route path={'/addResult'}>
              <AddResult/>
            </Route>
            <Route path={'/showResult:id'} component={Result}/>
            <Route path={'/register'}>
              <RegisterPage/>
            </Route>
          </Main>
        </Router>
      </Provider>
    </div>
  ); 
}

export default App;

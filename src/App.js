import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import Header from "./layout/Header";
import Results from "./pages/Result";
import Main from "./layout/Main";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import AddResult from "./pages/AddResult";
import store from "./store";
import {Provider} from "react-redux";


function App() {
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
          </Main>
        </Router>
      </Provider>
    </div>
  );
}

export default App;

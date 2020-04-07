import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import Header from "./layout/Header";
import Results from "./pages/Results";
import Main from "./layout/Main";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import AddResult from "./pages/AddResult";
import store from "./store";
import { Provider } from "react-redux";
import {softLogin} from './modules/redLogin'
import Result from './pages/Result';
import RegisterPage from './pages/Register';
import { setResultsData } from './modules/redResults';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import PrivateRoute from './components/PrivateRoutes';

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
            <PrivateRoute anonOnly path={'/login'}>
              <LoginPage/>
            </PrivateRoute>

            <PrivateRoute path={'/'} exact>
              <Results/>
            </PrivateRoute>

            <Route path={'/about'}>
              <div>About us</div>
            </Route>

            <PrivateRoute path={'/addResult'}>
              <AddResult/>
            </PrivateRoute>

            <PrivateRoute path={'/showResult:id'} component={Result}/>

            <PrivateRoute anonOnly={true} path={'/register'}>
              <RegisterPage/>
            </PrivateRoute>

            <PrivateRoute path='/user'>
              <UserPage />
            </PrivateRoute>
            
          </Main>
        </Router>
      </Provider>
    </div>
  ); 
}

export default App;

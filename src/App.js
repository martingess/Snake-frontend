import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import Header from './layout/Header';
import Results from './pages/Results';
import Main from './layout/Main';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AddResult from './pages/AddResult';
import store from './store';
import { Provider, connect } from 'react-redux';
import { softLogin } from './modules/redLogin';
import Result from './pages/Result';
import RegisterPage from './pages/Register';
import { setResultsData } from './modules/redResults';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import PrivateRoute from './components/PrivateRoutes';
import PatientsResultsPage from './pages/PatientsResultsPage';
import ErrorPage from './pages/ErrorPage';
import WelcomePage from './pages/WelcomePage';
import { getPatientsResults } from './modules/redDoctor';

function App() {
  if (localStorage.getItem('authToken')) {
    store.dispatch(softLogin(localStorage.getItem('authToken')));
    setResultsData(store.dispatch)();
  }
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Header />
          <ErrorPage>
            <Main>
              <Route path={'/'} exact>
                <WelcomePage/>
              </Route>
              <PrivateRoute anonOnly path={'/login'}>
                <LoginPage />
              </PrivateRoute>

              <PrivateRoute path={'/results'} exact>
                <Results />
              </PrivateRoute>

              <Route path={'/about'}>
                <div>About us</div>
              </Route>

              <PrivateRoute path={'/addResult'}>
                <AddResult />
              </PrivateRoute>

              <PrivateRoute
                path={'/showResult:id'}
                component={Result}
              />

              <PrivateRoute
                path={'/patientsResults'}
                component={PatientsResultsPage}></PrivateRoute>

              <PrivateRoute anonOnly path={'/register'}>
                <RegisterPage />
              </PrivateRoute>

              <PrivateRoute path="/user">
                <UserPage />
              </PrivateRoute>
            </Main>
          </ErrorPage>
        </Router>
      </Provider>
    </div>
  );
}
export default App;
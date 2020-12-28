import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from '../hoc/auth';
import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import NavBar from './views/NavBar/NavBar';
import Footer from './views/Footer/Footer';
import UploadTourPage from './views/UploadTourPage/UploadTourPage';
import DetailTourPage from './views/DetailTourPage/DetailTourPage';
import CartPage from './views/CartPage/CartPage';
import HistoryPage from './views/HistoryPage/HistoryPage';
import UserInfo from './views/UserInfo/UserInfo';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, true)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route
            exact
            path="/tour/upload"
            component={Auth(UploadTourPage, true)}
          />
          <Route
            exact
            path="/tour/:tourId"
            component={Auth(DetailTourPage, true)}
          />

          <Route exact path="/user/cart" component={Auth(CartPage, true)} />
          <Route exact path="/history" component={Auth(HistoryPage, true)} />
          <Route exact path="/user/:userId" component={Auth(UserInfo, true)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;

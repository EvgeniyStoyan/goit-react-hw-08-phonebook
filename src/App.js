import { lazy, Suspense, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from './components/AppBar';
import Container from './components/Container';
import authOperations from './redux/auth/auth-operations';
import authSelectors from './redux/auth/auth-selectors';
import PrivateRoute from '../src/Route/PrivateRoute';
import PublicRoute from '../src/Route/PublicRoute';
import { ToastContainer } from 'react-toastify';

// import HomePage from './views/HomePage/HomePage';
// import Register from './views/Register/Rigister';
// import Login from './views/Login/Login';
// import Phonebook from './views/Contacts/Phonebook';

import Loader from './components/Loader';
const HomePage = lazy(() =>
  import('./views/HomePage/HomePage' /* webpackChunkName: "home-page" */),
);
const Register = lazy(() =>
  import('./views/Register/Rigister' /* webpackChunkName: "register" */),
);
const Login = lazy(() =>
  import('./views/Login/Login' /* webpackChunkName: "login" */),
);
const Contacts = lazy(() =>
  import('./views/Contacts/Contacts' /* webpackChunkName: "contacts" */),
);

export default function App() {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(authSelectors.getIsFetchingCurrent);

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);
  return (
    !isFetchingCurrentUser && (
      <Container>
        <ToastContainer
          autoClose={5000}
          position="top-center"
          theme="colored"
        />
        <AppBar />

        <Suspense fallback={<Loader />}>
          <Switch>
            <PublicRoute exact path="/">
              <HomePage />
            </PublicRoute>

            <PublicRoute path="/register" restricted>
              <Register />
            </PublicRoute>

            <PublicRoute path="/login" restricted>
              <Login />
            </PublicRoute>

            <PrivateRoute>
              <Contacts />
            </PrivateRoute>
          </Switch>
        </Suspense>
      </Container>
    )
  );
}

import Navigation from '../Navigation/Navigation';
import s from './AppBar.module.css';
import { useSelector } from 'react-redux';
import UserMenu from './../UserMenu/UserMenu';
import AuthNav from './../AuthNav/AuthNav';
import authSelectors from '../../redux/auth/auth-selectors';

export default function AppBar() {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return (
    <header className={s.header}>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
}

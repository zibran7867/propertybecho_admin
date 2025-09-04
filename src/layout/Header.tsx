import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Routing } from '../routes/routing';
import accountService from '../services/account-service';
import { adminLogout } from '../store/slices/authSlice';
import './header.scss';

export const toggleSidebar = () => {
  if (document.body.classList.contains('hide-sidebar')) {
    document.body.classList.remove('hide-sidebar');
  } else {
    document.body.classList.add('hide-sidebar');
  }
};

const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    await accountService
      .logout()
      .then(async () => {
        dispatch(adminLogout());
        navigate(Routing.Login);
      })
      .catch((error: Error) => console.log(error?.message));
  };

  React.useEffect(() => {
    if (window.innerWidth <= 991) {
      document.body.classList.add('hide-sidebar');
    }

    function checkWindowSize() {
      if (window.innerWidth <= 991) {
        document.body.classList.add('hide-sidebar');
      } else {
        document.body.classList.remove('hide-sidebar');
      }
    }

    window.addEventListener('resize', checkWindowSize);
    return () => {
      window.removeEventListener('resize', checkWindowSize);
    };

  }, [window.innerWidth])

  return (
    <div className='header'>

      <div className={`sidebar-icon ham-menu bg-primary-200 rounded-[5px]`} onClick={() => {
        toggleSidebar()
      }}>
        <button className="menu__icon">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <button className="Btn bg-primary" onClick={handleLogoutClick}>
        <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" /></svg></div>
        <div className="text">Logout</div>
      </button>

    </div>
  )
}

export default Header

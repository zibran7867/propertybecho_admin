import { Navbar, NavbarContent, NavbarItem } from '@heroui/react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ISidebarData, sidebarRoutes } from '../shared/constants/sidebar-data';
import './sideBar.scss';

const Sidebar = () => {
  const { pathname } = useLocation();

  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);

  const handleMenuOpen = (menu: string) => {
    if (activeMenu !== menu) {
      setActiveMenu(menu);
    } else {
      setActiveMenu(null);
    }
  };

  const handleMenuClose = () => {
    setActiveMenu(null);
  };

  return (
    <div className='sidebar bg-white border-r-2 border-primary '>

      <div className="sidebar-header ">
        <img src="/images/property_bacho_logo.png"  alt='img not found' className='w-52 h-8' />
        {/* <p className='text-xl'>Property Bacho</p> */}
      </div>

      <Navbar className="main-navigation" tabIndex={-1}
        onFocus={(e) => e.preventDefault()}>
        <NavbarContent className='flex-col'>
          {sidebarRoutes?.map((menu: ISidebarData, index) => (
            <NavbarItem
              key={index}
              className={`sidebar-nav`}
              aria-label={activeMenu === menu?.module ? 'true' : 'false'}
              tabIndex={-1}
              onFocus={(e) => e.preventDefault()}
              onClick={(e) => {
                e.stopPropagation();
                (menu?.childs?.length ?? 0) > 0 ? handleMenuOpen(menu?.module) : handleMenuClose();
              }}
            >
              <Link
                className={`nav-item hover:bg-primary ${pathname?.includes(menu?.route) ? 'active bg-primary' : ''}`}
                to={menu?.route ? menu?.route : '/'}
                onClick={(e) => {
                  if ((menu?.childs?.length ?? 0) > 0) e.preventDefault();
                }}
                tabIndex={-1}
                onFocus={(e) => e.preventDefault()}
                aria-label={activeMenu === menu?.module ? 'true' : 'false'}
              >
                <img className="nav-icon" src={menu?.image} alt=''/>
                <span>{menu?.name}</span>
                {/* {menu?.childs?.length > 0 && (<img className='dropdown-icon' src="/images/back.svg" alt='' />)} */}
                {(menu?.childs?.length ?? 0) > 0 && (<span className='dropdown-arrow'></span>)}
              </Link>
              {/* {activeMenu === menu?.module && */}
              {(menu?.childs?.length ?? 0) > 0 &&
                (
                  <ul className={`child-menu bg-primary ${activeMenu === menu?.module ? 'show-child-menu' : ''}`} tabIndex={-1}
                    onFocus={(e) => e.preventDefault()}>
                    {(menu?.childs?.length ?? 0) > 0 && (
                      menu?.childs?.map((childMenu: ISidebarData, index) => (
                        <NavbarItem
                          className={`nav-link ${(childMenu?.childs?.length ?? 0) > 0 ? 'has-menu' : ''} `}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          tabIndex={-1}
                          onFocus={(e) => e.preventDefault()}
                          key={index}
                        >
                          <Link
                            className={`nav-item hover:bg-background ${pathname?.includes(childMenu?.route) ? 'active' : ''}`}
                            to={childMenu?.route ? childMenu?.route : '/'}
                            onClick={(e) => {
                              if ((childMenu?.childs?.length ?? 0) > 0) e.preventDefault();
                            }}
                            tabIndex={-1}
                            onFocus={(e) => e.preventDefault()}
                          >
                            <img className="nav-icon" src={childMenu?.image} alt='' />
                            <span>{childMenu?.name}</span>
                          </Link>
                        </NavbarItem>
                      ))
                    )}
                  </ul>
                )}
            </NavbarItem>
          ))
          }
        </NavbarContent>
      </Navbar>
    </div>
  )
}

export default Sidebar
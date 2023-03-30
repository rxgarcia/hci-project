import * as React from "react";
import { Container, NavItem, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';

const tabs = [
  {
    route: "/",
    icon: "img.jpg",
    label: "Home",
  },
  {
    route: "/closet",
    icon: "img.jpg",
    label: "Closet",
  },
  {
    route: "/laundry",
    icon: "img.jpg",
    label: "Laundry",
  },
  {
    route: "/generate",
    icon: "img.jpg",
    label: "Generate",
  },
];

const AppNavBar = () => {
  return (
    <nav
      className="navbar fixed-bottom navbar-light bottom-tab-nav"
      role="navigation"
    >
      <Nav className="w-100">
        <div className=" d-flex flex-row justify-content-around w-100">
          {tabs.map((tab, index) => (
            <NavItem key={`tab-${index}`}>
              <Link to={tab.route} className="nav-link bottom-nav-link">
                <div className="row d-flex flex-column justify-content-center align-items-center">
                  <div className="bottom-tab-label">{tab.label}</div>
                </div>
              </Link>
            </NavItem>
          ))}
        </div>
      </Nav>
    </nav>
  );
};

export default AppNavBar;

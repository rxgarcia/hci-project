import * as React from "react";
import { useState } from "react";
import { Container, NavItem, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { House, DoorOpen, Trash2, Magic } from "react-bootstrap-icons";

const tabs = [
  {
    route: "/",
    icon: <House />,
    label: "Home",
  },
  {
    route: "/closet",
    icon: <DoorOpen />,
    label: "Closet",
  },
  {
    route: "/laundry",
    icon: <Trash2 />,
    label: "Laundry",
  },
  {
    route: "/generate",
    icon: <Magic />,
    label: "Generate",
  },
];

const AppNavBar = () => {
  const [currentState, setCurrentState] = useState("Home");

  console.log(currentState)

  return (
    <nav
      className="navbar fixed-bottom bottom-tab-nav"
      role="navigation"
    >
      <Nav className="w-100">
        <div className="d-flex flex-row justify-content-around w-100">
          {tabs.map((tab, index) => (
            <NavItem key={`tab-${index}`} onClick={() => {setCurrentState(tab.label)}} className={"navItemContainer" + (tab.label === currentState ? " activeNavBarItem" : "")}>
              <Link to={tab.route} className="nav-link bottom-nav-link">
                <div className="navItemContainer">
                  <div className="bottom-tab-icon">{tab.icon}</div>
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

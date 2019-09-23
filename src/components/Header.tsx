import React from "react";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import LogoutBtn from "./Auth/LogoutBtn";

type LogoutHandler = () => any;

interface HeaderProps {
  logoutHandler: LogoutHandler;
}

const Header: React.FC<HeaderProps> = ({ logoutHandler }) => (
  <Navbar fluid className="m-bottom-0">
    <Navbar.Header className="navHeader">
      <Navbar.Brand className="navBrand">GraphQL Tutorial App</Navbar.Brand>

      <Nav pullRight>
        <NavItem>
          <LogoutBtn logoutHandler={logoutHandler} />
        </NavItem>
      </Nav>
    </Navbar.Header>
  </Navbar>
);

export default Header;

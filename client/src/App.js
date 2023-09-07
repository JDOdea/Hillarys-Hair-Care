import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar color="info" expand="md">
        <Nav navbar>
          <NavbarBrand href="/">Hillary's Hair Care</NavbarBrand>
        </Nav>
        <NavItem>
          <NavLink href="/">Appointments</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/services">Services</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/stylists">Stylists</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="customers">Customers</NavLink>
        </NavItem>
      </Navbar>
      <Outlet />
    </>
  )
}

export default App;

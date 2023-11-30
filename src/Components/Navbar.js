import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/AuthSlice";
import { useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const selector = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <Navbar
      bg="dark"
      variant="dark"
      className="d-flex justify-content-between "
    >
      <Navbar.Brand href="#home">Traveller</Navbar.Brand>
      <Nav className="mr-auto">
        {/* <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link> */}
      </Nav>
      <Nav className="ml-auto ">
        <Nav.Link>
          <FaShoppingCart size={20} />
        </Nav.Link>
        <span style={{ color: "white", marginTop: "12px" }}>
          {selector?.first_name} {selector?.last_name}
        </span>
        <Nav.Link>
          <Button variant="outline-light" onClick={logoutHandler}>
            <FaSignOutAlt className="mr-1" />
            Logout
          </Button>
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;

import React from 'react';
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function Header() {
     const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));
  const history = useHistory();

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    window.localStorage.removeItem("auth");
    history.push("/login");
  };
    return (
        <>
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="/">Park My Vehicle</Navbar.Brand>
                <Nav className="ml-auto">
                    {auth != null && (
                        <>
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                            <Nav.Link href="/login" onClick={logout}>Logout</Nav.Link>
                            </>
                    )}
                    {auth == null && (
                        <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
                </>            
                )}
                </Nav>
            </Navbar>
        </>
    )
}

export default Header

import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

import crest from '../../assets/uw-crest.svg'
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

function BadgerLayout(props) {

    // TODO @ Step 6:
    // You'll probably want to see if there is an existing
    // user in sessionStorage first. If so, that should
    // be your initial loginStatus state.
    const [loginStatus, setLoginStatus] = useState(undefined);

    useEffect(() => {
        if (sessionStorage.getItem("login")) {
            setLoginStatus(JSON.parse(sessionStorage.getItem("login")))
        }
    }, [])

    // I used this resource to understand how to use a state variable with conditional rendering: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
    // I got the initial idea from ChatGPT and used the source to further my knowledge 
    // Used previous homeworks to guide myself for this section
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt="BadgerChat Logo"
                            src={crest}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        BadgerChat
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <BadgerLoginStatusContext.Provider value={[loginStatus, setLoginStatus]}>
                            {loginStatus?.loggedIn && <Nav.Link as={Link} to="logout">Logout</Nav.Link>}
                            {!loginStatus?.loggedIn && <Nav.Link as={Link} to="login">Login</Nav.Link>}
                            {!loginStatus?.loggedIn && <Nav.Link as={Link} to="register">Register</Nav.Link>}
                        </BadgerLoginStatusContext.Provider>
                        <NavDropdown title="Chatrooms">
                            {props.chatrooms.map(chatroom => 
                                <NavDropdown.Item as={Link} to={"/chatrooms/" + chatroom} key={chatroom}>{chatroom}</NavDropdown.Item>
                            )}
                            {
                                /* TODO Display a NavDropdown.Item for each chatroom that sends the user to that chatroom! */
                            }
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
            <div style={{ margin: "1rem" }}>
                <BadgerLoginStatusContext.Provider value={[loginStatus, setLoginStatus]}>
                    <Outlet />
                </BadgerLoginStatusContext.Provider>
            </div>
        </div>
    );
}

export default BadgerLayout;
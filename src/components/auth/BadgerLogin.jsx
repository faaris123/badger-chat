import React, { useRef, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';

export default function BadgerLogin() {

    // Used lecture code examples to better understand how useRef works
    const usernameRef = useRef();
    const passwordRef = useRef();
    // Got help with the useContext from Office Hours
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const navigate = useNavigate();

    function login(e) {
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        e?.preventDefault();

        const regex = /^\d{7}$/;

        // Used this link to better understand the regex: https://www.w3schools.com/jsref/jsref_regexp_test.asp
        if (!regex.test(password)) {
            alert("Your pin must be a 7-digit number!")
            return
        }

        if (!username || !password) {
            alert("You must provide both a username and pin!")
            return
        }

        // Fetched the apropriate API based on the project description
        fetch("https://cs571api.cs.wisc.edu/rest/f24/hw6/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                pin: password
            }),
        })
        .then(res => {
            // Checked the return codes to handle the appropriate response 
            if (res.status === 200) {
                alert("Login Succesful")
                setLoginStatus({username: username, loggedIn: true})
                sessionStorage.setItem("login", JSON.stringify({username: username, loggedIn: true}))
                navigate('/');
            }
            if (res.status === 401) {
                alert("Incorrect username or pin!")
            }
        })
    }

    // TODO Create the login component.

    // Used lecture code examples to understand the htmlFor and id attributes for the Form
    // Used this source to understand how to mask the password input: https://react-bootstrap.netlify.app/docs/forms/form-control/#readonly-plain-text
    return <>
        <h1>Login</h1>
        <Form onSubmit={login}>
            <Form.Label htmlFor = "usernameInput">Username</Form.Label>
            <Form.Control id = "usernameInput" ref = {usernameRef}></Form.Control>
            <Form.Label htmlFor = "passwordInput">Password</Form.Label>
            <Form.Control id = "passwordInput" type = "password" ref = {passwordRef}></Form.Control>
            <br></br>
            <Button type = "submit" onClick = {login}>Login</Button>
        </Form>
    </>
}

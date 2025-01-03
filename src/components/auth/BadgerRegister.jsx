import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';

export default function BadgerRegister() {
    // Used previous homeworks for the useState
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    // Used the same logic for useContext
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const navigate = useNavigate()

    // hanlder functions for the setters
    function handleUsername(e) {
        setUsername(e.target.value)
    }

    function handlePassword(e) {
        setPassword(e.target.value)
    }

    function handleConfirm(e) {
        setConfirmPass(e.target.value)
    }

    function register(e) {
        e?.preventDefault();

        const regex = /^\d{7}$/;
    
        // Used this link to better understand the regex: https://www.w3schools.com/jsref/jsref_regexp_test.asp
        if (!regex.test(password) || !regex.test(confirmPass)) {
            alert("Your pin must be a 7-digit number!")
            return
        }

        if (!username || !password) {
            alert("You must provide both a username and pin!")
            return
        }

        if (password !== confirmPass) {
            alert("Your pins do not match!")
            return
        }

        // Fetched the apropriate API based on the project description
        fetch("https://cs571api.cs.wisc.edu/rest/f24/hw6/register", {
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
                alert("Registration Succesful!")
                setLoginStatus({username: username, loggedIn: true})
                sessionStorage.setItem("login", JSON.stringify({username: username, loggedIn: true}))
                navigate('/');
            }
            if (res.status === 409) {
                alert("That username has already been taken!")
            }
        })
    }

    // TODO Create the register component.

    // Used lecture code examples to understand the htmlFor and id attributes for the Form
    // Used this source to understand how to mask the password input: https://react-bootstrap.netlify.app/docs/forms/form-control/#readonly-plain-text
    return <>
        <h1>Register</h1>
        <Form onSubmit={register}>
            <Form.Label htmlFor = "usernameInput">Username</Form.Label>
            <Form.Control id = "usernameInput" onChange = {handleUsername}></Form.Control>
            <Form.Label htmlFor = "passwordInput">Password</Form.Label>
            <Form.Control id = "passwordInput" type = "password" onChange = {handlePassword}></Form.Control>
            <Form.Label htmlFor = "confirmPassInput">Repeat Password</Form.Label>
            <Form.Control id = "confirmPassInput" type = "password" onChange = {handleConfirm}></Form.Control>
            <br></br>
            <Button type = "submit" onClick = {register}>Register</Button>
        </Form>
    </>
}

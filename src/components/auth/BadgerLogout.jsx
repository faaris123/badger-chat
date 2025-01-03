
import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';

export default function BadgerLogout() {
    // Used the same logic for useContext as the other files
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const navigate = useNavigate()

    useEffect(() => {
        fetch("https://cs571api.cs.wisc.edu/rest/f24/hw6/logout", {
            method: "POST",
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            },
            credentials: "include"
        }).then(res => res.json()).then(json => {
            // Checked the message that the json produces to tell if the handling needs to be done
            if (json.msg === "You have been logged out! Goodbye.") {
                alert("You have been logged out!")
                setLoginStatus({username: "", loggedIn: false})
                sessionStorage.setItem("login", JSON.stringify({username: "", loggedIn: false}))
                navigate("/")
            }
            // Maybe you need to do something here?
        })
    }, []);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}

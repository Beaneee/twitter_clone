import React, { useState } from "react";
import { authService, firebaseInstance } from "../firebase";
import { createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup 
} from "firebase/auth";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (e) => {
        const {
        target: { name, value },
        } = e;
        if (name === "email") {
        setEmail(value);
        } else if (name === "password") {
        setPassword(value);
        }
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
        let data;
        if (newAccount) {
            data = await createUserWithEmailAndPassword(
            authService,
            email,
            password
            );
        } else {
            data = await signInWithEmailAndPassword(authService, email, password);
        }
        console.log(data);
        } catch (error) {
        setError(error.message);
        }
    };
    const toggleAccount = () => setNewAccount((prev) => !prev);
    const onSocialClick = async (e) => {
        const {
            target: {name},
        } = e;
        let provider;
        if (name === "google") {
            provider = new GoogleAuthProvider();
        } else if (name === "github") {
            provider = new GoogleAuthProvider();
        }
        await signInWithPopup(authService, provider);
    } 
    return (
        <>
        <form onSubmit={onSubmit} className="container">
            <input
            name="email"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={onChange}
            className="authInput"
            />
            <input
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            className="authInput"
            onChange={onChange}
            />
            <input
            type="submit"
            className="authInput authSubmit"
            value={newAccount ? "Create Account" : "Sign In"}
            />
            {error && <span className="authError">{error}</span>}
        </form>
        <span onClick={toggleAccount} className="authSwitch">
            {newAccount ? "Sign In" : "Create Account"}
        </span>
        <div>
            <button onClick={onSocialClick} name="google">Continue with Google</button>
            <button onClick={onSocialClick} name="github">Continue with Github</button>
        </div>
        </>
    );
    };
export default Auth;
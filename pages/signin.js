// signin.js
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import { firebaseConfig } from '@/firebaseConfig'; // Make sure to export firebaseConfig from this module
import styles from '../styles/Signin.module.css';
import Link from "next/link"; // Import the CSS module


// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();

const Signin = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignIn = async (event) => {
        event.preventDefault();
        setError('');

        // Verify if email is allowed before signing in
        const response = await fetch('/api/verifyEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        if (response.ok) {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                // User is signed in, let's add/update the user in the MySQL database
                await addUserToDatabase(user);
                // Redirect to the home page after sign-in
                await router.push('/');
            } catch (error) {
                // If user is not found (first time user), instruct them to click on "Forgot Password"
                if (error.code === 'auth/user-not-found') {
                    setError('First time user detected. Please click on "Forgot Password" to set your password.');
                } else {
                    setError(error.message);
                }
            }
        } else {
            const errorData = await response.json();
            setError(errorData.error); // Set the error message from the server's response
        }
    };

    const handleForgotPassword = async (event) => {
        event.preventDefault();

        if (!email) {
            setError('Please enter your email address.');
            return;
        }

        // Verify if email is allowed before sending password reset email
        const response = await fetch('/api/verifyEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        if (response.ok) {
            try {
                await sendPasswordResetEmail(auth, email);
                setError('Password reset email sent! Check your inbox.');
            } catch (error) {
                setError(error.message);
            }
        } else {
            const errorData = await response.json();
            setError(errorData.error); // Set the error message from the server's response
        }
    };

    const addUserToDatabase = async (user) => {
        try {
            const response = await axios.post('/api/addUser', JSON.stringify({
                email: user.email,
            }), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await user.getIdToken()}`
                }
            });

            if (response.status === 200) {
                console.log('User email stored in MySQL database');
            }
        } catch (error) {
            console.error('Error adding user to MySQL database', error);
        }
    };

    // Listen for authentication state to stay in sync with the client.
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // No need to add user to database here if handleSignIn is doing so on sign in
                // router.push('/');
            }
        });
        return () => unsubscribe();
    }, [router]);

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSignIn}>
                <label className={styles.formLabel}>Sign In</label>
                <br/>
                <label>Email</label>
                <input
                    className={styles.formInput}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <br/>
                <label>Password</label>
                <input
                    className={styles.formInput}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <br/>
                <br/>
                {error && <p className={styles.errorMsg}>{error}</p>}
                <button className={styles.formButton} type="submit">Sign In</button>
                <br/>
                <br/>
                <button className={styles.formButton} type="button" onClick={handleForgotPassword}>Forgot Password
                </button>
                <br/>
                <br/>
                <p>First time logging in? Click on Forgot Password.</p>
            </form>
        </div>
    );
};


export default Signin;

// signin.js
import React, { useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Image from 'next/image';
import styles from '../../styles/Signin.module.css';
import { useRouter } from "next/router";
import Loader from '@/components/loader';
import { firebaseConfig } from '@/firebaseConfig'; // Make sure to export firebaseConfig from this module


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Configure FirebaseUI.
const uiConfig = {
    signInSuccessUrl: '/', // URL to redirect to after sign-in.
    signInOptions: [
        // List of authentication providers enabled for FirebaseUI.
        auth.EmailAuthProvider.PROVIDER_ID,
        // auth.GoogleAuthProvider.PROVIDER_ID,
        // Add other providers you want to support.
    ],
};

const Signin = () => {
    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, redirect to the home page.
                router.push('/');
            }
        });
    }, [router]);

    return (
        <div style={{ overflow: 'hidden', position: 'relative' }}>
            <div className={styles.wrapper} />
            <div className={styles.content}>
                <div className={styles.cardWrapper}>
                    <Image src='/toastmasters-international-logo-vector.svg' width="1000" height="400" alt='App Logo' style={{ height: '200px', marginBottom: '10px' }} />
                    <div className={styles.cardContent}>
                        <div>{"UUM Assets Declaration"}</div>
                        <hr/>
                        {/* FirebaseUI Sign-in Widget */}
                        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
                    </div>
                </div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src='/login_pattern.svg' alt='Pattern Background' className={styles.styledPattern} />
        </div>
    );
};

export default Signin;

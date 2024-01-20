// signin.js
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import styles from '../styles/Signin.module.css';
import { useRouter } from "next/router";
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseConfig } from '@/firebaseConfig'; // Make sure to export firebaseConfig from this module

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Dynamically import FirebaseAuthUI with no SSR
const FirebaseAuthUI = dynamic(() => import('@/FirebaseAuthUI'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});

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
            {/* ... */}
            {/* FirebaseUI Sign-in Widget */}
            <FirebaseAuthUI />
            {/* ... */}
        </div>
    );
};

export default Signin;

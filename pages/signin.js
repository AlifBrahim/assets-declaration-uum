// signin.js
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from "next/router";
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
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
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // User is signed in, let's add/update the user in the MySQL database
                try {
                    const response = await axios.post('/api/addUser', JSON.stringify({
                        email: user.email,
                    }), {
                        headers: {
                            'Content-Type': 'application/json',
                            // Include the Firebase ID token in the Authorization header
                            'Authorization': `Bearer ${await user.getIdToken()}`
                        }
                    });


                    if (response.status === 200) {
                        console.log('User email stored in MySQL database');
                    }
                } catch (error) {
                    console.error('Error adding user to MySQL database', error);
                }

                // Redirect to the home page.
                router.push('/');
            }
        });
    }, [router]);

    return (
        <div style={{ overflow: 'hidden', position: 'relative' }}>
            {/* FirebaseUI Sign-in Widget */}
            <FirebaseAuthUI />
        </div>
    );
};

export default Signin;

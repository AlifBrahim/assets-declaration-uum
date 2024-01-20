// FirebaseAuthUI.js
import React, { useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { EmailAuthProvider, getAuth } from "firebase/auth";
import { firebaseConfig } from '@/firebaseConfig'; // Make sure to export firebaseConfig from this module

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();

const FirebaseAuthUI = () => {
    useEffect(() => {
        let firebaseui;
        let ui;

        // Dynamically import FirebaseUI on the client side only
        import('firebaseui').then(firebaseuiModule => {
            firebaseui = firebaseuiModule; // Assign the imported module to the variable

            // Check if an instance of FirebaseUI already exists
            ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

            // Configure FirebaseUI.
            const uiConfig = {
                signInSuccessUrl: '/', // URL to redirect to after sign-in.
                signInOptions: [
                    EmailAuthProvider.PROVIDER_ID,
                    // Add other providers you want to support.
                ],
            };

            // Start the FirebaseUI Auth UI with the config
            ui.start('#firebaseui-auth-container', uiConfig);
        });

        // Clean up the UI widget when the component unmounts
        return () => {
            if (ui) {
                ui.delete();
            }
        };
    }, []);

    return (
        <div id="firebaseui-auth-container"></div>
    );
};

export default FirebaseAuthUI;

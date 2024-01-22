// firebaseAdmin.js
import admin from 'firebase-admin';


const serviceAccount = require("./assets-declaration-uum-firebase-adminsdk-zvimy-ec0dce26fd.json");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
    console.log('Firebase Admin initialized');
}

const allowedEmails = [
    'm_alif_muhammad@soc.uum.edu.my',
    'ahmad_asyraaf_d@soc.uum.edu.my',
    'm_luqman_ahmad@soc.uum.edu.my',
    'm_hadif_shuhaimi@soc.uum.edu.my',
    'm_mazuqi_adha@soc.uum.edu.my',
    'ahmad_azeem_anuar@soc.uum.edu.my',
];

// Function to check if an email is allowed
export const checkIfEmailAllowed = (email) => {
    return allowedEmails.includes(email);
};

// Function to create a user if their email is allowed
export const createUserIfAllowed = async (email) => {
    if (!checkIfEmailAllowed(email)) {
        throw new Error('Email not allowed');
    }
    try {
        // Create a user without a password
        const userRecord = await admin.auth().createUser({
            email: email,
            emailVerified: false, // Set to false, user can verify email if needed
        });
        console.log('User created with UID:', userRecord.uid);
        return userRecord;
    } catch (error) {
        console.error('Error creating new user:', error);
        throw error;
    }
};


// Export the auth interface for server-side use
export const auth = admin.auth();

export default admin;
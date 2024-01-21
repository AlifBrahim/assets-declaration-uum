// firebaseAdmin.js
import admin from 'firebase-admin';

const serviceAccount = require("./assets-declaration-uum-firebase-adminsdk-zvimy-ec0dce26fd.json");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
    console.log('Firebase Admin initialized');
}

export const auth = admin.auth(); // Export the auth interface for server-side use
export default admin;

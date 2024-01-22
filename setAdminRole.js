const admin = require('firebase-admin');
const serviceAccount = require('./assets-declaration-uum-firebase-adminsdk-zvimy-ec0dce26fd.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// Function to set admin custom claims
const setAdminRole = async (email) => {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    console.log(`Admin role set for user: ${email}`);
};

// Function to list all admins
const listAdmins = async () => {
    let nextPageToken;
    do {
        const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
        listUsersResult.users.forEach((user) => {
            if (user.customClaims && user.customClaims.admin === true) {
                console.log(`Admin: ${user.email} (${user.uid})`);
            }
        });
        nextPageToken = listUsersResult.pageToken;
    } while (nextPageToken);
};

// Emails to set as admins
const adminEmails = [
    'ahmad_azeem_anuar@soc.uum.edu.my',
    'm_alif_muhammad@soc.uum.edu.my',
];

// Set admin role and then list all admins
const manageAdmins = async () => {
    for (const email of adminEmails) {
        await setAdminRole(email);
    }
    console.log('All specified users have been made admins.');
    await listAdmins();
};

manageAdmins().catch(console.error);

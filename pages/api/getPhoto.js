import { getAuth } from 'firebase-admin/auth';
import admin from 'firebase-admin';
import connection from '@/db';
var serviceAccount = require("../../assets-declaration-uum-firebase-adminsdk-zvimy-ec0dce26fd.json");

if (!admin.apps.length) {
    var serviceAccount = require("../../assets-declaration-uum-firebase-adminsdk-zvimy-ec0dce26fd.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

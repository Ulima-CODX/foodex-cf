const serviceAccount = require('./fs_adminsdk_key.json');
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

exports.functions = require('firebase-functions');
exports.db = admin.firestore();
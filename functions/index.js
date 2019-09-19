import functions from 'firebase-functions';
import admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

exports.timestamp = functions.https.onRequest(async (req, resp)=>{
    resp.setHeader('Content-Type', 'application/json');
    switch (req.method) {
        case 'GET':
            resp.send(JSON.stringify({timestamp: Date.now()}));
            break;
        default:
            resp.send(JSON.stringify({msg: 'Not supported!'}));
            break;
    }
});

exports.clients = functions.https.onRequest(async (req, resp)=>{
    resp.setHeader('Content-Type', 'application/json');
    resp.send(JSON.stringify({timestamp: Date.now()}));
});
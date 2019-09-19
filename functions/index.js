const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

exports.timestamp = functions.https.onRequest(async (req, resp)=>{
    resp.setHeader('Content-Type', 'application/json');
    switch (req.method) {
        case 'GET':
            resp.send(JSON.stringify({timestamp: Date.now()}));
            break;
        default:
            resp.status(405).send(JSON.stringify({msg: 'Not supported!'}));
            break;
    }
});

exports.clients = functions.https.onRequest(async (req, resp)=>{
    resp.setHeader('Content-Type', 'application/json');
    switch(req.method){
        case 'GET':
            db.collection('clients').get().then((snapshot)=>{
                return resp.send(JSON.stringify(snapshot));
            }).catch((err)=>{
                resp.status(500).send(JSON.stringify({err: err}));
            })
            break;
        default:
            resp.status(405).send(JSON.stringify({msg: 'Not supported!'}));
            break;
    }
});
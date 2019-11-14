const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

exports.timestamp = functions.https.onRequest(async (req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    switch (req.method) {
        case 'GET':{
            return res.send(JSON.stringify(
                {timestamp: Date.now()}
            ));
        }
        default:{
            return res.status(405).send(JSON.stringify(
                {msg: 'Not supported!'}
            ));
        }
    }
});

exports.client_profile = functions.https.onRequest(async (req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    switch(req.method){
        case 'GET': {
            const id = req.query.id;
            const client_data = await db.collection('clients').doc(id).get()
                .then((client)=>client.data()).catch((err)=>{
                    console.error(err); return {};
                });
            const user_data = await db.collection('users').doc(id).get()
                .then((user)=>user.data()).catch((err)=>{
                    console.error(err); return {};
                });
            return res.status(200).send(JSON.stringify({
                ...client_data, ...user_data
            }));
        }
        default: {
            return res.status(405).send(JSON.stringify(
                {msg: 'Not supported!'}
            ));
        }
    }
});

exports.establishments = functions.https.onRequest(async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    switch(req.method){
        case 'GET':{
            const id = req.query.id;
            let result = {};
            if (id){
                result = db.collection('establishment').doc(id).get()
                .then(doc => ({ id, ...doc.data() }))
                .catch(err => {console.error(err); return {}})
            } else {
                result = db.collection('establishment').get()
                .then(group => {
                    let list = [];
                    group.forEach(doc => {
                        list.push({ id, ...doc.data() })
                    })
                    return list;
                })
                .catch(err => {console.error(err); return {}})
            }
            return res.status(200).send(JSON.stringify(result));
        }
        default: {
            return res.status(405).send(JSON.stringify(
                {msg: 'Not supported!'}
            ));
        }
    }
})
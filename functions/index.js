const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const get_singleRef = async(reference) => {
    resp = await reference.get()
    .then((snapshot)=>{return snapshot.data()})
    .catch((err)=>{console.log(err); return null});
    console.log('get_singleRef', resp)
    return resp;
}
const get_arrayRef = (referenceArray)=>{
    if (referenceArray.length>0){
        for (i=0; i<referenceArray.length; i++){
            referenceArray[i] = get_singleRef(referenceArray[i]);
        }
    }
}

exports.timestamp = functions.https.onRequest(async (req, resp)=>{
    resp.setHeader('Content-Type', 'application/json');
    switch (req.method) {
        case 'GET':
            return resp.send(JSON.stringify({timestamp: Date.now()}));
        default:
            return resp.status(405).send(JSON.stringify({msg: 'Not supported!'}));
    }
});

exports.clients = functions.https.onRequest(async (req, resp)=>{
    resp.setHeader('Content-Type', 'application/json');
    switch(req.method){
        case 'GET':
            db.collection('clients').get().then((client_snapshot)=>{
                let clients = {};
                client_snapshot.forEach((client)=>{
                    let client_data = client.data();
                    _ref = get_singleRef(client_data.country);
                    console.log("clients", _ref)
                    client_data.country = _ref;
                    //get_arrayRef(client_data.favorites.dishes);
                    //get_arrayRef(client_data.favorites.establishments);
                    clients[client.id] = client_data;
                });
                return resp.send(JSON.stringify(clients));
            }).catch((err)=>{
                console.log(err);
                return resp.status(500).send(JSON.stringify({err: 'Could not retrieve data sucessfully!'}));
            })
            break;
        default:
            return resp.status(405).send(JSON.stringify({msg: 'Not supported!'}));
    }
});
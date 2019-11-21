const { functions } = require("./config");

/**/

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

/**/

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
            const result = {...client_data, ...user_data};
            return res.status(200).send(JSON.stringify(result));
        }
        default: {
            return res.status(405).send(JSON.stringify(
                {msg: 'Not supported!'}
            ));
        }
    }
});

/**/
const { getEstablishmentList, getEstablishmentSingle } = require("./resources/establishment");
exports.establishments = functions.https.onRequest(async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    switch(req.method){
        case 'GET': {
            if (req.query.id) return await getEstablishmentSingle(req, res);
            else return await getEstablishmentList(req, res);
        }
        default: {
            return res.status(405).send(JSON.stringify(
                {msg: 'Not supported!'}
            ));
        }
    }
});

/**/
const { getDishList, getDishSingle } = require("./resources/dishes");
exports.dishes = functions.https.onRequest(async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    switch(req.method){
        case 'GET': {
            if (req.query.menu_id) return await getDishList(req, res);
            else if (req.query.id) return await getDishSingle(req, res);
            else return res.status(400).send(JSON.stringify(
                {msg: 'Missing "id" or "menu_id"!'}
            ));
        }
        default: {
            return res.status(405).send(JSON.stringify(
                {msg: 'Not supported!'}
            ));
        }
    }
});

/**/
const { getOrderList, getOrderSingle, postOrder } = require("./resources/orders");
exports.orders = functions.https.onRequest(async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    switch(req.method){
        case 'GET': {
            if (req.query.client_id){
                if (req.query.id) return await getOrderSingle(req, res);
                else return await getOrderList(req, res);
            } else return res.status(400).send(JSON.stringify(
                {msg: 'Missing "client_id"!'}
            ));
        }
        case 'POST': {
            return await postOrder(req, res);
        }
        default: {
            return res.status(405).send(JSON.stringify(
                {msg: 'Not supported!'}
            ));
        }
    }
});

/**/
const { getReservationList, getReservationSingle, postReservations } = require("./resources/reservations");
exports.reservations = functions.https.onRequest(async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    switch(req.method){
        case 'GET': {
            if (req.query.client_id){
                if (req.query.id) return await getReservationSingle(req, res);
                else return await getReservationList(req, res);
            } else return res.status(400).send(JSON.stringify(
                {msg: 'Missing "client_id"!'}
            ));
        }
        case 'POST': {
            return await postReservations(req, res);
        }
        default: {
            return res.status(405).send(JSON.stringify(
                {msg: 'Not supported!'}
            ));
        }
    }
});
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
const { getClientSingle } = require("./resources/clients");
exports.client_profile = functions.https.onRequest(async (req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    switch(req.method){
        case 'GET': {
            if (req.query.id) return await getClientSingle(req, res);
            else return res.status(400).send(JSON.stringify(
                {msg: 'Missing "id"!'}
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
            if (req.query.id) return await getOrderSingle(req, res);
            else return await getOrderList(req, res);
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
            if (req.query.id) return await getReservationSingle(req, res);
            else return await getReservationList(req, res);
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
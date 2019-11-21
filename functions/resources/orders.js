const { db } = require("../config");
const Timestamp = require("firebase-admin").firestore.Timestamp;

const collection = db.collection("orders");

function formatDoc(doc) {
    let data = doc.data();
    data.time = data.time.toDate();
    return { id: doc.id, ...data}
}

exports.getOrderList = async function(req, res) {
    result = await collection.where("client_id", "==", req.query.client_id).get()
    .then(group => {
        let list = [];
        group.forEach(doc => { list.push(formatDoc(doc)) });
        return list;
    })
    .catch(err => {console.error(err); return {}});
    return res.status(200).send(JSON.stringify(result));
}

exports.getOrderSingle = async function(req, res) {
    result = await collection.where("client_id", "==", req.query.client_id)
    .doc(req.query.id)
    .then(doc=>formatDoc(doc))
    .catch(err => {console.error(err); return {}});
    return res.status(200).send(JSON.stringify(result));
}

exports.postOrder = async function(req, res) {
    let data = req.body;
    if (data.client_id
    && data.establishment_id
    && data.dish_ids
    && data.comment) {
        collection.add({
            client_id: data.client_id,
            establishment_id: data.establishment_id,
            dish_ids: data.dish_ids,
            comment: data.comment,
            status: "created",
            time: Timestamp.fromDate(Date.now())
        });
        return res.status(200).send(JSON.stringify(data));
    } else return res.status(400).send(JSON.stringify(
        {msg: 'Missing data!'}
    ));
}
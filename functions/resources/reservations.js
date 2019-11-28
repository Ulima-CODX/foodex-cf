const { db } = require("../config");
const Timestamp = require("firebase-admin").firestore.Timestamp;

const collection = db.collection("reservations");

function formatDoc(doc) {
    let data = doc.data();
    data.time = data.time.toDate();
    return { id: doc.id, ...data}
}

exports.getReservationList = async function(req, res) {
    result = await collection.where("client_id", "==", req.query.client_id).get()
    .then(group => {
        let list = [];
        group.forEach(doc => { list.push(formatDoc(doc)) });
        return list;
    })
    .catch(err => {console.error(err); return {}});
    return res.status(200).send(JSON.stringify(result));
}

exports.getReservationSingle = async function(req, res) {
    result = await collection.doc(req.query.id).get()
    .then(doc=>formatDoc(doc))
    .catch(err => {console.error(err); return {}});
    return res.status(200).send(JSON.stringify(result));
}

exports.postReservations = async function(req, res) {
    let data = req.body;
    if (data.client_id
    && data.establishment_id
    && data.order_ids
    && data.attendees
    && data.comment) {
        collection.add({
            client_id: data.client_id,
            establishment_id: data.establishment_id,
            order_ids: data.order_ids,
            attendees: data.attendees,
            comment: data.comment,
            status: "created",
            time: Timestamp.fromDate(Date.now())
        });
        return res.status(200).send(JSON.stringify(data));
    } else return res.status(400).send(JSON.stringify(
        {msg: 'Missing data!'}
    ));
}
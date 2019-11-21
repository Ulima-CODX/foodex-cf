const { db } = require("../config");

const collection = db.collection('establishments');

function formatDoc(doc){
    let data = doc.data();
    delete data.order_ids;
    delete data.reservation_ids;
    return { id: doc.id, ...data }
}

exports.getEstablishmentList = async function(req, res) {
    result = await collection.get()
    .then(group => {
        let list = [];
        group.forEach(doc => { list.push(formatDoc(doc)) });
        return list;
    })
    .catch(err => {console.error(err); return {}});
    return res.status(200).send(JSON.stringify(result));
}

exports.getEstablishmentSingle = async function(req, res) {
    result = await collection.doc(req.query.id)
    .then(doc=>formatDoc(doc))
    .catch(err => {console.error(err); return {}});
    return res.status(200).send(JSON.stringify(result));
}
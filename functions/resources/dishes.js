const { db } = require("../config");

const collection = db.collection("dishes");

function formatDoc(doc) {
    let data = doc.data();
    return { id: doc.id, ...data}
}

exports.getDishList = async function(req, res) {
    result = await collection.where("menu_id", "==", req.query.menu_id).get()
    .then(group => {
        let list = [];
        group.forEach(doc => { list.push(formatDoc(doc)) });
        return list;
    })
    .catch(err => {console.error(err); return {}});
    return res.status(200).send(JSON.stringify(result));
}

exports.getDishSingle = async function(req, res) {
    result = await collection.doc(req.query.id)
    .then(doc=>formatDoc(doc))
    .catch(err => {console.error(err); return {}});
    return res.status(200).send(JSON.stringify(result));
}
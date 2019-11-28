const { db } = require("../config");

exports.getClientSingle = async function(req, res){
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
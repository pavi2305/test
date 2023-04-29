const Station = require('./../models').station;
const {to,ReS,ReE} = require('./../global_functions');

const insertStation = async function(req,res){
    let body = req && req.body ? req && req.body : null;
    let[err,station] = await to(Station.create(body));
    if(err) return ReE(res,err,422);
    if(station) return ReS(res,station,200);
}

module.exports = {insertStation};
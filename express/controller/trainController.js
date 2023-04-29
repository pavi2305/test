const Train = require('./../models').train;
const Station = require('./../models').station;
const Ticket = require('./../models').ticket;
const User = require('./../models').user;
const { Op } = require('sequelize');
const {to,ReE,ReS} = require('./../global_functions');
const MailService = require('./../service/mailService');

const insertTrain = async function(req,res){
    let body = req && req.body ? req && req.body : null;
    let eror,station;
    let[err,train] = await to(Train.create(body.train));
    if(err) return ReE(res,err,422);
    if(train){
        [eror,station] = await to(Station.create(body.station));
        if(eror) return ReE(res,eror,422);
    };
    if(station) return ReS(res,train,200);
}

const getTrainDetail = async function(req,res){
    let trainCondition = {};
    if(req && req.body){
        trainCondition['id']={[Op.like]:req.body.id}
    };
    let[err,train] = await to(Train.findOne({
        where:trainCondition,
        include:{
            model:Station,
            attributes:['name','arrivalTime']
        }
    }));
    if(err) return ReE(res,err,422);
    if(train) return ReS(res,train,200);
}

const sendTrainDetail = async function(req,res){
    let body = req && req.body ? req && req.body : null;
    let eror,sendMail;
    let[err,trainDetail] = await to(Train.findOne({
        where:{
            id:body.trainId
        }
    }));
    if(err) return ReE(res,err,422);
    let[error,userDetail] = await to(Ticket.findOne({
        where:{
            trainNo:{
                [Op.like]:trainDetail.trainNo
        }},
        include:{
            model:User
        }
}));
    if(error) return ReE(res,error,422);
    console.log(userDetail);
    if(userDetail){
        [eror,sendMail] = await to(MailService.sendMail(userDetail.user.email,`<h1>trainDetails %trainNo% %trainName% %destination%`,{
            trainNo:trainDetail.trainNo,
            trainName:trainDetail.name,
            destination:trainDetail.destination
        }));
        if(eror) return ReE(res,eror,422);
    };
    if(sendMail) return ReS(res,{trainDetail},200);
}

module.exports = {insertTrain,getTrainDetail,sendTrainDetail};
const Passenger = require('./../models').passenger;
const Ticket = require('./../models').ticket;
const { Op } = require('sequelize');
const {to,ReS,ReE} = require('./../global_functions');

const insertPassenger = async function(req,res){
    let body = req && req.body ? req && req.body : null;
    let eror,ticket;
    let[err,passenger] = await to(Passenger.bulkCreate(body.passenger));
    if(err) return ReE(res,err,422);
    [eror,ticket] = await to(Ticket.create(body.bookTicket));
    if(eror) return ReE(res,eror,200);
    if(ticket) return ReS(res,ticket,200);
}

const getPassenger = async function(req,res){
    let passengerCondition={};
    if(req && req.body){
        passengerCondition['gender']={
            [Op.like]:req.body.gender
        },
        passengerCondition['age']={
            [Op.between]:[req.body.startAge,req.body.endAge]
        }
    }
    let[err,passenger] = await to(Passenger.findAll({
        where:passengerCondition
    }));
    if(err) return ReE(res,err,422);
    if(passenger) return ReS(res,passenger,200);
}

module.exports = {insertPassenger,getPassenger};
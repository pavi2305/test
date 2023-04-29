const Ticket = require('./../models').ticket;
const { fn, Sequelize } = require('sequelize');
const {to,ReS,ReE} = require('./../global_functions');

const insertTicket = async function(req,res){
    let body = req && req.body ? req && req.body : null;
    let[err,ticket] = await to(Ticket.create(body));
    if(err) return ReE(res,err,422);
    if(ticket) return ReS(res,ticket,200);
}

const avgTicketAmount = async function(req,res){
    let[err,ticketAmount] = await to(Ticket.findAll({
        attributes:[[fn("avg",Sequelize.col('amount')),"averageTicketAmount"]]
    }));
    if(err) return ReE(res,err,422);
    if(ticketAmount) return ReS(res,ticketAmount,200);
}

module.exports = {insertTicket,avgTicketAmount};
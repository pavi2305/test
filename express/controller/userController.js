const User = require('./../models').user;
const Ticket = require('./../models').ticket;
const { Op, fn,Sequelize } = require('sequelize');
const {to,ReE,ReS, TE} = require('./../global_functions');
const MailService = require('./../service/mailService');

const signUp = async function(req,res){
    let eror,response;
    let body = req && req.body ? req && req.body : null;
    console.log('---------------->',body);
    let[err,user] = await to(User.create(body));
    if(err) {
        console.log('err vlaue', err);
        return ReE(res,err,422);
    }
    if(user){
        console.log('inside user');
        [eror,response] = await to(MailService.sendMail(body.email,`<h1>hii %userName% has been successfully registered on IRCTC booking (%email%)`,{
            userName:body.fName+" "+body.lName,
            email:body.email
        }));
        if(eror) return ReE(res,eror,422);
        console.log(eror);
    }
    if(response) return ReS(res,{user},200);
};

const signIn = async function(req,res){
    let userDetails ={};
    let[err,user] = await to(User.findOne({
        where:{
            email:req.body.email
        }
    }));
    if(err) return ReE(res,err,422);
    [err,token] = await to(user.getJwt());
    if(err) return TE(err.message);
    if(user && token){
        userDetails['user'] = user;
        userDetails['token'] = token;
    }
    if(userDetails) return ReS(res,userDetails,200);
}

const getUserDetails = async function(req,res){
    let nameCondition = {};
    if(req && req.body){
        nameCondition['fName']={
            [Op.startsWith]:req.body.startsWith
        }
    };
    let[err,data] = await to(User.findAll({
        where:nameCondition,
        offset:0,
        limit:2
    }));
    if(err) return ReE(res,err,422);
    if(data) return ReS(res,data,200);
}

const getUserBooked = async function(req,res){
    let ticketCondition ={};
    if(req && req.body){
        ticketCondition['id'] = {
            [Op.like]:req.body.userId
        }
    };
    let[err,user] = await to(User.findOne({
        where:ticketCondition,
        include:{
            model:Ticket,
            attributes:['noOfPassenger']
        }
    }));
    if(err) return ReE(res,err,422);
    if(user) return ReS(res,user,200);
}

module.exports = {signUp,signIn,getUserDetails,getUserBooked};
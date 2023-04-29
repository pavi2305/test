const nodeMailer = require('nodemailer');
require('./../config/config');
const {to,TE} = require('../global_functions.js');

const sendMail = async function(toMail,mailContent,keyObject){
    const sender = nodeMailer.createTransport({
        service : "gmail",
        auth:{
            user:CONFIG.user,
            pass:CONFIG.pass
        },
        host:"smtp.gmail.com",
        port:465
    });
    console.log('keyObject',keyObject);
    for(let key in keyObject){
        const replaceText = '%'+key+'%';
        const replaceRegExp = new RegExp(replaceText,'g');
        mailContent = mailContent.replace(replaceRegExp,keyObject[key]);
    }
    const composeMail ={
        from:'pavithrancse21@gmail.com',
        to:[toMail,'pavithranthala600@gmail.com'],
        subject :'test',
        html:mailContent
    }
    console.log('composeMail', composeMail);
    let [err,response] = await to(sender.sendMail(composeMail));
    if(err) return TE(err.message);
    return response;
}
module.exports.sendMail = sendMail;
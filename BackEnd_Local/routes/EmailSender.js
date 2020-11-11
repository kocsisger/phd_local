const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport'); //just for developing local, please don't deploy it

//Just for testing method with MailGun
module.exports = async function SendMail(mail,recepient,subject){
const auth = {
  auth: {
      api_key: process.env.API_KEY || 'mailgun_api_key', // TODO: 
      domain: process.env.DOMAIN || 'mailgun_domain' // TODO:
  }
};

let transporter = nodemailer.createTransport( mailGun(auth) );
await transporter.sendMail({
              from: 'Doktori Iskola <noreply@inf.unideb.hu>',
              to: recepient, // list of receivers
              subject: subject, // Subject line
              html:  mail, // html body
            });
}

/* This is the Deployed Email Sender Method
module.exports = async function SendMail(mail,recepient,subject){
let transporter = nodemailer.createTransport({host: 'mx.inf.unideb.hu',port:25,secure:false});
const message = {  from: 'Doktori Iskola <noreply@inf.unideb.hu>', // sender address
                   to: recepient, // list of receivers
                   subject: subject, // Subject line
                   html: mail, // html body
                }
await transporter.sendMail(message,function(err,info) {
  if(err)
    console.log(err)
})
}
*/


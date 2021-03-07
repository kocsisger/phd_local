const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');


module.exports = async function SendMail(mail,recepient){

const auth = {
        auth: {
            api_key: process.env.API_KEY || 'mailgun_api_key', // TODO: 
            domain: process.env.DOMAIN || 'mailgun_domain' // TODO:
        }};
    
let transporter = nodemailer.createTransport( mailGun(auth) );

await transporter.sendMail({
                from: 'Doktori Iskola <noreply@unideb.hu>', // sender address
                to: recepient, // list of receivers
                subject: "Registration Data", // Subject line
                html: mail, // html body
              });
}

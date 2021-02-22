const nodemailer = require('nodemailer');

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

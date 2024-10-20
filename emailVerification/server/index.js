const express=require('express')
const app=express();
const cors=require('cors')

const { sendOtpVerification } = require('./libs/mail.js');

app.use(cors());
app.use(express.json())
app.get('/ping',(req,res)=>{
    return res.send('pong')
})

app.get('/sendmessage', (req,res)=>{
   sendOtpVerification('4567',"d.wizard.techno@gmail.com",'dpkrn','dwizard')
   return res.send("verification sent!")
})



app.listen(8080,()=>{
    console.log("listing to port http://localhost:8080")
})
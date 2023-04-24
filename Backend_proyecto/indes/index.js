const express = require('express');
const port =3000;
const app = express()
const cors = require('cors')


let reports= [  {id:"234532452",name:"",date: 0,status: "",description_short: "",description:""},
                {id:"2345234532",name:"alfkj",date: 0,status: "asdf",description_short: "asdf",description:"asdf"}]
// let inicio=[
//     {usuario:"jose", contraseña:123456789,id:777}
// ]


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.status(200).send(reports);
})

// app.post('/login', (req, res) => {
//     const { usuario, password } = req.body;
  
//     const user = inicio.find(u => u.usuario === usuario && u.password === password);
  
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }
  
//     const token = generateAuthToken(user);
  
//     res.json({ token });
//   });
//   function generateAuthToken(user) {
//     const tokenPayload = { sub: user.id, exp: Math.floor(Date.now() / 1000) + (60 * 60) };
//     console.log("funciona")
//     return jwt.sign(tokenPayload, 'mySecretKey');
//   }
  


app.get("/:id",(req,res)=>{
let report =reports.find(elem=>{
    return elem.id === req.params.id
})
if(report===undefined){
    return res.status(404).json({
        mensaje:"No se encontró ningún reporte con ese ID"
    })
}
res.status(200).json({
    report:report
})
})
app.post("/",(req,res)=>{
    if(req.body ===undefined){
        return res.status(404).json({
            mensaje:"Reporte obligatorio"
        })
    }
    reports.push(req.body)
    res.status(201).json({
        mensaje:"El reporte ha sido enviado"
    })
})

  
app.post("/observation/:id", (req, res) => {
    const id = req.params.id;
    const { observacion,fecha} = req.body;
  
    // console.log("Observacion recibida:", observacion);
  
    if (!observacion) {
      return res.status(400).json({ mensaje: "El valor de observacion es requerido" })
    }
  
    const index = reports.findIndex((r) => r.id === id);
    if (index === -1) {
      return res.status(404).json({ mensaje: "Informe no encontrado" });
    }
  
    if (!reports[index].observaciones) {
      reports[index].observaciones = [];
    }
  
    reports[index].observaciones.push({observacion,fecha});


    res.status(200).json({ mensaje: "Observacion agregada al informe", informe: reports[index] });
  });
  


app.put("/:id",(req,res)=>{
    if(req.body===undefined){
        return res.status(400).json({
            mensaje:"Reporte obligatorio para actualizar los datos"
        })
    }
    if(req.params.id===undefined){
        return res.status(400).json({
            mensaje:"El ID es obligatorio"
        })
    }

    const position = reports.findIndex(elem=>{
        return elem.id === req.params.id;
    })
    if(position<0){
        return res.status(404).json({
            mensaje:"Id no encontrado"
        })
    }
    if(req.body.name !== undefined){
        reports[position].name= req.body.name
    }
    if(req.body.date !== undefined){
        reports[position].date=req.body.date
    }
    if(req.body.status !== undefined){
        reports[position].status= req.body.status
    }
    if(req.body.description_short !== undefined){
        reports[position].description_short= req.body.description_short
    }
    if(req.body.description !== undefined){
        reports[position].description= req.body.description
    }
    if(req.body.observaciones !== undefined){
        reports[position].description= req.body.observaciones
    }
    res.status(201).json({
        mensaje:"Reporte actualizado correctamente"
    })
})

app.delete("/:id",(req,res)=>{
    if(req.params.id=="undefined"){
        return res.status(400).json({
            mensaje:"El id del reporte es obligatorio"
        }) 
    }
    
    const position = reports.findIndex(elem=>{
        return elem.id === req.params.id;
    })
    if(position<0){
        return res.status(404).json({
            mensaje:"Id no encontrado"
        })
    }
    reports.splice(position,1);
    res.status(200).json({
        mensaje:"Reporte eliminado correctamente"
    })
    console.log(reports)

})

app.listen(port,()=>{
    console.log("Servidor escuchando en "+port)
})
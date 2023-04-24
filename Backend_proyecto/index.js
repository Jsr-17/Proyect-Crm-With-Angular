const express = require('express');
const port =3000;
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
var informeSchema = new mongoose.Schema({
    id: String,
    name: String,
    date: String,
    status: String,
    description_short: String,
    description: String,
    observaciones: [{
      descripcion: String,
      fecha: String
    }]
  });
  const informe = mongoose.model('informe',informeSchema,"pruebas")



mongoose.connect('mongodb://127.0.0.1:27017/Prueba')
  .then(() => console.log('Conexión a MongoDB establecida'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

  
let reports= []
// let inicio=[
//     {usuario:"jose", contraseña:123456789,id:777}
// ]

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
 

app.get('/', (req, res) => {
    informe.find({})
      .exec()
      .then(informes => {
        res.status(200).send(informes);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error interno del servidor');
      });
  });

app.get("/:id", (req, res) => {
    informe.findOne({ id: req.params.id })
      .exec()
      .then(report => {
        if (!report) {
          return res.status(404).json({
            mensaje: "No se encontró ningún reporte con ese ID"
          });
        }
        res.status(200).json({ report });
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error interno del servidor');
      });
  });

//  app.get("/:id", (req, res) => {
//   informe.findOne({ id: req.params.id })
//   .exec()
//   .then(report => {
//     if (!report) {
//       return res.status(404).json({
//         mensaje: "No se encontró ningún reporte con ese ID"
//       });
//     }
//     res.status(200).json({ 
//       id: report.id,
//       name: report.name,
//       date: report.date,
//       status: report.status,
//       description_short: report.description_short,
//       description: report.description,
//       observaciones: report.observaciones
//     });
//   })
//   .catch(err => {
//     console.error(err);
//     res.status(500).send('Error interno del servidor');
//   });
//   });





app.post("/", (req, res) => {
    if (!req.body) {
      return res.status(400).json({ mensaje: "Los datos del informe son requeridos" });
    }
  
    const { id, name, date, status, description_short, description } = req.body;
  
    if (!id) {
      return res.status(400).json({ mensaje: "Faltan campos requeridos en el informe" });
    }
  
    const newInforme = {
      id,
      name,
      date,
      status,
      description_short,
      description,
      observaciones: []
    };
  
    const informeModel = new informe(newInforme);
  
    informeModel.save()
      .then((data) => {
        res.status(200).json({ mensaje: "Datos insertados" });
    })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ mensaje: "Error al insertar el informe" });
      });
  });
  

  app.post("/observation/:id", (req, res) => {
    const { observacion, fecha } = req.body;
  
    if (!observacion) {
      return res.status(400).json({ mensaje: "El valor de observacion es requerido" });
    }
  
    informe.findOne({ id: req.params.id })
      .exec()
      .then(report => {
        if (!report) {
          return res.status(404).json({ mensaje: "Informe no encontrado" });
        }
  
        if (!report.observaciones) {
          report.observaciones = [];
        }
  
        report.observaciones.push({ descripcion: observacion, fecha: fecha });
  
        report.save()
          .then(data => {
            res.status(200).json({ mensaje: "Observacion agregada al informe", informe: report });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ mensaje: "Error al guardar en la base de datos" });
          });
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error interno del servidor');
      });
  });
    


app.put("/:id", (req, res) => {
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

  informe.findOne({ id: req.params.id })
    .exec()
    .then(report => {
      if (!report) {
        return res.status(404).json({ mensaje: "Id no encontrado" });
      }

      if(req.body.name !== undefined){
        report.name= req.body.name
      }
      if(req.body.date !== undefined){
        report.date=req.body.date
      }
      if(req.body.status !== undefined){
        report.status= req.body.status
      }
      if(req.body.description_short !== undefined){
        report.description_short= req.body.description_short
      }
      if(req.body.description !== undefined){
        report.description= req.body.description
      }

      report.save()
        .then(data => {
          res.status(200).json({ mensaje: "Reporte actualizado correctamente", informe: report });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ mensaje: "Error al guardar en la base de datos" });
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error interno del servidor');
    });
});

app.delete("/:id",(req,res)=>{
  if(req.params.id=="undefined"){
      return res.status(400).json({
          mensaje:"El id del reporte es obligatorio"
      }) 
  }
  
  informe.findOneAndDelete({ id: req.params.id })
    .exec()
    .then(report => {
      if (!report) {
        return res.status(404).json({
          mensaje:"Id no encontrado"
        });
      }
      res.status(200).json({
        mensaje:"Reporte eliminado correctamente"
      });
      console.log(report);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error interno del servidor');
    });
});



app.listen(port,()=>{
    console.log("Servidor escuchando en "+port)
})
// app.get("/",(req,res)=>{
//     res.status(200).send(reports);

// })

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
  
// app.get("/:id",(req,res)=>{
// let report =reports.find(elem=>{
//     return elem.id === req.params.id
// })
// if(report===undefined){
//     return res.status(404).json({
//         mensaje:"No se encontró ningún reporte con ese ID"
//     })
// }
// res.status(200).json({
//     report:report
// })
// })

//   app.post("/observation/:id", (req, res) => {
//     const id = req.params.id;
//     const { observacion, fecha } = req.body;
  
//     if (!observacion) {
//       return res.status(400).json({ mensaje: "El valor de observacion es requerido" });
//     }
  
//     const index = reports.findIndex((r) => r.id === id);
//     if (index === -1) {
//       return res.status(404).json({ mensaje: "Informe no encontrado" });
//     }
  
//     if (!reports[index].observaciones) {
//       reports[index].observaciones = [];
//     }
  
//     reports[index].observaciones.push({descripcion: observacion, fecha: fecha});
  
//     let informes = new informe({
//       id: reports[index].id,
//       name: reports[index].name,
//       date: reports[index].date,
//       status: reports[index].status,
//       description_short: reports[index].description_short,
//       description: reports[index].description,
//       observaciones: reports[index].observaciones || []
//     });
  
//     informes.save()
//       .then((data) => {
//         res.status(200).json({ mensaje: "Observacion agregada al informe", informe: reports[index] });
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json({ mensaje: "Error al guardar en la base de datos" });
//       });
//   });
  

// app.put("/:id",(req,res)=>{
//     if(req.body===undefined){
//         return res.status(400).json({
//             mensaje:"Reporte obligatorio para actualizar los datos"
//         })
//     }
//     if(req.params.id===undefined){
//         return res.status(400).json({
//             mensaje:"El ID es obligatorio"
//         })
//     }

//     const position = reports.findIndex(elem=>{
//         return elem.id === req.params.id;
//     })
//     if(position<0){
//         return res.status(404).json({
//             mensaje:"Id no encontrado"
//         })
//     }
//     if(req.body.name !== undefined){
//         reports[position].name= req.body.name
//     }
//     if(req.body.date !== undefined){
//         reports[position].date=req.body.date
//     }
//     if(req.body.status !== undefined){
//         reports[position].status= req.body.status
//     }
//     if(req.body.description_short !== undefined){
//         reports[position].description_short= req.body.description_short
//     }
//     if(req.body.description !== undefined){
//         reports[position].description= req.body.description
//     }
//     if(req.body.observaciones !== undefined){
//         reports[position].description= req.body.observaciones
//     }
//     res.status(201).json({
//         mensaje:"Reporte actualizado correctamente"
//     })
// })



// app.put("/observation/:id", (req, res) => {
//   const { observaciones, fecha } = req.body;

//   if (!observaciones) {
//     return res.status(400).json({ mensaje: "El valor de observaciones es requerido" });
//   }

//   informe.findOne({ id: req.params.id })
//     .exec()
//     .then(report => {
//       if (!report) {
//         return res.status(404).json({ mensaje: "Informe no encontrado" });
//       }

//       if (!report.observaciones) {
//         report.observaciones = [];
//       }

//       report.observaciones.push({ descripcion: observaciones, fecha: fecha });

//       report.save()
//         .then(data => {
//           res.status(200).json({ mensaje: "Observacion agregada al informe", informe: report });
//         })
//         .catch(err => {
//           console.log(err);
//           res.status(500).json({ mensaje: "Error al guardar en la base de datos" });
//         });
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).send('Error interno del servidor');
//     });
// });

// app.delete("/:id",(req,res)=>{
//     if(req.params.id=="undefined"){
//         return res.status(400).json({
//             mensaje:"El id del reporte es obligatorio"
//         }) 
//     }
    
//     const position = reports.findIndex(elem=>{
//         return elem.id === req.params.id;
//     })
//     if(position<0){
//         return res.status(404).json({
//             mensaje:"Id no encontrado"
//         })
//     }
//     reports.splice(position,1);
//     res.status(200).json({
//         mensaje:"Reporte eliminado correctamente"
//     })
//     console.log(reports)

// })
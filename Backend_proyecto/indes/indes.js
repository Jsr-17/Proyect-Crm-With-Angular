// const mongoose = require('mongoose');
// require('dotenv').config();

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(()=>{
//   console.log("Database Connected")
// }).catch(err =>{
//   console.err(err)
// })


// const SubreportSchema = new mongoose.Schema({
//   title: String,
//   content: String,
//   // Agrega los campos que necesites para cada subreporte
// });

// const ReportSchema = new mongoose.Schema({
//   header: SubreportSchema,
//   body: SubreportSchema,
//   footer: SubreportSchema,
//   // Agrega los subreportes que necesites con sus respectivos campos
// });

// const ReportModel = mongoose.model('Report', ReportSchema);

// module.exports = ReportModel;

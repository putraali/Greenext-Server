const dotenv = require("dotenv").config();

const express = require("express");
const course = require("./routes/course");

const PORT = process.env.PORT || 5000;

const app = express();

app.use("/api/v1/course", course);
// app.get("/", (req, res) => {
//   const query = "SELECT * FROM course";

//   db.query(query, (err, result) => {
//     if (err) {
//       console.log("Error executing the query", err);
//       return res.status(500).send("Database query failed.");
//     }
//     res.json(result);
//   });
// });

app.listen(PORT, () => {
  console.log(`server listen to port ${PORT}`);
});

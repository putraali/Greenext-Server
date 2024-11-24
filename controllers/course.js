const express = require("express");
const db = require("../config/db");

const app = express();

const getCourse = async (req, res) => {
  try {
    const query = "SELECT * FROM course";
    const result = await db.query(query);
    res.status(200).json({ success: true, data: result[0] });
  } catch (error) {
    console.error("Error Fetching Courses", error.message);
    res
      .status(500)
      .json({ success: false, error: "Internal Server Error", data: [] });
  }

  // db.query(query, (err, result) => {
  //   if (err) {
  //     console.log("Error executing the query", err);
  //     return res.status(500).send("Database query failed.");
  //   }
  // });
};

module.exports = {
  getCourse,
};

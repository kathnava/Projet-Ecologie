const fetch = require("node-fetch");
const LocalStorage = require("node-localstorage").LocalStorage;
let localStorage = new LocalStorage("./scratch");
//require("dotenv").config();

exports.newLike = async (req, res) => {
  await fetch(
    `http://localhost:8080/api/new//like/${req.params.id}`,
    {
      // Adding method type
      method: "POST",

      // Adding headers to the request
      headers: {
        Authorization: localStorage.getItem("token"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    }
  )
    // Converting to JSON
    .then((res) => {
      return res.json();
    })

    // Displaying results to console
    .then((json) => {
      res.redirect("/home");
    })

    .catch((err) => {
      console.log("ERR ----", err);
    });
};

exports.unLike = async (req, res) => {
  await fetch(
    `http://localhost:8080/api/new//like/${req.params.id}`,
    {
      // Adding method type
      method: "POST",

      // Adding headers to the request
      headers: {
        Authorization: localStorage.getItem("token"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    }
  )
    // Converting to JSON
    .then((res) => {
      return res.json();
    })

    // Displaying results to console
    .then((json) => {
      res.redirect("/home");
    })

    .catch((err) => {
      console.log("ERR ----", err);
    });
};
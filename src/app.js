const path = require("path");
const hbs = require("hbs");
const express = require("express");
const weather = require("./utils/weather");
//console.log(__filename);
// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));
const app = express();

////Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templetes/views");
const partialsPath = path.join(__dirname, "../templetes/partials");

/////setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", { title: "Weather app", name: "Yashvi Naik" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    helpText: "How can I help yoy!",
    name: "Yashvi Naik",
  });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About Me", name: "Yashvi naik" });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide a address term" });
  }
  weather(req.query.address, (error, { forecast, location } = {}) => {
    // console.log("Error", error);
    // console.log("Data", data);

    if (error) {
      return res.send({ error });
    }

    res.send({
      address: req.query.address,
      forecast,
      location,
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "You must provide a search term" });
  }
  console.log(req.query.search);

  res.send({
    product: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Yashvi naik",
    errorMsg: "Help artical not found!",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Yashvi naik",
    errorMsg: "404: Page not found",
  });
});
app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});

const path = require("path");

const express = require("express");
const hbs = require("hbs");

const geocode = require("./util/geocode");
const forecast = require("./util/forecast");

const app = express();

// Define paths for express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get("/", (req, res) => {
  res.render("index", {
    ip: req.ip.split(":")[3],
    title: "Weather app",
    fullName: "Andrew Mead",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    ip: req.ip.split(":")[3],
    title: "About Me",
    fullName: "Andrew Mead",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    ip: req.ip.split(":")[3],
    title: "Help",
    fullName: "Andrew Mead",
    helpText: "This is some helpful text",
  });
});

app.get("/weather", (req, res) => {
  console.log(req.query);

  if (!req.query.address) {
    return res.send({
      error: "address must be provided!",
    });
  }

  geocode(req.query.address, (error, { lat, long, place_name } = {}) => {
    if (error)
      return res.send({
        Error: error,
      });

    console.log(lat, long);
    console.log(place_name);

    forecast(lat, long, (err, data) => {
      if (err)
        return res.send({
          error: error,
        });
      res.send({
        data: data,
      });
    });
  });
});

app.get("/products", (req, res) => {
  console.log(req.query);
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404.hbs", {
    title: "404",
    errorMessage: "Help article not found",
    fullName: "Andrew Mead",
  });
});

app.get("*", (req, res) => {
  res.render("404.hbs", {
    title: "404",
    errorMessage: "Page not found",
    fullName: "Andrew Mead",
  });
});

app.listen(3000, () => {
  console.log(`Server is up  on port 3000`);
});

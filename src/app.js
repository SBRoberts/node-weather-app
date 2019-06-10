const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    heading: "Weather",
    name: "Spencer Roberts"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    heading: "Aboot",
    name: "Spencer Roberts"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    heading: "HELP",
    message:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.Accusantium nostrum hic molestias explicabo officia qui.",
    name: "Spencer Roberts"
  });
});

app.get("/weather", (req, res) => {
  const { location } = req.query;
  if (!location) {
    return res.send({
      error: "You must provide a location"
    });
  }
  geocode(location, (err, geocodeData) => {
    if (err) {
      console.log(err);
      return err;
    }
    const { lat, long, location } = geocodeData || {};

    forecast(lat, long, (err, forecastData) => {
      if (err) {
        console.log(err);
        return err;
      }

      const { temperature, precipProbability } = forecastData;
      const weatherString = `The weather in ${location} is ${temperature} degrees celcius with ${precipProbability}% chance of rain`;

      res.send({ geocodeData, forecastData });
      // res.render("index", {
      //   heading: "The Weather Today",
      //   weather: weatherString,
      //   name: "Spencer Roberts"
      // });
    });
  });
});

app.get("/products", (req, res) => {
  console.log(req.query.search);

  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  const obj = {
    shirts: 23,
    undies: 11,
    socks: 7
  };
  res.send(obj);
});

app.get("/help/*", (req, res) => {
  req.url = "/help";
  res.render("help", {
    heading: "Weather",
    name: "Spencer Roberts"
  });
});

app.get("*", (req, res) => {
  req.url = "/";
  res.render("index", {
    heading: "Weather",
    name: "Spencer Roberts"
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

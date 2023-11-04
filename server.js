const express = require("express");
const app = express();

const motoGPData = [
  {
    circuit: "Losail",
    location: "Qatar",
    winner: { firstName: "Andrea", lastName: "Dovizioso", country: "Italy" },
  },
  {
    circuit: "Autodromo",
    location: "Argentine",
    winner: { firstName: "Cal", lastName: "Crutchlow", country: "UK" },
  },
  {
    circuit: "De Jerez",
    location: "Spain",
    winner: { firstName: "Valentino", lastName: "Rossi", country: "Italy" },
  },
  {
    circuit: "Mugello",
    location: "Italy",
    winner: { firstName: "Marc", lastName: "Marquez", country: "Spain" },
  },
];

app.get("/", (req, res) => {
  res.json(motoGPData);
});

app.get("/country", (req, res) => {
  const groupedByCountry = {};
  motoGPData.forEach((item) => {
    const country = item.winner.country;
    if (groupedByCountry[country]) {
      groupedByCountry[country].push(item);
    } else {
      groupedByCountry[country] = [item];
    }
  });
  res.json(groupedByCountry);
});

app.get("/name", (req, res) => {
  const groupedByName = {};
  motoGPData.forEach((item) => {
    const fullName = `${item.winner.firstName} ${item.winner.lastName}`;
    if (groupedByName[fullName]) {
      groupedByName[fullName].push(item);
    } else {
      groupedByName[fullName] = [item];
    }
  });
  res.json(groupedByName);
});

app.use((req, res) => {
  res.status(400).send("Bad Request");
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

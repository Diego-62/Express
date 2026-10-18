const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const autos = [
  { id: 1, marca: "Toyota",     modelo: "Corolla", anio: 2022, precio: 389900, color: "Blanco" },
  { id: 2, marca: "Nissan",     modelo: "Versa",   anio: 2021, precio: 279900, color: "Gris" },
  { id: 3, marca: "Volkswagen", modelo: "Jetta",   anio: 2023, precio: 429900, color: "Negro" },
  { id: 4, marca: "Mazda",      modelo: "Mazda 3", anio: 2022, precio: 459900, color: "Rojo" },
  { id: 5, marca: "Chevrolet",  modelo: "Aveo",    anio: 2020, precio: 214900, color: "Azul" },
  { id: 6, marca: "Honda",      modelo: "Civic",   anio: 2023, precio: 519900, color: "Plata" },
  { id: 7, marca: "Ford",       modelo: "Focus",   anio: 2019, precio: 235000, color: "Negro" },
  { id: 8, marca: "Kia",        modelo: "Rio",     anio: 2021, precio: 262900, color: "Blanco" },
];

app.get("/", (req, res) => {
  res.json({
    servicio: "Catalogo de autos",
    rutas: ["GET /autos", "GET /autos?marca=Toyota&color=Blanco", "GET /autos/:id"],
  });
});

app.get("/autos", (req, res) => {
  const { marca, color, anio } = req.query;
  let resultado = autos;

  if (marca) resultado = resultado.filter(a => a.marca.toLowerCase() === marca.toLowerCase());
  if (color) resultado = resultado.filter(a => a.color.toLowerCase() === color.toLowerCase());
  if (anio)  resultado = resultado.filter(a => a.anio === Number(anio));

  res.json(resultado);
});

app.get("/autos/:id", (req, res) => {
  const auto = autos.find(a => a.id === Number(req.params.id));
  if (!auto) {
    return res.status(404).json({ error: "Auto no encontrado" });
  }
  res.json(auto);
});

app.listen(PORT, () => {
  console.log(`Servicio escuchando en el puerto ${PORT}`);
});
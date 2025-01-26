const concesionarios = [
  {
    id: 1,
    nombre: "Concesionario 1",
    direccion: "Calle falsa 123",
    listado_coches: [
      { id: 1, modelo: "Corsa", potencia: 100, precio: 4500 },
      { id: 2, modelo: "Forz", potencia: 200, precio: 3500 },
      { id: 3, modelo: "BMW", potencia: 300, precio: 5000 }
    ]
  },
  {
    id: 2,
    nombre: "Concesionario 2",
    direccion: "Calle falsa 456",
    coches: [
      { id: 1, modelo: "Dacia", potencia: 404, precio: 3000 },
      { id: 2, modelo: "Volvo", potencia: 204, precio: 4560 },
      { id: 3, modelo: "Renault", potencia: 234, precio: 2510 }
    ]
  }
];

module.exports = concesionarios;

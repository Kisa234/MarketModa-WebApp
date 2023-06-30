module.exports = function () {
  var data = {
    usuarios: [
      {
        id: 1,
        nameUsuario: "Luis Pérez Reyes",
        birthDateUsuario: "2000-09-10",
        emailUsuario: "lperez@gmail.com",
        passwordUsuario: "123456789",
        phoneNumberUsuario: "948548645",
        countryUsuario: "Perú",
        imagen: "assets/pedro-perfil.jpg"
      },
      {
        id: 2,
        nameUsuario: "Ana Díaz Reyes",
        birthDateUsuario: "1980-10-10",
        emailUsuario: "adiaz@gmail.com",
        passwordUsuario: "5473829",
        phoneNumberUsuario: "965748567",
        countryUsuario: "Chile",
        imagen: "assets/ana-perfil.jpg"
      },
      {
        id: 3,
        nameUsuario: "Gerardo Santillán Reyes",
        birthDateUsuario: "2002-06-05",
        emailUsuario: "gsreyes@gmail.com",
        passwordUsuario: "97vfun434",
        phoneNumberUsuario: "965783922",
        countryUsuario: "Estados Unidos",
        imagen: "assets/gerardo-perfil.jpg"
      },
      {
        id: 4,
        nameUsuario: "Juana Pérez Reyes",
        birthDateUsuario: "2000-09-10",
        emailUsuario: "jperez@gmail.com",
        passwordUsuario: "jsssk9274ma",
        phoneNumberUsuario: "988563917",
        countryUsuario: "Italia",
        imagen: "assets/juana-perfil.jpg"
      },
      {
        id: 5,
        nameUsuario: "Pedro Carpio",
        birthDateUsuario: "2000-19-11",
        emailUsuario: "jcarpio@gmail.com",
        passwordUsuario: "bdwojnj382",
        phoneNumberUsuario: "988673541",
        countryUsuario: "Perú",
        imagen: "assets/pedro-perfil.jpg"
      }
    ],
    prendas: [
      {
        id: 1,
        idCreador: 1,
        imagen: "assets/luis-prenda1.jpg",
        titulo: "Elegante Vestido Azul",
        descripcion: "Vestido elegante de color azul.",
        tipo: "Vestidos"
      },
      {
        id: 2,
        idCreador: 1,
        imagen: "assets/luis-prenda2.jpg",
        titulo: "Camisa a Rayas",
        descripcion: "Camisa de mangas largas con rayas.",
        tipo: "Camisas"
      },
      {
        id: 3,
        idCreador: 2,
        imagen: "assets/ana-prenda1.jpg",
        titulo: "Sandalia de Verano",
        descripcion: "Sandalia cómoda para usar en el verano.",
        tipo: "Zapatos"
      },
      {
        id: 4,
        idCreador: 2,
        imagen: "assets/ana-prenda2.jpg",
        titulo: "Pantalones Vaqueros",
        descripcion: "Pantalones de mezclilla en estilo vaquero.",
        tipo: "Pantalones"
      },
      {
        id: 5,
        idCreador: 3,
        imagen: "assets/gerardo-prenda1.jpg",
        titulo: "Chaqueta de Cuero",
        descripcion: "Chaqueta de cuero genuino para el invierno.",
        tipo: "Chaquetas"
      },
      {
        id: 6,
        idCreador: 3,
        imagen: "assets/gerardo-prenda2.jpg",
        titulo: "Gorra Deportiva",
        descripcion: "Gorra deportiva para protegerte del sol.",
        tipo: "Accesorios"
      },
      {
        id: 7,
        idCreador: 3,
        imagen: "assets/gerardo-prenda3.jpg",
        titulo: "Vestido Floral",
        descripcion: "Vestido con estampado floral perfecto para ocasiones especiales.",
        tipo: "Vestidos"
      },
      {
        id: 8,
        idCreador: 4,
        imagen: "assets/juana-prenda1.jpg",
        titulo: "Falda Plisada",
        descripcion: "Falda plisada de colores vibrantes.",
        tipo: "Faldas"
      },
      {
        id: 9,
        idCreador: 5,
        imagen: "assets/pedro-prenda1.jpg",
        titulo: "Zapatos de Cuero",
        descripcion: "Zapatos de cuero elegantes y duraderos.",
        tipo: "Zapatos"
      },
      {
        id: 10,
        idCreador: 5,
        imagen: "assets/pedro-prenda2.jpg",
        titulo: "Camiseta Estampada",
        descripcion: "Camiseta con un estampado único y llamativo.",
        tipo: "Camisetas"
      },
      {
        id: 11,
        idCreador: 5,
        imagen: "assets/pedro-prenda3.jpg",
        titulo: "Pantalones de Jogging",
        descripcion: "Pantalones cómodos para hacer ejercicio o relajarse en casa.",
        tipo: "Pantalones"
      }
    ]
  };

  return data;
};

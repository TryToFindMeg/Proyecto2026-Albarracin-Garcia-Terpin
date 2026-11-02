// Nombres, artistas, colores y descripciones según las imágenes del catálogo.
// Precios, talles y disponibilidad conservan los datos de la demostración.
const productos = [
    {
        "id": "remera-highway-grooves",
        "nombre": "Remera AC/DC Highway to Hell",
        "descripcion": "Remera negra con el logo de AC/DC en rojo, un retrato de la banda y el texto Highway to Hell.",
        "categoria": "remeras",
        "genero": "rock",
        "artista": "AC/DC",
        "precio": 28900,
        "imagen": "imagenes/remera-acdc.jpeg",
        "alt": "Remera negra con el logo de AC/DC en rojo, un retrato de la banda y el texto Highway to Hell.",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Negro"
        ],
        "disponible": true,
        "nuevo": true,
        "orden": 0
    },
    {
        "id": "remera-spin-forever",
        "nombre": "Remera Radiohead",
        "descripcion": "Remera cruda con el nombre de Radiohead y una composición gráfica en blanco y negro en el frente.",
        "categoria": "remeras",
        "genero": "alternativo",
        "artista": "Radiohead",
        "precio": 31500,
        "imagen": "imagenes/remera-radiohead.jpeg",
        "alt": "Remera cruda con el nombre de Radiohead y una composición gráfica en blanco y negro en el frente.",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Crudo"
        ],
        "disponible": true,
        "nuevo": true,
        "orden": 1
    },
    {
        "id": "remera-music-heals",
        "nombre": "Remera Kiss Rock 'n' Roll",
        "descripcion": "Remera negra con el logo de Kiss, un retrato de la banda y una estampa de estilo rock en tonos rojos y claros.",
        "categoria": "remeras",
        "genero": "rock",
        "artista": "Kiss",
        "precio": 34900,
        "imagen": "imagenes/remera-kiss.jpeg",
        "alt": "Remera negra con el logo de Kiss, un retrato de la banda y una estampa de estilo rock en tonos rojos y claros.",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Negro"
        ],
        "disponible": true,
        "nuevo": false,
        "orden": 2
    },
    {
        "id": "remera-stay-wild",
        "nombre": "Remera The 1975",
        "descripcion": "Remera blanca con el nombre de The 1975 en rojo, una fotografía de la banda y detalles gráficos en negro.",
        "categoria": "remeras",
        "genero": "pop",
        "artista": "The 1975",
        "precio": 28900,
        "imagen": "imagenes/remera-the-1975.jpeg",
        "alt": "Remera blanca con el nombre de The 1975 en rojo, una fotografía de la banda y detalles gráficos en negro.",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Blanco"
        ],
        "disponible": true,
        "nuevo": true,
        "orden": 3
    },
    {
        "id": "remera-good-music-only",
        "nombre": "Remera The Smiths",
        "descripcion": "Remera cruda con el nombre de The Smiths y una fotografía de los integrantes estampada en negro.",
        "categoria": "remeras",
        "genero": "indie",
        "artista": "The Smiths",
        "precio": 32900,
        "imagen": "imagenes/remera-the-smiths.jpeg",
        "alt": "Remera cruda con el nombre de The Smiths y una fotografía de los integrantes estampada en negro.",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Crudo"
        ],
        "disponible": true,
        "nuevo": false,
        "orden": 4
    },
    {
        "id": "remera-vinyl-forever",
        "nombre": "Remera Nirvana In Utero",
        "descripcion": "Remera cruda con el nombre de Nirvana, una figura alada en el centro y la inscripción In Utero.",
        "categoria": "remeras",
        "genero": "grunge",
        "artista": "Nirvana",
        "precio": 36500,
        "imagen": "imagenes/remera-nirvana.jpeg",
        "alt": "Remera cruda con el nombre de Nirvana, una figura alada en el centro y la inscripción In Utero.",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Crudo"
        ],
        "disponible": true,
        "nuevo": true,
        "orden": 5
    },
    {
        "id": "remera-midnight-radio",
        "nombre": "Remera Metallica Damage Inc.",
        "descripcion": "Remera negra con el logo de Metallica, una fotografía de la banda y la inscripción Damage Inc. 1986.",
        "categoria": "remeras",
        "genero": "metal",
        "artista": "Metallica",
        "precio": 38900,
        "imagen": "imagenes/remera-metallica.jpeg",
        "alt": "Remera negra con el logo de Metallica, una fotografía de la banda y la inscripción Damage Inc. 1986.",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Negro"
        ],
        "disponible": false,
        "nuevo": false,
        "orden": 6
    },
    {
        "id": "remera-electric-soul",
        "nombre": "Remera David Bowie",
        "descripcion": "Remera cruda con un retrato de David Bowie, su nombre en rojo y un diseño enmarcado con estrellas.",
        "categoria": "remeras",
        "genero": "rock",
        "artista": "David Bowie",
        "precio": 29900,
        "imagen": "imagenes/remera-david-bowie.jpeg",
        "alt": "Remera cruda con un retrato de David Bowie, su nombre en rojo y un diseño enmarcado con estrellas.",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Crudo"
        ],
        "disponible": true,
        "nuevo": false,
        "orden": 7
    },
    {
        "id": "remera-loud-free",
        "nombre": "Remera Sex Pistols Pretty Vacant",
        "descripcion": "Remera cruda con una estampa de Sex Pistols, un detalle rosa y la inscripción Pretty Vacant.",
        "categoria": "remeras",
        "genero": "punk",
        "artista": "Sex Pistols",
        "precio": 41900,
        "imagen": "imagenes/remera-sex-pistols.jpeg",
        "alt": "Remera cruda con una estampa de Sex Pistols, un detalle rosa y la inscripción Pretty Vacant.",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Crudo"
        ],
        "disponible": true,
        "nuevo": false,
        "orden": 8
    },
    {
        "id": "remera-backstage-club",
        "nombre": "Remera Queen",
        "descripcion": "Remera gris clara con el nombre de Queen y una fotografía de los integrantes dentro de un recuadro.",
        "categoria": "remeras",
        "genero": "clasicos",
        "artista": "Queen",
        "precio": 33500,
        "imagen": "imagenes/remera-queen.jpeg",
        "alt": "Remera gris clara con el nombre de Queen y una fotografía de los integrantes dentro de un recuadro.",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Gris"
        ],
        "disponible": true,
        "nuevo": true,
        "orden": 9
    },
    {
        "id": "remera-analog-heart",
        "nombre": "Remera The Beatles",
        "descripcion": "Remera negra con el nombre de The Beatles en rojo y una composición de fotografías de la banda en blanco y negro.",
        "categoria": "remeras",
        "genero": "clasicos",
        "artista": "The Beatles",
        "precio": 35900,
        "imagen": "imagenes/remera-the-beatles.jpeg",
        "alt": "Remera negra con el nombre de The Beatles en rojo y una composición de fotografías de la banda en blanco y negro.",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Negro"
        ],
        "disponible": true,
        "nuevo": false,
        "orden": 10
    },
    {
        "id": "remera-sunday-records",
        "nombre": "Remera Megadeth",
        "descripcion": "Remera negra con el logo de Megadeth y una ilustración de una figura con balanza en tonos verde oliva.",
        "categoria": "remeras",
        "genero": "metal",
        "artista": "Megadeth",
        "precio": 30500,
        "imagen": "imagenes/remera-megadeth.jpeg",
        "alt": "Remera negra con el logo de Megadeth y una ilustración de una figura con balanza en tonos verde oliva.",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Negro"
        ],
        "disponible": true,
        "nuevo": false,
        "orden": 11
    },
    {
        "id": "buzo-music-heals",
        "nombre": "Buzo Alice in Chains",
        "descripcion": "Buzo gris oscuro con capucha, el nombre de Alice in Chains en el frente y una composición gráfica en la espalda.",
        "categoria": "buzos",
        "genero": "grunge",
        "artista": "Alice in Chains",
        "precio": 58900,
        "imagen": "imagenes/buzo-alice-in-chains.jpeg",
        "alt": "Buzo gris oscuro con capucha, el nombre de Alice in Chains en el frente y una composición gráfica en la espalda.",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Gris"
        ],
        "disponible": true,
        "nuevo": true,
        "orden": 12
    },
    {
        "id": "buzo-backstage-club",
        "nombre": "Buzo Deftones",
        "descripcion": "Buzo negro con capucha y una estampa roja de Deftones con la imagen de un búho en el frente.",
        "categoria": "buzos",
        "genero": "metal",
        "artista": "Deftones",
        "precio": 62400,
        "imagen": "imagenes/buzo-deftones.jpeg",
        "alt": "Buzo negro con capucha y una estampa roja de Deftones con la imagen de un búho en el frente.",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Negro"
        ],
        "disponible": true,
        "nuevo": true,
        "orden": 13
    },
    {
        "id": "buzo-analog-dreams",
        "nombre": "Buzo Fleetwood Mac Rumours",
        "descripcion": "Buzo azul marino con capucha, el nombre de Fleetwood Mac y una estampa clara inspirada en Rumours.",
        "categoria": "buzos",
        "genero": "clasicos",
        "artista": "Fleetwood Mac",
        "precio": 56300,
        "imagen": "imagenes/buzo-fleetwood-mac.jpeg",
        "alt": "Buzo azul marino con capucha, el nombre de Fleetwood Mac y una estampa clara inspirada en Rumours.",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Azul marino"
        ],
        "disponible": true,
        "nuevo": false,
        "orden": 14
    },
    {
        "id": "buzo-loud-free",
        "nombre": "Buzo Led Zeppelin",
        "descripcion": "Buzo negro con capucha, el nombre de Led Zeppelin, una figura alada y referencias gráficas a una gira.",
        "categoria": "buzos",
        "genero": "clasicos",
        "artista": "Led Zeppelin",
        "precio": 64800,
        "imagen": "imagenes/buzo-led-zeppelin.jpeg",
        "alt": "Buzo negro con capucha, el nombre de Led Zeppelin, una figura alada y referencias gráficas a una gira.",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Negro"
        ],
        "disponible": true,
        "nuevo": true,
        "orden": 15
    },
    {
        "id": "buzo-midnight-radio",
        "nombre": "Buzo Nirvana In Utero",
        "descripcion": "Buzo negro con capucha y diseños de Nirvana en el frente y la espalda, con una figura alada en la estampa principal.",
        "categoria": "buzos",
        "genero": "grunge",
        "artista": "Nirvana",
        "precio": 59900,
        "imagen": "imagenes/buzo-nirvana.jpeg",
        "alt": "Buzo negro con capucha y diseños de Nirvana en el frente y la espalda, con una figura alada en la estampa principal.",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Negro"
        ],
        "disponible": true,
        "nuevo": false,
        "orden": 16
    },
    {
        "id": "buzo-good-music-only",
        "nombre": "Buzo Oasis",
        "descripcion": "Buzo gris con capucha y el logo rectangular de Oasis en el frente.",
        "categoria": "buzos",
        "genero": "alternativo",
        "artista": "Oasis",
        "precio": 57100,
        "imagen": "imagenes/buzo-oasis.jpeg",
        "alt": "Buzo gris con capucha y el logo rectangular de Oasis en el frente.",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Gris"
        ],
        "disponible": true,
        "nuevo": false,
        "orden": 17
    },
    {
        "id": "buzo-vinyl-society",
        "nombre": "Buzo Pink Floyd",
        "descripcion": "Buzo negro con capucha y una estampa de Pink Floyd que combina un prisma, colores y el estilo de un cartel musical.",
        "categoria": "buzos",
        "genero": "clasicos",
        "artista": "Pink Floyd",
        "precio": 61500,
        "imagen": "imagenes/buzo-pink-floyd.jpeg",
        "alt": "Buzo negro con capucha y una estampa de Pink Floyd que combina un prisma, colores y el estilo de un cartel musical.",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Negro"
        ],
        "disponible": true,
        "nuevo": true,
        "orden": 18
    },
    {
        "id": "buzo-electric-soul",
        "nombre": "Buzo Queen Escudo",
        "descripcion": "Buzo negro con capucha, el escudo de Queen en tonos cálidos y el nombre de la banda en rojo.",
        "categoria": "buzos",
        "genero": "clasicos",
        "artista": "Queen",
        "precio": 63900,
        "imagen": "imagenes/buzo-queen.jpeg",
        "alt": "Buzo negro con capucha, el escudo de Queen en tonos cálidos y el nombre de la banda en rojo.",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Negro"
        ],
        "disponible": true,
        "nuevo": false,
        "orden": 19
    },
    {
        "id": "buzo-tour-memories",
        "nombre": "Buzo Radiohead",
        "descripcion": "Buzo gris oscuro de cuello redondo, con el nombre de Radiohead y una ilustración en blanco y negro en el frente.",
        "categoria": "buzos",
        "genero": "alternativo",
        "artista": "Radiohead",
        "precio": 58200,
        "imagen": "imagenes/buzo-radiohead.jpeg",
        "alt": "Buzo gris oscuro de cuello redondo, con el nombre de Radiohead y una ilustración en blanco y negro en el frente.",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Gris"
        ],
        "disponible": true,
        "nuevo": false,
        "orden": 20
    },
    {
        "id": "buzo-sunday-records",
        "nombre": "Buzo The Rolling Stones",
        "descripcion": "Buzo negro con capucha, el nombre de The Rolling Stones y una estampa con retratos y detalles rojos.",
        "categoria": "buzos",
        "genero": "clasicos",
        "artista": "The Rolling Stones",
        "precio": 54400,
        "imagen": "imagenes/buzo-rolling-stones.jpeg",
        "alt": "Buzo negro con capucha, el nombre de The Rolling Stones y una estampa con retratos y detalles rojos.",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Negro"
        ],
        "disponible": true,
        "nuevo": false,
        "orden": 21
    },
    {
        "id": "buzo-stereo-hearts",
        "nombre": "Buzo The Beatles Come Together",
        "descripcion": "Buzo gris con capucha, retratos de The Beatles, flores de colores y la inscripción Come Together.",
        "categoria": "buzos",
        "genero": "clasicos",
        "artista": "The Beatles",
        "precio": 60600,
        "imagen": "imagenes/buzo-the-beatles.jpeg",
        "alt": "Buzo gris con capucha, retratos de The Beatles, flores de colores y la inscripción Come Together.",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Gris"
        ],
        "disponible": true,
        "nuevo": true,
        "orden": 22
    },
    {
        "id": "buzo-after-hours",
        "nombre": "Buzo The Cure",
        "descripcion": "Buzo gris oscuro con capucha, el nombre de The Cure y un retrato estampado en blanco en el frente.",
        "categoria": "buzos",
        "genero": "alternativo",
        "artista": "The Cure",
        "precio": 62900,
        "imagen": "imagenes/buzo-the-cure.jpeg",
        "alt": "Buzo gris oscuro con capucha, el nombre de The Cure y un retrato estampado en blanco en el frente.",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Gris"
        ],
        "disponible": false,
        "nuevo": false,
        "orden": 23
    },
    {
        "id": "campera-soundtrack",
        "nombre": "Campera Guns N' Roses",
        "descripcion": "Campera de jean azul con una estampa de Guns N' Roses en la espalda, con rosas y una ilustración central.",
        "categoria": "camperas",
        "genero": "rock",
        "artista": "Guns N' Roses",
        "precio": 65000,
        "imagen": "imagenes/campera-guns-n-roses.jpeg",
        "alt": "Campera de jean azul con una estampa de Guns N' Roses en la espalda, con rosas y una ilustración central.",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Azul"
        ],
        "disponible": true,
        "nuevo": false,
        "orden": 24
    },
    {
        "id": "tote-vinyl-forever",
        "nombre": "Tote bag My Chemical Romance",
        "descripcion": "Tote bag cruda con asas largas, un corazón formado por texto y el logo de My Chemical Romance en negro.",
        "categoria": "accesorios",
        "genero": "alternativo",
        "artista": "My Chemical Romance",
        "precio": 18000,
        "imagen": "imagenes/tote-my-chemical-romance.jpeg",
        "alt": "Tote bag cruda con asas largas, un corazón formado por texto y el logo de My Chemical Romance en negro.",
        "talles": [
            "Único"
        ],
        "colores": [
            "Crudo"
        ],
        "disponible": true,
        "nuevo": false,
        "orden": 25
    }
];

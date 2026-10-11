// Géneros y artistas de ejemplo para la etapa de JavaScript.
// Las imágenes, precios, talles y colores corresponden a los HTML existentes.
const productos = [
    {
        "id": "remera-highway-grooves",
        "nombre": "Remera Highway Grooves",
        "descripcion": "Una remera de la colección RetroWave para llevar la música a todos lados.",
        "categoria": "remeras",
        "genero": "rock",
        "artista": "RetroWave Rock",
        "precio": 28900,
        "imagen": "imagenes/remera-grafica-vintage.jpeg",
        "alt": "Remera de una banda con estampado en celeste y amarillo",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Negro",
            "Crudo"
        ],
        "disponible": true,
        "nuevo": true,
        "orden": 0
    },
    {
        "id": "remera-spin-forever",
        "nombre": "Remera Spin Forever",
        "descripcion": "Una remera de la colección RetroWave para llevar la música a todos lados.",
        "categoria": "remeras",
        "genero": "pop",
        "artista": "RetroWave Pop",
        "precio": 31500,
        "imagen": "imagenes/mujer-remera-grafica.jpeg",
        "alt": "Mujer con una remera negra estampada junto a una pared de casetes",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Crudo",
            "Coral"
        ],
        "disponible": true,
        "nuevo": true,
        "orden": 1
    },
    {
        "id": "remera-music-heals",
        "nombre": "Remera Music Heals",
        "descripcion": "Una remera de la colección RetroWave para llevar la música a todos lados.",
        "categoria": "remeras",
        "genero": "clasicos",
        "artista": "RetroWave Clásicos",
        "precio": 34900,
        "imagen": "imagenes/remeras-blancas-perchas.jpeg",
        "alt": "Remeras blancas en perchas de madera",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Negro",
            "Menta"
        ],
        "disponible": true,
        "nuevo": false,
        "orden": 2
    },
    {
        "id": "remera-stay-wild",
        "nombre": "Remera Stay Wild",
        "descripcion": "Una remera de la colección RetroWave para llevar la música a todos lados.",
        "categoria": "remeras",
        "genero": "alternativo",
        "artista": "RetroWave Alternativo",
        "precio": 28900,
        "imagen": "imagenes/mujer-remera-grafica.jpeg",
        "alt": "Mujer con una remera negra estampada junto a una pared de casetes",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Coral",
            "Crudo"
        ],
        "disponible": true,
        "nuevo": true,
        "orden": 3
    },
    {
        "id": "remera-good-music-only",
        "nombre": "Remera Good Music Only",
        "descripcion": "Una remera de la colección RetroWave para llevar la música a todos lados.",
        "categoria": "remeras",
        "genero": "pop",
        "artista": "RetroWave Pop",
        "precio": 32900,
        "imagen": "imagenes/remera-blanca-madera.jpeg",
        "alt": "Remera blanca sobre un piso de madera",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Crudo",
            "Negro"
        ],
        "disponible": true,
        "nuevo": false,
        "orden": 4
    },
    {
        "id": "remera-vinyl-forever",
        "nombre": "Remera Vinyl Forever",
        "descripcion": "Una remera de la colección RetroWave para llevar la música a todos lados.",
        "categoria": "remeras",
        "genero": "clasicos",
        "artista": "RetroWave Clásicos",
        "precio": 36500,
        "imagen": "imagenes/remeras-perchero.jpeg",
        "alt": "Remeras estampadas colgadas en un perchero",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Negro",
            "Menta"
        ],
        "disponible": true,
        "nuevo": true,
        "orden": 5
    },
    {
        "id": "remera-midnight-radio",
        "nombre": "Remera Midnight Radio",
        "descripcion": "Una remera de la colección RetroWave para llevar la música a todos lados.",
        "categoria": "remeras",
        "genero": "alternativo",
        "artista": "RetroWave Alternativo",
        "precio": 38900,
        "imagen": "imagenes/remera-midnight-radio.jpeg",
        "alt": "Persona con una remera estampada oscura",
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
        "nombre": "Remera Electric Soul",
        "descripcion": "Una remera de la colección RetroWave para llevar la música a todos lados.",
        "categoria": "remeras",
        "genero": "rock",
        "artista": "RetroWave Rock",
        "precio": 29900,
        "imagen": "imagenes/remeras-colores-plegadas.jpeg",
        "alt": "Remeras de distintos colores plegadas",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Coral",
            "Mostaza"
        ],
        "disponible": true,
        "nuevo": false,
        "orden": 7
    },
    {
        "id": "remera-loud-free",
        "nombre": "Remera Loud & Free",
        "descripcion": "Una remera de la colección RetroWave para llevar la música a todos lados.",
        "categoria": "remeras",
        "genero": "rock",
        "artista": "RetroWave Rock",
        "precio": 41900,
        "imagen": "imagenes/remera-grafica-vintage.jpeg",
        "alt": "Remera de una banda con estampado en celeste y amarillo",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Negro",
            "Crudo"
        ],
        "disponible": true,
        "nuevo": false,
        "orden": 8
    },
    {
        "id": "remera-backstage-club",
        "nombre": "Remera Backstage Club",
        "descripcion": "Una remera de la colección RetroWave para llevar la música a todos lados.",
        "categoria": "remeras",
        "genero": "pop",
        "artista": "RetroWave Pop",
        "precio": 33500,
        "imagen": "imagenes/remera-blanca-fondo-neutro.jpeg",
        "alt": "Remera blanca sobre un fondo neutro",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Crudo",
            "Menta"
        ],
        "disponible": true,
        "nuevo": true,
        "orden": 9
    },
    {
        "id": "remera-analog-heart",
        "nombre": "Remera Analog Heart",
        "descripcion": "Una remera de la colección RetroWave para llevar la música a todos lados.",
        "categoria": "remeras",
        "genero": "indie",
        "artista": "RetroWave Indie",
        "precio": 35900,
        "imagen": "imagenes/camara-remera-silla.jpeg",
        "alt": "Remera y cámara analógica sobre una silla",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Coral",
            "Negro"
        ],
        "disponible": true,
        "nuevo": false,
        "orden": 10
    },
    {
        "id": "remera-sunday-records",
        "nombre": "Remera Sunday Records",
        "descripcion": "Una remera de la colección RetroWave para llevar la música a todos lados.",
        "categoria": "remeras",
        "genero": "indie",
        "artista": "RetroWave Indie",
        "precio": 30500,
        "imagen": "imagenes/remeras-perchero.jpeg",
        "alt": "Remeras estampadas colgadas en un perchero",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Crudo",
            "Mostaza"
        ],
        "disponible": true,
        "nuevo": false,
        "orden": 11
    },
    {
        "id": "buzo-music-heals",
        "nombre": "Buzo Music Heals",
        "descripcion": "Una prenda de abrigo para acompañar tus canciones favoritas.",
        "categoria": "buzos",
        "genero": "clasicos",
        "artista": "RetroWave Clásicos",
        "precio": 58900,
        "imagen": "imagenes/buzos-colores.png",
        "alt": "Buzos de distintos colores",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Negro",
            "Crudo"
        ],
        "disponible": true,
        "nuevo": true,
        "orden": 12
    },
    {
        "id": "buzo-backstage-club",
        "nombre": "Buzo Backstage Club",
        "descripcion": "Una prenda de abrigo para acompañar tus canciones favoritas.",
        "categoria": "buzos",
        "genero": "pop",
        "artista": "RetroWave Pop",
        "precio": 62400,
        "imagen": "imagenes/buzos-pastel-perchero.jpeg",
        "alt": "Buzos de colores claros en un perchero",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Crudo",
            "Menta"
        ],
        "disponible": true,
        "nuevo": true,
        "orden": 13
    },
    {
        "id": "buzo-analog-dreams",
        "nombre": "Buzo Analog Dreams",
        "descripcion": "Una prenda de abrigo para acompañar tus canciones favoritas.",
        "categoria": "buzos",
        "genero": "indie",
        "artista": "RetroWave Indie",
        "precio": 56300,
        "imagen": "imagenes/tejidos-marrones.jpeg",
        "alt": "Prendas tejidas marrones apiladas",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Marrón",
            "Crudo"
        ],
        "disponible": true,
        "nuevo": false,
        "orden": 14
    },
    {
        "id": "buzo-loud-free",
        "nombre": "Buzo Loud & Free",
        "descripcion": "Una prenda de abrigo para acompañar tus canciones favoritas.",
        "categoria": "buzos",
        "genero": "rock",
        "artista": "RetroWave Rock",
        "precio": 64800,
        "imagen": "imagenes/buzo-naranja.png",
        "alt": "Persona con un buzo naranja",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Naranja",
            "Negro"
        ],
        "disponible": true,
        "nuevo": true,
        "orden": 15
    },
    {
        "id": "buzo-midnight-radio",
        "nombre": "Buzo Midnight Radio",
        "descripcion": "Una prenda de abrigo para acompañar tus canciones favoritas.",
        "categoria": "buzos",
        "genero": "alternativo",
        "artista": "RetroWave Alternativo",
        "precio": 59900,
        "imagen": "imagenes/prendas-abrigo.jpeg",
        "alt": "Prendas de abrigo acomodadas sobre una superficie",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Negro",
            "Crudo"
        ],
        "disponible": true,
        "nuevo": false,
        "orden": 16
    },
    {
        "id": "buzo-good-music-only",
        "nombre": "Buzo Good Music Only",
        "descripcion": "Una prenda de abrigo para acompañar tus canciones favoritas.",
        "categoria": "buzos",
        "genero": "pop",
        "artista": "RetroWave Pop",
        "precio": 57100,
        "imagen": "imagenes/buzo-beige.jpeg",
        "alt": "Buzo beige sobre fondo amarillo",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Beige",
            "Negro"
        ],
        "disponible": true,
        "nuevo": false,
        "orden": 17
    },
    {
        "id": "buzo-vinyl-society",
        "nombre": "Buzo Vinyl Society",
        "descripcion": "Una prenda de abrigo para acompañar tus canciones favoritas.",
        "categoria": "buzos",
        "genero": "clasicos",
        "artista": "RetroWave Clásicos",
        "precio": 61500,
        "imagen": "imagenes/buzo-escuchando-vinilos.jpeg",
        "alt": "Joven con un buzo mirando discos de vinilo",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Negro",
            "Menta"
        ],
        "disponible": true,
        "nuevo": true,
        "orden": 18
    },
    {
        "id": "buzo-electric-soul",
        "nombre": "Buzo Electric Soul",
        "descripcion": "Una prenda de abrigo para acompañar tus canciones favoritas.",
        "categoria": "buzos",
        "genero": "rock",
        "artista": "RetroWave Rock",
        "precio": 63900,
        "imagen": "imagenes/buzo-franjas-colores.jpeg",
        "alt": "Buzo plegado con franjas de colores",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Menta",
            "Coral"
        ],
        "disponible": true,
        "nuevo": false,
        "orden": 19
    },
    {
        "id": "buzo-tour-memories",
        "nombre": "Buzo Tour Memories",
        "descripcion": "Una prenda de abrigo para acompañar tus canciones favoritas.",
        "categoria": "buzos",
        "genero": "rock",
        "artista": "RetroWave Rock",
        "precio": 58200,
        "imagen": "imagenes/buzo-amplio.jpeg",
        "alt": "Mujer con un buzo amplio",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Crudo",
            "Negro"
        ],
        "disponible": true,
        "nuevo": false,
        "orden": 20
    },
    {
        "id": "buzo-sunday-records",
        "nombre": "Buzo Sunday Records",
        "descripcion": "Una prenda de abrigo para acompañar tus canciones favoritas.",
        "categoria": "buzos",
        "genero": "indie",
        "artista": "RetroWave Indie",
        "precio": 54400,
        "imagen": "imagenes/buzo-lectura.jpeg",
        "alt": "Mujer con un buzo leyendo un libro",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Crudo",
            "Menta"
        ],
        "disponible": true,
        "nuevo": false,
        "orden": 21
    },
    {
        "id": "buzo-stereo-hearts",
        "nombre": "Buzo Stereo Hearts",
        "descripcion": "Una prenda de abrigo para acompañar tus canciones favoritas.",
        "categoria": "buzos",
        "genero": "pop",
        "artista": "RetroWave Pop",
        "precio": 60600,
        "imagen": "imagenes/buzo-gris-madera.jpeg",
        "alt": "Persona con un buzo gris frente a una pared de madera",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Gris",
            "Negro"
        ],
        "disponible": true,
        "nuevo": true,
        "orden": 22
    },
    {
        "id": "buzo-after-hours",
        "nombre": "Buzo After Hours",
        "descripcion": "Una prenda de abrigo para acompañar tus canciones favoritas.",
        "categoria": "buzos",
        "genero": "alternativo",
        "artista": "RetroWave Alternativo",
        "precio": 62900,
        "imagen": "imagenes/buzo-auriculares-noche.jpeg",
        "alt": "Mujer con buzo y auriculares en una calle de noche",
        "talles": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colores": [
            "Negro",
            "Coral"
        ],
        "disponible": false,
        "nuevo": false,
        "orden": 23
    },
    {
        "id": "campera-soundtrack",
        "nombre": "Campera Soundtrack",
        "descripcion": "Una campera inspirada en la música y las noches de recital.",
        "categoria": "camperas",
        "genero": "rock",
        "artista": "RetroWave Rock",
        "precio": 65000,
        "imagen": "imagenes/campera-cuero-bordada.jpeg",
        "alt": "Campera de cuero bordada vista desde atrás",
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
        "orden": 24
    },
    {
        "id": "tote-vinyl-forever",
        "nombre": "Tote bag Vinyl Forever",
        "descripcion": "Bolsa de tela para llevar tus discos, libros y objetos de todos los días.",
        "categoria": "accesorios",
        "genero": "clasicos",
        "artista": "RetroWave Clásicos",
        "precio": 18000,
        "imagen": "imagenes/tote-vinyl-forever.jpg",
        "alt": "Bolsa de tela color crudo con un diseño de disco de vinilo y tocadiscos",
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

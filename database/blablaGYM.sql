DROP TABLE IF EXISTS sessions;

DROP TABLE IF EXISTS Mensajes;

DROP TABLE IF EXISTS Conversaciones;

DROP TABLE IF EXISTS ubicaciones;

DROP TABLE IF EXISTS ClasesHabilitadas;

DROP TABLE IF EXISTS Actividades;

DROP TABLE IF EXISTS Solicitudes;

DROP TABLE IF EXISTS Anuncios;

DROP TABLE IF EXISTS Monitores;

DROP TABLE IF EXISTS Gimnasios;

DROP TABLE IF EXISTS usuarios;

CREATE TABLE `usuarios` (
  `id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `contrasena` varchar(250) NOT NULL,
  `email` varchar(200) UNIQUE NOT NULL,
  `ubicacion` VARCHAR(100),
  `full_name` varchar(200) DEFAULT NULL,
  `privilegio` varchar(30) DEFAULT NULL,
  `pictureURL` varchar(100) CHARACTER SET utf16 COLLATE utf16_spanish2_ci DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = 'tabla de usuarios';

CREATE TABLE `ubicaciones` (
  `usuario_id` int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `latitud` varchar(15) DEFAULT NULL,
  `longitud` varchar(15) DEFAULT NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
) ENGINE = InnoDB DEFAULT CHARSET = latin1 COMMENT = 'tabla de localizacion de gimnasios';

CREATE TABLE Actividades (
    actividad_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_clase VARCHAR(100)
);

CREATE TABLE ClasesHabilitadas (
    actividad_id INT,
    usuario_id INT,
    PRIMARY KEY (actividad_id,usuario_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE Anuncios (
    anuncio_id INT PRIMARY KEY AUTO_INCREMENT,
    creador_id INT,
    clase_ofrecida_id INT,
    fecha_hora DATETIME,
    salario_propuesto DECIMAL(10, 2),
    FOREIGN KEY (clase_ofrecida_id) REFERENCES Actividades(actividad_id),
    FOREIGN KEY (creador_id) REFERENCES usuarios(id)
);

CREATE TABLE Solicitudes (
    solicitud_id INT PRIMARY KEY AUTO_INCREMENT,
    anuncio_id INT,
    monitor_id INT,
    FOREIGN KEY (anuncio_id) REFERENCES Anuncios(anuncio_id),
    FOREIGN KEY (monitor_id) REFERENCES usuarios(id)
);

CREATE TABLE Conversaciones (
    conversacion_id INT PRIMARY KEY AUTO_INCREMENT,
    usuario1 INT,
    usuario2 INT,
    FOREIGN KEY (usuario1) REFERENCES usuarios(id),
    FOREIGN KEY (usuario2) REFERENCES usuarios(id)
);
CREATE TABLE Mensajes (
    mensaje_id INT PRIMARY KEY AUTO_INCREMENT,
    conversacion_id INT,
    remitente_id INT,
    contenido TEXT,
    fecha_hora_envio DATETIME,
    FOREIGN KEY (conversacion_id) REFERENCES Conversaciones(conversacion_id),
    FOREIGN KEY (remitente_id) REFERENCES Usuarios(id)
);




INSERT INTO
  `usuarios` (
    `id`,
    `usuario`,
    `contrasena`,
    `email`,
    `full_name`,
    `privilegio`,
    `pictureURL`
  )
VALUES
  (
    1,
    'admin',
    '$2a$10$44RiEqgdwBZhtbd1rN6pfe/CLbTMpc4mGUPDiCgAlle0ISkMuJAC2',
    'admin@email.com',
    'Admin name',
    'admin',
    '87257d98-58f6-4525-94a5-2d8c5dbbb4d1.jpg'
  ),
  (
    2,
    'uno',
    '$2a$10$x1/8kTsVlNtfNDpSmkLs0eXvgkTB5YLPXIn7FvZtXaWEO6YzcOSF2',
    '1@1.es',
    'uno',
    'none',
    NULL
  ),
  (
    3,
    'dos',
    '$2a$10$XpxNWmS5qJUMg11uI4HcAuJdc7IkC1SQNFN5GM5xLiKlMa3uH7QOG',
    '2@2.es',
    'dos',
    'none',
    'abe35bc2-558f-4fde-bd87-780f7511fa8e.jpg'
  ),
  (
    4,
    'tres',
    '$2a$10$pofTnnYsWwWJ3GpLwiygbOMJlNQv22NAUqEv73/L.HFchhyY1B12e',
    'tres@tres.es',
    'nombre del tres',
    'none',
    NULL
  );
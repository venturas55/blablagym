DROP TABLE IF EXISTS sessions;

DROP TABLE IF EXISTS nacionalidades;

DROP TABLE IF EXISTS mensajes;

DROP TABLE IF EXISTS conversaciones;

DROP TABLE IF EXISTS asistencias;

DROP TABLE IF EXISTS aulas;

DROP TABLE IF EXISTS actividades;

DROP TABLE IF EXISTS monitores;

DROP TABLE IF EXISTS gimnasios;

DROP TABLE IF EXISTS usuarios;

CREATE TABLE `nacionalidades` (
  id INT AUTO_INCREMENT PRIMARY KEY,
  codigo_iso VARCHAR(3) NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  prefijo_telefonico VARCHAR(10) NOT NULL
);

CREATE TABLE `usuarios` (
  `id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `contrasena` varchar(250) NOT NULL,
  `email` varchar(200) UNIQUE NOT NULL,
  `telefono` varchar(10) UNIQUE,
  `nif` varchar(10),
  `pais_telefono` INT DEFAULT 164,
  `nombre` varchar(100) DEFAULT NULL,
  `apellidos` varchar(200) DEFAULT NULL,
  `cinturon` ENUM(
    'blanco',
    'blancogris',
    'gris',
    'grisnegro',
    'amarilloblanco',
    'amarillo',
    'amarillonegro',
    'naranjablanco',
    'naranja',
    'naranjanegro',
    'verdeblanco',
    'verde',
    'verdenegro',
    'azul',
    'morado',
    'marron',
    'negro'
  ) default 'blanco',
  `grado` ENUM(
    '',
    'I',
    'II',
    'III',
    'IIII'
  ) default NULL,
  `fecha_nacimiento` DATE DEFAULT NULL,
  `peso` decimal(5, 2) DEFAULT 0,
  `nacionalidad` INT default 164,
  `privilegio` varchar(30) DEFAULT NULL,
  `pictureURL` varchar(200) DEFAULT NULL,
  `instructor` boolean NOT NULL DEFAULT 0,
  FOREIGN KEY (nacionalidad) REFERENCES nacionalidades(id),
  FOREIGN KEY (pais_telefono) REFERENCES nacionalidades(id)
) ENGINE = InnoDB DEFAULT CHARSET = latin1 COMMENT = 'tabla de usuarios';

CREATE TABLE actividades (
  `actividad_id` INT PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(250) DEFAULT NULL,
  `pictureURL` varchar(200) DEFAULT NULL
)ENGINE = InnoDB DEFAULT CHARSET = latin1 COMMENT = 'tipos de actividades';

CREATE TABLE clases (
  clase_id INT PRIMARY KEY AUTO_INCREMENT,
  creador_id INT,
  actividad_id INT,
  instructor_id INT,
  duracion INT default 60,
  fecha_hora DATETIME,
  salario_propuesto DECIMAL(10, 2),
  created_at DATETIME DEFAULT current_timestamp,
  FOREIGN KEY (actividad_id) REFERENCES actividades(actividad_id),
  FOREIGN KEY (creador_id) REFERENCES usuarios(id),
  FOREIGN KEY (instructor_id) REFERENCES usuarios(id)
)ENGINE = InnoDB DEFAULT CHARSET = latin1 COMMENT = 'Clases publicadas';

CREATE TABLE semana (
  clase_id INT PRIMARY KEY AUTO_INCREMENT,
  creador_id INT,
  actividad_id INT,
  instructor_id INT,
  duracion INT default 60,
  dia int not NULL,
  hora time not null,
  created_at DATETIME DEFAULT current_timestamp,
  FOREIGN KEY (actividad_id) REFERENCES actividades(actividad_id),
  FOREIGN KEY (creador_id) REFERENCES usuarios(id),
  FOREIGN KEY (instructor_id) REFERENCES usuarios(id)
)ENGINE = InnoDB DEFAULT CHARSET = latin1 COMMENT = 'Clases de la semana';

CREATE TABLE asistencias (
  asistencia_id INT PRIMARY KEY AUTO_INCREMENT,
  clase_id INT,
  usuario_id INT,
  asistencia boolean default 0,
  UNIQUE KEY `my_uniq_id` (clase_id, usuario_id),
  FOREIGN KEY (clase_id) REFERENCES clases(clase_id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
)ENGINE = InnoDB DEFAULT CHARSET = latin1 COMMENT = 'Asistencias';

CREATE TABLE conversaciones (
  conversacion_id INT PRIMARY KEY AUTO_INCREMENT,
  usuario1 INT,
  usuario2 INT,
  FOREIGN KEY (usuario1) REFERENCES usuarios(id),
  FOREIGN KEY (usuario2) REFERENCES usuarios(id)
)ENGINE = InnoDB DEFAULT CHARSET = latin1 COMMENT = 'conversaciones';

CREATE TABLE mensajes (
  mensaje_id INT PRIMARY KEY AUTO_INCREMENT,
  conversacion_id INT,
  remitente_id INT,
  contenido TEXT,
  fecha_hora_envio DATETIME,
  FOREIGN KEY (conversacion_id) REFERENCES Conversaciones(conversacion_id),
  FOREIGN KEY (remitente_id) REFERENCES Usuarios(id)
)ENGINE = InnoDB DEFAULT CHARSET = latin1 COMMENT = 'mensajes';

CREATE TABLE historico (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_valorador INT,
  usuario_valorado INT,
  puntuacion INT,
  comentario TEXT,
  fecha_valoracion DATE,
  FOREIGN KEY (usuario_valorador) REFERENCES usuarios(id),
    FOREIGN KEY (usuario_valorado) REFERENCES usuarios(id)
)ENGINE = InnoDB DEFAULT CHARSET = latin1 COMMENT = 'historico';

CREATE TABLE datos_bancarios (
    id INT AUTO_INCREMENT PRIMARY KEY,     -- Identificador único
    usuario_id INT NOT NULL,               -- Usuario asociado
    tarjeta_hash VARCHAR(255) NOT NULL,    -- Hash del número de tarjeta (encriptado)
    titular VARCHAR(100) NOT NULL,         -- Nombre del titular de la tarjeta
    fecha_vencimiento DATE NOT NULL,       -- Fecha de vencimiento
    estado ENUM('activa', 'inactiva') DEFAULT 'activa',
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) 
)ENGINE = InnoDB DEFAULT CHARSET = latin1 COMMENT = 'datos bancarios';

CREATE TABLE pagos (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- Identificador único
    cliente_id INT NOT NULL, -- Identificador usuario
    monto DECIMAL(10, 2) NOT NULL,      -- Monto del pago
    fecha_pago DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha y hora del pago
    metodo_pago ENUM('tarjeta', 'transferencia', 'efectivo') NOT NULL, -- Método de pago
    estado ENUM('completado', 'pendiente', 'fallido') DEFAULT 'completado', -- Estado del pago
    FOREIGN KEY (cliente_id) REFERENCES usuarios(id) 
  )ENGINE = InnoDB DEFAULT CHARSET = latin1 COMMENT = 'pagos';

INSERT INTO actividades (nombre,descripcion) VALUES ('BJJ', 'JiuJitsu Brasileño con kimono'),('NoGi','JiujitsuBrasileño SIN kimono'),('MMA','Artes marciales mixtas. Obligatorio uso de protecciones');
INSERT INTO
  `usuarios` (
    `id`,
    `usuario`,
    `contrasena`,
    `email`,
    `nombre`,
    `apellidos`,
    `telefono`,
    `privilegio`,
    `pictureURL`,
    `instructor`
  )
VALUES
  (
    1,
    'admin',
    '$2a$10$44RiEqgdwBZhtbd1rN6pfe/CLbTMpc4mGUPDiCgAlle0ISkMuJAC2',
    'admin@email.com',
    'Admin',
    'Admin apellido',
    '666999333',
    'admin',
    '87257d98-58f6-4525-94a5-2d8c5dbbb4d1.jpg',1
  ),
  (
    2,
    'uno',
    '$2a$10$x1/8kTsVlNtfNDpSmkLs0eXvgkTB5YLPXIn7FvZtXaWEO6YzcOSF2',
    '1@1.es',
    'uno',
    'uno apellido',
    '111222333',
    'none',
    NULL,
    0
  ),
  (
    3,
    'dos',
    '$2a$10$XpxNWmS5qJUMg11uI4HcAuJdc7IkC1SQNFN5GM5xLiKlMa3uH7QOG',
    '2@2.es',
    'dos',
      'dos apellido',
    '222555222',
    'none',
    'abe35bc2-558f-4fde-bd87-780f7511fa8e.jpg',
    0
  ),
  (
    4,
    'tres',
    '$2a$10$pofTnnYsWwWJ3GpLwiygbOMJlNQv22NAUqEv73/L.HFchhyY1B12e',
    'tres@tres.es',
    'nombre del tres',
      'tres apellido',
    '333555333',
    'none',
    NULL,
    0
  ),(
    5,
    'Mariouno',
    '$2a$10$x1/8kTsVlNtfNDpSmkLs0eXvgkTB5YLPXIn7FvZtXaWEO6YzcOSF2',
    '1@11.es',
    'Mario',
    'Mario apellido',
    '111252333',
    'none',
    NULL,
    1
  ),
  (
    6,
    'Yuridos',
    '$2a$10$XpxNWmS5qJUMg11uI4HcAuJdc7IkC1SQNFN5GM5xLiKlMa3uH7QOG',
    '22@22.es',
    'Yuri',
      'Yuri apellido',
    '232555222',
    'none',
    'abe35bc2-558f-4fde-bd87-780f7511fa8e.jpg',
    1
  ),
  (
    7,
    'Taniatres',
    '$2a$10$pofTnnYsWwWJ3GpLwiygbOMJlNQv22NAUqEv73/L.HFchhyY1B12e',
    'tres@tre3s.es',
    'Tania',
      'Tania apellido',
    '333555373',
    'none',
    NULL,
    1
  );


  
INSERT INTO
  nacionalidades (codigo_iso, nombre, prefijo_telefonico)
VALUES
  ('AF', 'Afganistán', '+93'),
  ('AL', 'Albania', '+355'),
  ('DZ', 'Argelia', '+213'),
  ('AS', 'Samoa Americana', '+1-684'),
  ('AD', 'Andorra', '+376'),
  ('AO', 'Angola', '+244'),
  ('AI', 'Anguila', '+1-264'),
  ('AQ', 'Antártida', '+672'),
  ('AG', 'Antigua y Barbuda', '+1-268'),
  ('AR', 'Argentina', '+54'),
  ('AM', 'Armenia', '+374'),
  ('AW', 'Aruba', '+297'),
  ('AU', 'Australia', '+61'),
  ('AT', 'Austria', '+43'),
  ('AZ', 'Azerbaiyán', '+994'),
  ('BS', 'Bahamas', '+1-242'),
  ('BH', 'Baréin', '+973'),
  ('BD', 'Bangladés', '+880'),
  ('BB', 'Barbados', '+1-246'),
  ('BY', 'Bielorrusia', '+375'),
  ('BE', 'Bélgica', '+32'),
  ('BZ', 'Belice', '+501'),
  ('BJ', 'Benín', '+229'),
  ('BM', 'Bermudas', '+1-441'),
  ('BT', 'Bután', '+975'),
  ('BO', 'Bolivia', '+591'),
  ('BQ', 'Bonaire, San Eustaquio y Saba', '+599'),
  ('BA', 'Bosnia y Herzegovina', '+387'),
  ('BW', 'Botsuana', '+267'),
  ('BR', 'Brasil', '+55'),
  ('BN', 'Brunéi', '+673'),
  ('BG', 'Bulgaria', '+359'),
  ('BF', 'Burkina Faso', '+226'),
  ('BI', 'Burundi', '+257'),
  ('KH', 'Camboya', '+855'),
  ('CM', 'Camerún', '+237'),
  ('CA', 'Canadá', '+1'),
  ('CV', 'Cabo Verde', '+238'),
  ('CF', 'República Centroafricana', '+236'),
  ('TD', 'Chad', '+235'),
  ('CL', 'Chile', '+56'),
  ('CN', 'China', '+86'),
  ('CO', 'Colombia', '+57'),
  ('KM', 'Comoras', '+269'),
  ('CG', 'Congo', '+242'),
  ('CD', 'Congo (Rep. Dem.)', '+243'),
  ('CR', 'Costa Rica', '+506'),
  ('HR', 'Croacia', '+385'),
  ('CU', 'Cuba', '+53'),
  ('CW', 'Curazao', '+599'),
  ('CY', 'Chipre', '+357'),
  ('CZ', 'Chequia', '+420'),
  ('DK', 'Dinamarca', '+45'),
  ('DJ', 'Yibuti', '+253'),
  ('DM', 'Dominica', '+1-767'),
  ('DO', 'República Dominicana', '+1-809'),
  ('EC', 'Ecuador', '+593'),
  ('EG', 'Egipto', '+20'),
  ('SV', 'El Salvador', '+503'),
  ('GQ', 'Guinea Ecuatorial', '+240'),
  ('ER', 'Eritrea', '+291'),
  ('EE', 'Estonia', '+372'),
  ('ET', 'Etiopía', '+251'),
  ('FJ', 'Fiyi', '+679'),
  ('FI', 'Finlandia', '+358'),
  ('FR', 'Francia', '+33'),
  ('GA', 'Gabón', '+241'),
  ('GM', 'Gambia', '+220'),
  ('GE', 'Georgia', '+995'),
  ('DE', 'Alemania', '+49'),
  ('GH', 'Ghana', '+233'),
  ('GR', 'Grecia', '+30'),
  ('GD', 'Granada', '+1-473'),
  ('GT', 'Guatemala', '+502'),
  ('GN', 'Guinea', '+224'),
  ('GW', 'Guinea-Bisáu', '+245'),
  ('GY', 'Guyana', '+592'),
  ('HT', 'Haití', '+509'),
  ('HN', 'Honduras', '+504'),
  ('HU', 'Hungría', '+36'),
  ('IS', 'Islandia', '+354'),
  ('IN', 'India', '+91'),
  ('ID', 'Indonesia', '+62'),
  ('IR', 'Irán', '+98'),
  ('IQ', 'Irak', '+964'),
  ('IE', 'Irlanda', '+353'),
  ('IL', 'Israel', '+972'),
  ('IT', 'Italia', '+39'),
  ('JM', 'Jamaica', '+1-876'),
  ('JP', 'Japón', '+81'),
  ('JO', 'Jordania', '+962'),
  ('KZ', 'Kazajistán', '+7'),
  ('KE', 'Kenia', '+254'),
  ('KI', 'Kiribati', '+686'),
  ('KP', 'Corea del Norte', '+850'),
  ('KR', 'Corea del Sur', '+82'),
  ('KW', 'Kuwait', '+965'),
  ('KG', 'Kirguistán', '+996'),
  ('LA', 'Laos', '+856'),
  ('LV', 'Letonia', '+371'),
  ('LB', 'Líbano', '+961'),
  ('LS', 'Lesoto', '+266'),
  ('LR', 'Liberia', '+231'),
  ('LY', 'Libia', '+218'),
  ('LI', 'Liechtenstein', '+423'),
  ('LT', 'Lituania', '+370'),
  ('LU', 'Luxemburgo', '+352'),
  ('MG', 'Madagascar', '+261'),
  ('MW', 'Malaui', '+265'),
  ('MY', 'Malasia', '+60'),
  ('MV', 'Maldivas', '+960'),
  ('ML', 'Malí', '+223'),
  ('MT', 'Malta', '+356'),
  ('MH', 'Islas Marshall', '+692'),
  ('MR', 'Mauritania', '+222'),
  ('MU', 'Mauricio', '+230'),
  ('MX', 'México', '+52'),
  ('FM', 'Micronesia', '+691'),
  ('MD', 'Moldavia', '+373'),
  ('MC', 'Mónaco', '+377'),
  ('MN', 'Mongolia', '+976'),
  ('ME', 'Montenegro', '+382'),
  ('MA', 'Marruecos', '+212'),
  ('MZ', 'Mozambique', '+258'),
  ('MM', 'Birmania', '+95'),
  ('NA', 'Namibia', '+264'),
  ('NR', 'Nauru', '+674'),
  ('NP', 'Nepal', '+977'),
  ('NL', 'Países Bajos', '+31'),
  ('NZ', 'Nueva Zelanda', '+64'),
  ('NI', 'Nicaragua', '+505'),
  ('NE', 'Níger', '+227'),
  ('NG', 'Nigeria', '+234'),
  ('NO', 'Noruega', '+47'),
  ('OM', 'Omán', '+968'),
  ('PK', 'Pakistán', '+92'),
  ('PW', 'Palaos', '+680'),
  ('PS', 'Palestina', '+970'),
  ('PA', 'Panamá', '+507'),
  ('PG', 'Papúa Nueva Guinea', '+675'),
  ('PY', 'Paraguay', '+595'),
  ('PE', 'Perú', '+51'),
  ('PH', 'Filipinas', '+63'),
  ('PL', 'Polonia', '+48'),
  ('PT', 'Portugal', '+351'),
  ('QA', 'Catar', '+974'),
  ('RO', 'Rumanía', '+40'),
  ('RU', 'Rusia', '+7'),
  ('RW', 'Ruanda', '+250'),
  ('WS', 'Samoa', '+685'),
  ('SM', 'San Marino', '+378'),
  ('SA', 'Arabia Saudita', '+966'),
  ('SN', 'Senegal', '+221'),
  ('RS', 'Serbia', '+381'),
  ('SC', 'Seychelles', '+248'),
  ('SL', 'Sierra Leona', '+232'),
  ('SG', 'Singapur', '+65'),
  ('SK', 'Eslovaquia', '+421'),
  ('SI', 'Eslovenia', '+386'),
  ('SB', 'Islas Salomón', '+677'),
  ('SO', 'Somalia', '+252'),
  ('ZA', 'Sudáfrica', '+27'),
  ('SS', 'Sudán del Sur', '+211'),
  ('ES', 'España', '+34'),
  ('LK', 'Sri Lanka', '+94'),
  ('SD', 'Sudán', '+249'),
  ('SR', 'Surinam', '+597'),
  ('SE', 'Suecia', '+46'),
  ('CH', 'Suiza', '+41'),
  ('SY', 'Siria', '+963'),
  ('TW', 'Taiwán', '+886'),
  ('TJ', 'Tayikistán', '+992'),
  ('TZ', 'Tanzania', '+255'),
  ('TH', 'Tailandia', '+66'),
  ('TL', 'Timor Oriental', '+670'),
  ('TG', 'Togo', '+228'),
  ('TO', 'Tonga', '+676'),
  ('TT', 'Trinidad y Tobago', '+1-868'),
  ('TN', 'Túnez', '+216'),
  ('TR', 'Turquía', '+90'),
  ('TM', 'Turkmenistán', '+993'),
  ('TV', 'Tuvalu', '+688'),
  ('UG', 'Uganda', '+256'),
  ('UA', 'Ucrania', '+380'),
  ('AE', 'Emiratos Árabes Unidos', '+971'),
  ('GB', 'Reino Unido', '+44'),
  ('US', 'Estados Unidos', '+1'),
  ('UY', 'Uruguay', '+598'),
  ('UZ', 'Uzbekistán', '+998'),
  ('VU', 'Vanuatu', '+678'),
  ('VE', 'Venezuela', '+58'),
  ('VN', 'Vietnam', '+84'),
  ('EH', 'Sahara Occidental', '+212'),
  ('YE', 'Yemen', '+967'),
  ('ZM', 'Zambia', '+260'),
  ('ZW', 'Zimbabue', '+263');
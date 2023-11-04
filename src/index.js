import express, { urlencoded, json } from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars'; //Para usar plantillas
import * as url from 'url';
import * as path from 'path';    //Para manejar directorios, basicamente unirlos 
import flash from 'connect-flash';  //Para mostar mensajes
import session from 'express-session'; //Lo necesita el flash tb
import MySQLstore from 'express-mysql-session'; // para poder guardar la sesion en la sql
import passport from 'passport';
import { database } from './config.js';
import handlebars from './lib/handlebars.js';

//const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

import { indexRouter } from './routes/index.js';
import { actividadesRouter } from './routes/actividades.js';
import { anunciosRouter } from './routes/anuncios.js';
import { apiRouter } from './routes/api.js';
import { authRouter } from './routes/authentication.js';
import { fotosRouter } from './routes/fotos.js';


//Initialization
const app = express();
//import './lib/passport.js'; //para que se entere de la autentificacion que se ha creado 

//Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({  //con esto se configura el app.engine
    defaultLayout: 'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: handlebars
}));
app.set('view engine', '.hbs'); //Para utilizar el app.engine


//Middleware
app.use(session({
    secret: 'mysesion',
    resave: false,
    saveUninitialized: false,
    store: new MySQLstore(database)
}))
app.use(flash());       // Para poder usar el middleware de enviar mensajes popups
app.use(morgan('dev'));
app.use(urlencoded({ extended: false })); //aceptar los datos desde los formularios sin aceptar imagenes ni nada raro
app.use(json()); //Para enviar y recibir jsons.
app.use(passport.initialize()); //iniciar passport
app.use(passport.session());    //para que sepa donde guardar y como manejar los datos

//Variables globales

app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

//Public
app.use(express.static(__dirname + '/public'));

//Routes
app.use(indexRouter);
app.use('/actividades', actividadesRouter);
app.use('/anuncios', anunciosRouter);
app.use(authRouter);
app.use(apiRouter);
app.use(fotosRouter);

//Starting
app.listen(app.get('port'), () => {
    console.log("Running on http://localhost:4000", app.get('port'));
})
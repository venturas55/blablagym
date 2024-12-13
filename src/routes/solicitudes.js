import funciones from "../lib/funciones.js";
import db from "../database.js"; //db hace referencia a la BBDD
import { Router } from 'express';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
import { AsistenciaController } from '../controllers/asistencias.js'


export const solicitudesRouter = Router();

//GESTION DEL CRUD

//READ
solicitudesRouter.get("/list", AsistenciaController.getAll);
solicitudesRouter.get("/list/:id", AsistenciaController.getById);

//CREATE
solicitudesRouter.post("/add/:anuncio_id", funciones.isAuthenticated, AsistenciaController.create);

//DELETE
solicitudesRouter.post("/delete/:id", funciones.isAuthenticated, AsistenciaController.delete);


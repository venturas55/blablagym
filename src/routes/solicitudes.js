import funciones from "../lib/funciones.js";
import db from "../database.js"; //db hace referencia a la BBDD
import { v4 as uuidv4 } from "uuid";
import { Router } from 'express';
import multer from "multer";
import * as url from 'url';
import * as path from 'path';
import fs from 'fs-extra';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
import { SolicitudController } from '../controllers/solicitudes.js'


export const solicitudesRouter = Router();

//GESTION DEL CRUD

//READ
solicitudesRouter.get("/list", SolicitudController.getAll);
solicitudesRouter.get("/list/:id", SolicitudController.getById);

//CREATE
solicitudesRouter.post("/add/:anuncio_id", funciones.isAuthenticated, SolicitudController.create);

//DELETE
solicitudesRouter.post("/delete/:id", funciones.isAuthenticated, SolicitudController.delete);


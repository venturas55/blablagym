import funciones from "../lib/funciones.js";
import db from "../database.js"; //db hace referencia a la BBDD
import { AnuncioController } from '../controllers/anuncios.js'
import { Router } from 'express';

export const anunciosRouter = Router();

//GESTION DEL CRUD

//READ
anunciosRouter.get("/list", AnuncioController.getAll);
anunciosRouter.get("/list/:anuncio_id", AnuncioController.getById);
//CREATE
anunciosRouter.get("/add", funciones.isAuthenticated,async  (req, res) => {
  const actividades = await db.query("SELECT * FROM actividades");
  res.render("anuncios/add",{actividades});
});
anunciosRouter.post("/add", funciones.isAuthenticated, AnuncioController.create);
//DELETE
anunciosRouter.get("/delete/:anuncio_id", funciones.isAuthenticated, AnuncioController.delete);
//UPDATE
anunciosRouter.get("/edit/:anuncio_id", funciones.isAuthenticated, async (req, res) => {
  const { anuncio_id } = req.params;
  const actividades = await db.query("SELECT * FROM actividades");
  const [item] = await db.query("SELECT * FROM anuncios WHERE anuncio_id=?", [anuncio_id,]);
  res.render("anuncios/edit", { item ,actividades});
});
anunciosRouter.post("/edit/:anuncio_id", funciones.isAuthenticated,  AnuncioController.update);
import { ActividadModel } from '../models/actividadMysql.js';
import multer from "multer";
import funciones from "../lib/funciones.js";
import { v4 as uuidv4 } from "uuid";
import * as url from 'url';
import * as path from 'path';
import fs from 'fs-extra';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

/* const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { user } = req.body;
        console.log(req);
        if (typeof user === 'undefined') { //es una foto de icono
            const dir = path.join(__dirname, '../public/img/iconos/');

            fs.exists(dir, exist => {
                if (!exist) {
                    return fs.mkdir(dir, error => cb(error, dir));
                }
                return cb(null, dir);
            })
        } else {//si no, entonces es una foto de perfil y va a otra carpeta
            const dir = path.join(__dirname, '../public/img/profiles/');
            console.log("dir" + dir);
            return cb(null, dir);
        }
    },
    filename: (req, file, cb) => {
        cb(null, (uuidv4() + path.extname(file.originalname)).toLowerCase());
    }
});

const uploadFoto = multer({
    storage,
    limits: { fileSize: 5000000, },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|bmp|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        return cb(("Error: Archivo debe ser una imagen valida jpeg,jpg,png,bmp o gif"));
    }
}).single('imagen');
 */
/* import { validateActividad, validatePartialActividad } from '../schemas/actividad.js'; */

export class ActividadController {

    static async getAll(req, res) {
        const { genre } = req.query
        const actividades = await ActividadModel.getAll({ genre });
        res.render("actividades/list", { actividades });

    }
    static async getById(req, res) {
        console.log("por aqui");
        const { id } = req.params;
        const [actividad] = await ActividadModel.getById({ id });
        console.log(actividad);
        res.render("actividades/plantilla", { actividad });
    }

    static async create(req, res) {
        /*       const result = validateMovie(req.body);
      
              if (!result.success) {
                  // 422 Unprocessable Entity
                  return res.status(400).json({ error: JSON.parse(result.error.message) });
              } */
        var pictureURL = "";
        if (typeof req.file !== 'undefined')
            pictureURL = req.file.filename;
        const {
            nombre,
            descripcion,
        } = req.body;
        const item = {
            nombre,
            descripcion,
            pictureURL,

        };
        const result = await ActividadModel.create({ input: item });
        console.log("newActividad: " + JSON.stringify(result));
        // req.flash("success", "Actividad insertado correctamente");
        res.redirect("/actividades/list"); //te redirige una vez insertado el item

    }

    static async delete(req, res) {
        const { id } = req.params
        console.log("deleteActividad: " + JSON.stringify(id));
        const result = await ActividadModel.delete({ input: id })
        if (result === false) {
            return res.status(404).json({ message: 'Actividad not found' })
        }

        //req.flash("success", "Actividad borrado correctamente");
        res.redirect("/actividades/list");
    }

    static async update(req, res) {
       /*  const result = validatePartialMovie(req.body)

        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        } */

        const { id } = req.params;
        try {
          const {
            nombre,
            descripcion,
            pictureURL
          } = req.body;
          if (typeof req.file !== 'undefined'){
            pictureURL = req.file.filename;
          }
          const newItem = {
            actividad_id:id,
            nombre,
            descripcion,
            pictureURL,
          };
          console.log(newItem);
          console.log(req.file);
          const result = await ActividadModel.update({ input: newItem })
          if (result === false) {
              return res.status(404).json({ message: 'Actividad not found' })
          }
              //req.flash("success", "Actividad modificada correctamente");
          res.redirect("/actividades/list");
        } catch (error) {
          console.error(error.code);
          //req.flash("error", "Hubo algun error");
          res.redirect("/error");
        }

    }

}
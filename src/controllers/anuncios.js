import { AnuncioModel } from '../models/anuncioMysql.js';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

/* import { validateActividad, validatePartialActividad } from '../schemas/actividad.js'; */

export class AnuncioController {
    static async getAll(req, res) {
        const { genre } = req.query
        const anuncios = await AnuncioModel.getAll({ genre });
        res.render("anuncios/list", { anuncios });

    }
    static async getById(req, res) {
        const { anuncio_id } = req.params;
        const [anuncio] = await AnuncioModel.getById({ id: anuncio_id });
        console.log(anuncio);
        res.render("anuncios/plantilla", { anuncio });
    }
    static async create(req, res) {
        const {
            anuncio_id,
            creador_id,
            actividad_ofrecida_id,
            duracion,
            salario_propuesto,
            datetimelocal,
        } = req.body;
        const item = {
            anuncio_id,
            creador_id,
            actividad_ofrecida_id,
            duracion,
            fecha_hora: datetimelocal,
            salario_propuesto,
            creador_id: req.user.id

        };
        const result = await AnuncioModel.create({ input: item });
        console.log("newanuncios: " + JSON.stringify(result));
        // req.flash("success", "Actividad insertado correctamente");
        res.redirect("/anuncios/list"); //te redirige una vez insertado el item

    }
    static async delete(req, res) {
        const { anuncio_id } = req.params
        console.log("deleteAnuncio: " + JSON.stringify(anuncio_id));
        const result = await AnuncioModel.delete({ input: anuncio_id })
        if (result === false) {
            return res.status(404).json({ message: 'Anuncio not found' })
        }

        //req.flash("success", "Actividad borrado correctamente");
        res.redirect("/anuncios/list");
    }
    static async update(req, res) {
        /*  const result = validatePartialMovie(req.body)
 
         if (!result.success) {
             return res.status(400).json({ error: JSON.parse(result.error.message) })
         } */

        const { anuncio_id } = req.params;
        const {
            actividad_ofrecida_id,
            duracion,
            fecha,
            hora,
            salario_propuesto,
        } = req.body;
        const item = {
            anuncio_id,
            actividad_ofrecida_id,
            duracion,
            fecha_hora: fecha + " " + hora,
            salario_propuesto,
            creador_id: req.user.id
        };
        console.log(anuncio_id);
        console.log(item);
        const result = await AnuncioModel.update({ input: item })
        if (result === false) {
            return res.status(404).json({ message: 'anuncio not found' })
        }
        //req.flash("success", "Actividad modificada correctamente");
        res.redirect("/anuncios/list");
    } catch(error) {
        console.error(error.code);
        //req.flash("error", "Hubo algun error");
        res.redirect("/error");
    }

}

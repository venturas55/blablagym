import { CalendarioModel } from '../models/calendarioMysql.js';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
import { validateCalendario, validatePartialCalendario } from '../schemas/validaciones.js';


export class CalendarioController {
    static async getAll(req, res) {
        let input="";
        const clases = await CalendarioModel.getAll3m(input);
        res.render("calendario/list", { clases, });
    }


    static async getById(req, res) {
        const { anuncio_id } = req.params
        const [item] = await CalendarioModel.getById({ id: anuncio_id });
        console.log(item);
        res.render("anuncios/plantilla", { item });
    }
    static async create(req, res) {
        const { clase_id } = req.params
        const item = {
            clase_id,
            usuario_id: req.user.id,
        };
        console.log("Va");
        console.log(item);

        //const solicitudes = await CalendarioModel.getAll({ monitor_id: item.monitor_id });


        const a = await CalendarioModel.create({ input: item });
        req.flash("success", "Solicitud realizada correctamente");
        res.redirect("/asistencias/list"); //te redirige una vez insertado el item

    }
    static async delete(req, res) {
        const { asistencia_id } = req.params
        const result = await CalendarioModel.delete({ input: asistencia_id })
        if (result === false) {
            return res.status(404).json({ message: 'Asistencia not found' })
        }
        //req.flash("success", "Actividad borrado correctamente");
        res.redirect("/asistencias/list");
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
            fecha_hora,
            salario_propuesto,
        } = req.body;
        const item = {
            anuncio_id,
            actividad_ofrecida_id,
            duracion,
            fecha_hora,
            salario_propuesto,
            creador_id: req.user.id
        };
        console.log(anuncio_id);
        console.log(item);
        const result = await CalendarioModel.update({ input: item })
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
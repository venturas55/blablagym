import { SolicitudModel } from '../models/solicitudMysql.js';
import { AnuncioModel } from '../models/anuncioMysql.js';
import crypto from 'node:crypto';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
import { validateSolicitud, validatePartialSolicitud } from '../schemas/validaciones.js';


export class SolicitudController {
    static async getAll(req, res) {
        const { creador_id, monitor_id } = req.query;
        console.log(creador_id, monitor_id);
        let items;
        if (creador_id) {
            items = await SolicitudModel.getAll({ creador_id });
            console.log(items);
            res.render("solicitudes/list", { items });
        }
        if (monitor_id) {
            items = await SolicitudModel.getAll({ monitor_id });
            console.log(items);
            res.render("solicitudes/list", { items });
        }
    }


    static async getById(req, res) {
        const { anuncio_id } = req.params
        const [item] = await SolicitudModel.getById({ id: anuncio_id });
        console.log(item);
        res.render("anuncios/plantilla", { item });
    }
    static async create(req, res) {
        const { anuncio_id } = req.params
        const item = {
            anuncio_id,
            monitor_id: req.user.id,
        };
        const [anuncio] = await AnuncioModel.getById({ anuncio_id });
        const solicitudes = await SolicitudModel.getAll({ monitor_id: item.monitor_id });
        console.log("Vienen solicitudes");
        let yaHizosolicitud = solicitudes.some((el) => {
            let a = el.monitor_id + "/" + el.anuncio_id;
            let b = item.monitor_id + "/" + item.anuncio_id;
            /*   console.log(a+ " = " + b); */
            return (a == b);
        })
        if (anuncio.creador_id == item.monitor_id) {
            req.flash("warning", "No puedes aplicar a tu mismo anuncio");
            res.redirect("/anuncios/list"); //te redirige una vez insertado el item
        } else if (yaHizosolicitud) {
            req.flash("warning", "Ya solicitaste para este anuncio");
            res.redirect("/anuncios/list"); //te redirige una vez insertado el item
        } else {
            const a = await SolicitudModel.create({ input: item });
            req.flash("success", "Solicitud realizada correctamente");
            res.redirect("/anuncios/list"); //te redirige una vez insertado el item
        }
    }
    static async delete(req, res) {
        const { anuncio_id } = req.params
        console.log("deleteAnuncio: " + JSON.stringify(anuncio_id));
        const result = await SolicitudModel.delete({ input: anuncio_id })
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
        const result = await SolicitudModel.update({ input: item })
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

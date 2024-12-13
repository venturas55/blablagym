import { WeekModel } from '../models/weekMysql.js';
import { UsuarioModel } from '../models/usuarioMysql.js';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

import { validateClase, validatePartialClase } from '../schemas/validaciones.js';

export class WeekController {

    static async getAll(req, res) {
        const usuarios = await UsuarioModel.getAll();
        const clases = await WeekModel.getAll();
        // Ordenar las clases por fecha
        const clasesOrdenadas = clases.sort((a, b) => (a.dia) - (b.dia));
        // Agrupar las clases por día de la semana (Lunes=1, ..., Domingo=7)
        const clasesPorDia = [[], [], [], [], [], [], []]; // Array para los 7 días
        clasesOrdenadas.forEach((clase) => {
            clasesPorDia[clase.dia - 1].push(clase);
        });
        console.log(clasesOrdenadas);

        // Opcional: Asegurar que cada día también esté ordenado (redundante si ya está ordenado antes del agrupamiento)
        clasesPorDia.forEach((dia) => {
            dia.sort((a, b) => new Date(b.hora) - new Date(a.hora)); // Orden ascendente por hora
        });
        res.render("clases/week", { clases: clasesPorDia, usuarios });
    }

    static async getById(req, res) {
        const { id } = req.params;
        const [clase] = await WeekModel.getById({ id });
        console.log(clase);
        res.render("clases/plantilla", { clase });
    }

    static async createClass(req, res) {
        const result = validateClase(req.body);

        if (!result.success) {
            // 422 Unprocessable Entity
            return res.status(400).json({ error: JSON.parse(result.error.message) });
        }
        const {
            creador_id,
            actividad_id,
            instructor_id,
            duracion,
            dia,
            hora
        } = req.body;

        const item = {
            creador_id,
            actividad_id,
            instructor_id,
            duracion,
            dia,
            hora

        };
        const nuevaACt = await WeekModel.createClass({ input: item });
        req.flash("success", "Clase semanal insertada correctamente");
        res.redirect("/week/list"); //te redirige una vez insertado el item

    }

    static async duplicateWeek(req, res) {
        const result = validateClase(req.body);

        if (!result.success) {
            // 422 Unprocessable Entity
            return res.status(400).json({ error: JSON.parse(result.error.message) });
        }
        const {
            creador_id,
            actividad_id,
            instructor_id,
            duracion,
            fecha_hora
        } = req.body;

        const item = {
            creador_id,
            actividad_id,
            instructor_id,
            duracion,
            fecha_hora,

        };
        const nuevaACt = await WeekModel.create({ input: item });
        req.flash("success", "Clase insertada correctamente");
        res.redirect("/clases/list"); //te redirige una vez insertado el item

    }

    static async cloneWeek(req, res) {
        const result = validateClase(req.body);

        if (!result.success) {
            // 422 Unprocessable Entity
            return res.status(400).json({ error: JSON.parse(result.error.message) });
        }
        const {
            creador_id,
            actividad_id,
            instructor_id,
            duracion,
            fecha_hora
        } = req.body;

        const item = {
            creador_id,
            actividad_id,
            instructor_id,
            duracion,
            fecha_hora,

        };
        const nuevaACt = await WeekModel.create({ input: item });
        req.flash("success", "Clase insertada correctamente");
        res.redirect("/clases/list"); //te redirige una vez insertado el item

    }

    static async delete(req, res) {
        const { id } = req.params
        console.log("deleteclases: " + JSON.stringify(id));
        const result = await WeekModel.delete({ input: id })
        if (result === false) {
            return res.status(404).json({ message: 'clases not found' })
        }

        //req.flash("success", "clases borrado correctamente");
        res.redirect("/clases/list");
    }

    static async update(req, res) {
        const result = validatePartialClase(req.body)

        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const { id } = req.params;
        try {
            const {
                creador_id,
                actividad_id,
                instructor_id,
                duracion,
                fecha_hora
            } = req.body;


            const newItem = {
                clase_id: id,
                creador_id,
                actividad_id,
                instructor_id,
                duracion,
                fecha_hora
            };
            console.log(newItem);
            const result = await WeekModel.update({ input: newItem })
            if (result === false) {
                return res.status(404).json({ message: 'Clase not found' })
            }
            //req.flash("success", "Clase modificada correctamente");
            res.redirect("/clases/list");
        } catch (error) {
            console.error(error.code + " " + error.message);
            //req.flash("error", "Hubo algun error");
            res.redirect("/error");
        }

    }

}
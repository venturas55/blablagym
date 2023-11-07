import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
import db from "../database.js"; //db hace referencia a la BBDD

const ticketAnunciosSolicitudesQuery = "select s.solicitud_id,s.anuncio_id,s.monitor_id, a.creador_id,a.actividad_ofrecida_id, act.pictureURL as pictureURL_actividad, a.duracion, a.fecha_hora,a.salario_propuesto,a.created_at,uc.usuario as usuario_creador,uc.full_name as full_name_creador,uc.pictureURL as pictureURL_creador,uc.email as email_creador,us.usuario as usuario_solicitante,us.full_name as full_name_solicitante,us.email as email_solicitante,us.pictureURL as pictureURL_solicitante from solicitudes s LEFT JOIN anuncios a on s.anuncio_id=a.anuncio_id LEFT JOIN usuarios us on s.monitor_id=us.id LEFT JOIN usuarios uc on a.creador_id=uc.id LEFT JOIN actividades act on a.actividad_ofrecida_id=act.actividad_id";

export const readJSON = (path) => require(path)


export class SolicitudModel {
  static async getAll({ creador_id, monitor_id }) {
    let solicitudes;
    if (monitor_id) {
      solicitudes = await db.query(ticketAnunciosSolicitudesQuery + " where s.monitor_id=?", monitor_id);
    } else {
      solicitudes = await db.query(ticketAnunciosSolicitudesQuery);
    }
    return solicitudes;
  }

  static async getById({ id }) {
    const actividad = await db.query("SELECT * FROM solicitudes where solicitudes_id=?", id);
    return actividad;
  }

  static async create({ input }) {
    try {
      const a = await db.query("INSERT INTO solicitudes set ?", [input]);
      return a;
    } catch (error) {
      console.error(error.code);
      return false;
    }

  }
  static async delete({ input }) {
    try {
      await db.query("DELETE FROM solicitudes WHERE solicitudes_id=?", [input]);
    } catch (error) {
      console.error(error.code);
      return error;
    }
  }

  /*  static async update({ input }) {
     try {
       console.log("UPDATE solicitudes" + input);
       await db.query("UPDATE solicitudes set ? WHERE solicitudes_id = ?", [input, input.solicitudes_id,]);
     } catch (error) {
       console.error(error.code);
       return error;
     }
   } */
}
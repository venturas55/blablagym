import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
import db from "../database.js"; //db hace referencia a la BBDD

const ticketSolicitudesQuery = "select s.solicitud_id,s.anuncio_id,s.monitor_id, a.creador_id,a.actividad_ofrecida_id,a.duracion, a.fecha_hora,a.salario_propuesto,a.created_at,uc.usuario as usuario_creador,uc.full_name as full_name_creador,uc.pictureURL as pictureURL_creador,uc.email as email_creador,us.usuario as usuario_solicitante,us.full_name as full_name_solicitante,us.email as email_solicitante,us.pictureURL as pictureURL_solicitante from solicitudes s LEFT JOIN anuncios a on s.anuncio_id=a.anuncio_id LEFT JOIN usuarios us on s.monitor_id=us.id LEFT JOIN usuarios uc on a.creador_id=uc.id";
const ticketAnunciosQuery = "select  a.creador_id,a.actividad_ofrecida_id,a.duracion, a.fecha_hora,a.salario_propuesto,a.created_at,us.usuario as usuario_solicitante,us.full_name as full_name_solicitante,us.email as email_solicitante,us.pictureURL as pictureURL_solicitante from anuncios a LEFT JOIN usuarios us on a.creador_id=us.id ";

export const readJSON = (path) => require(path)


export class SolicitudModel {
  static async getAll({ creador_id, monitor_id }) {
    let actividades;
    if (creador_id) {
      console.log("Creador id: " + creador_id);
      actividades = await db.query(ticketAnunciosQuery + " where a.creador_id=?", creador_id);
    } else if (monitor_id) {
      console.log("Monitor id: " + monitor_id);
      actividades = await db.query(ticketSolicitudesQuery + " where s.monitor_id=?", monitor_id);
    } else {
      actividades = await db.query(ticketQuery);
    }
    return actividades;
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
      console.log("DELETE FROM solicitudes");
      console.log(input);
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
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
import db from "../database.js"; //db hace referencia a la BBDD
export const readJSON = (path) => require(path)
const sqlClasesQuery = "SELECT s.clase_id,s.creador_id,s.actividad_id,s.instructor_id,s.duracion,s.dia,s.hora,s.created_at,ui.nombre as nombre_instructor,ui.apellidos as apellidos_instructor,ui.email as email_instructor,ui.telefono as telefono_instructor,ui.pictureURL as pictureURL_instructor,uc.nombre as nombre_creador,uc.apellidos as apellidos_creador,uc.email as email_creador,uc.telefono as telefono_creador,uc.pictureURL as pictureURL_creador,a.nombre as nombre_actividad, a.descripcion as descripcion_actividad, a.pictureURL as pictureURL_actividad FROM semana s LEFT JOIN usuarios ui ON s.instructor_id = ui.id LEFT JOIN usuarios uc ON s.creador_id=uc.id LEFT JOIN actividades a ON s.actividad_id=a.actividad_id"


export class WeekModel {
  static async getAll() {
    const clases = await db.query(sqlClasesQuery);
    return clases;
  }

  static async getById({ id }) {
    const clase = await db.query(sqlClasesQuery +" where s.clase_id=?", id);
    return clase;
  }


  static async createClass({ input }) {
    try {
      console.log(input);
      const a = await db.query("INSERT INTO semana set ?", [input]);
      return a;
    } catch (error) {
      console.error(error.code);
      return false;
    }

  }
  static async delete({ input }) {
    try {
      await db.query("DELETE FROM semana WHERE clase_id=?", [input]);
    } catch (error) {
      console.error(error.code);
      return error;
    }
  }

  static async update({ input }) {
    try {
      await db.query("UPDATE clases set ? WHERE clase_id = ?", [input, input.clase_id,]);
    } catch (error) {
      console.error(error.code);
      return error;
    }
  }
}
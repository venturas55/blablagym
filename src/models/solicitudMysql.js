import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
import db from "../database.js"; //db hace referencia a la BBDD

export const readJSON = (path) => require(path)


export class SolicitudModel {
  static async getAll({ genre }) {
    const actividades = await db.query('SELECT * from solicitudes');
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
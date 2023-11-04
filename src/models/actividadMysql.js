import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
import db from "../database.js"; //db hace referencia a la BBDD

export const readJSON = (path) => require(path)


export class ActividadModel {
  static async getAll({ genre }) {
    const actividades = await db.query('SELECT * from actividades');
    return actividades;
  }

  static async getById({ id }) {
    const actividad = await db.query("SELECT * FROM actividades where actividad_id=?", id);
    return actividad;
  }

  static async create({ input }) {
    try {
      const a = await db.query("INSERT INTO actividades set ?", [input]);
      console.log("A:" + a);
      return a;
    } catch (error) {
      console.error(error.code);
      return false;
    }

  }
  static async delete({ input }) {
    try {
      console.log("DELETE FROM actividades");
      console.log(input);
      await db.query("DELETE FROM actividades WHERE actividad_id=?", [input]);
    } catch (error) {
      console.error(error.code);
      return error;
    }
  }

  static async update({ input }) {
    try {
      console.log("UPDATE actividades" + input);
      await db.query("UPDATE actividades set ? WHERE actividad_id = ?", [input, input.actividad_id,]);
    } catch (error) {
      console.error(error.code);
      return error;
    }
  }
}
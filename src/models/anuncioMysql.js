import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
import db from "../database.js"; //db hace referencia a la BBDD
const sqlAnuncios = "select a.anuncio_id,a.creador_id,a.actividad_ofrecida_id,a.duracion,a.fecha_hora,a.salario_propuesto,a.created_at,u.usuario,u.contrasena,u.email,u.ubicacion,u.full_name,u.privilegio,u.pictureURL as pictureURLusuario,act.nombre,act.descripcion,act.pictureURL as pictureURLactividad from anuncios a left join usuarios u on a.creador_id=u.id LEFT JOIN Actividades act on a.actividad_ofrecida_id=act.actividad_id";

export const readJSON = (path) => require(path)


export class AnuncioModel {
  static async getAll({ genre }) {
    const anuncios = await db.query(sqlAnuncios + " order by a.fecha_hora",);
    return anuncios;
  }

  static async getById({ id }) {
    const anuncio = await db.query(sqlAnuncios + " where a.anuncio_id=?", [id]);
    return anuncio;
  }

  static async create({ input }) {
    try {
      const a = await db.query("INSERT INTO anuncios set ?", [input]);
      return a;
    } catch (error) {
      console.error(error.code);
      return false;
    }

  }
  static async delete({ input }) {
    try {
      console.log(input);
      await db.query("DELETE FROM anuncios WHERE anuncio_id=?", [input]);
    } catch (error) {
      console.error(error.code);
      return error;
    }
  }

  static async update({ input }) {
    try {
      await db.query("UPDATE anuncios set ? WHERE anuncio_id = ?", [input, input.anuncio_id,]);
    } catch (error) {
      console.error(error.code);
      return error;
    }
  }
}
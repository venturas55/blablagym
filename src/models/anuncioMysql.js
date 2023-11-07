import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
import db from "../database.js"; //db hace referencia a la BBDD
const sqlAnuncios ="select a.anuncio_id,a.creador_id,a.actividad_ofrecida_id,a.duracion,a.fecha_hora,a.salario_propuesto,a.created_at,u.usuario,u.contrasena,u.email,u.ubicacion,u.full_name,u.privilegio,u.pictureURL as pictureURLusuario,act.nombre,act.descripcion,act.pictureURL as pictureURLactividad,COUNT(s.solicitud_id) AS numero_de_solicitudes from anuncios a LEFT JOIN usuarios u on a.creador_id=u.id LEFT JOIN Actividades act on a.actividad_ofrecida_id=act.actividad_id LEFT JOIN Solicitudes s ON a.anuncio_id = s.anuncio_id group by a.anuncio_id";
const sqlanunciosConSolicitudes = "select a.anuncio_id,a.creador_id,a.actividad_ofrecida_id,a.duracion,a.fecha_hora,a.salario_propuesto,a.created_at,u.usuario,u.contrasena,u.email,u.ubicacion,u.full_name,u.privilegio,u.pictureURL as pictureURLusuario,act.nombre,act.descripcion,act.pictureURL as pictureURLactividad,COUNT(s.solicitud_id) AS numero_de_solicitudes from anuncios a left join usuarios u on a.creador_id=u.id LEFT JOIN Actividades act on a.actividad_ofrecida_id=act.actividad_id LEFT JOIN Solicitudes s ON a.anuncio_id = s.anuncio_id" ;
export const readJSON = (path) => require(path)


export class AnuncioModel {
  static async getAll({ creador_id }) {
    let anuncios;
    if (creador_id) {
      anuncios = await db.query(sqlanunciosConSolicitudes+" WHERE  a.creador_id = ? GROUP BY   a.anuncio_id order by a.fecha_hora", [creador_id]);
    } else{
      anuncios = await db.query(sqlAnuncios + " order by a.fecha_hora");
    }
    return anuncios;
  }

  static async getById({ anuncio_id }) {
    const anuncio = await db.query(sqlanunciosConSolicitudes + " where a.anuncio_id=? ", [anuncio_id]);
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
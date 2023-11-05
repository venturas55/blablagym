import z from 'zod';
const ISO_DATETIME_REGEX = /\d{4}-[01]\d-[0-3]\d/;
const actvidadSchema = z.object({
    nombre: z.string({
        invalid_type_error: 'Actividad tiene que ser un string',
        required_error: 'Actividad es requerido'
    }),
    descripcion: z.string({
        invalid_type_error: 'Descripcion tiene que ser un string',
        required_error: 'descripcion es requerido'
    })
});


const anunciosSchema = z.object({
    duracion: z.coerce.number().int().positive(),
    actividad_ofrecida_id: z.coerce.number().int().positive(),
    salario_propuesto: z.coerce.number().positive(),
    fecha_hora: z.string().regex(ISO_DATETIME_REGEX, 'date must be a valid ISO date'),
    //fecha_hora: z.coerce.string().datetime({ offset: true }),
});


export function validateActividad(object) {
    return actvidadSchema.safeParse(object);
}

export function validateAnuncio(object) {
    return anunciosSchema.safeParse(object);
}

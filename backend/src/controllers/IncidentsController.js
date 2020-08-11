const connection = require('../database/connection')

module.exports = {

    async index(request, response){
        /*Controla quantos casos serão mostrados por pagina
            E busca no banco de dados todos os dados de uma ong
            os dados dela e seus casos.
        */
        const [ count ] = await connection('incidents').count()
        const { page = 1 } = request.query
        const incidents = await connection('incidents')
            .join('ongs', 'ong_id', '=', 'incidents.ong_id')
            .limit(5)
            .offset( (page - 1) * 5 )
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
                ])

        // Retorna um Objeto com o total de registro
        response.header('X-Total-Count', count['count(*)'])

        return response.json(incidents)
    },

    async create(request, response){
        const { title, description, value } = request.body

        const ong_id = request.headers.authorization

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })

        return response.json({id})
    },

    async delete(request, response){
        const { id } = request.params
        const ong_id = request.headers.authorization

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first()
        
        if (incident.ong_id !== ong_id){
            return response.status(401).json({ error: 'Operation not permitted.' })
        }else{
            await connection('incidents').where('id', id).delete()

            return response.status(204).send()
        }

    }

}
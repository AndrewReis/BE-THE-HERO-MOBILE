const knex = require('knex')
const config = require('../../knexfile')

const connnection = knex(config.development)

module.exports = connnection
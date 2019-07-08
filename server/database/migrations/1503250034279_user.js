'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.string('email', 254).notNullable().unique()
<<<<<<< HEAD
      table.string('mobile', 11).notNullable().unique()
=======
      table.string('mobile', 10).notNullable().unique()
>>>>>>> de03b8d001c185ffd6919c0973b465afe51902e5
      table.string('password', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema

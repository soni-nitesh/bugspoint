'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.string('user_id', 4).notNullable()
      table.float('lat',50,6).notNullable()
      table.float('lng', 50,6).notNullable()
      table.string('title', 50).notNullable()
      table.string('category', 20).notNullable()
      table.string('image',100).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostSchema

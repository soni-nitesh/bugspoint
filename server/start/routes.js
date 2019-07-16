'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
Route.post('/register', 'UserController.register')
Route.post('/login', 'UserController.login')
Route.post('/addPost','PostController.addPost')
Route.get('/getPostData','PostController.getPostData')
Route.post('/getParticularPostData','PostController.getParticularPostData')
Route.post('/getUserPost','PostController.getUserPost')
Route.post('/deletePost','PostController.deletePost')
Route.post('/likePost','PostController.likePost')
Route.post('/viewlikes','PostController.viewlikes')

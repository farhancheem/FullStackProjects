import {Mongo} from 'meteor/mongo';
//Todos = require('/lib/collections').Todos

export const Todos = new Mongo.Collection('todos');//exports the Todos from Collections
if(Meteor.isClient){window.Todos = Todos;} // here we make it global only for Client though and not the server code

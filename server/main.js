import { Meteor } from 'meteor/meteor';
//import Todos from '../lib/collections.js';
import {Todos} from'../lib/collections';




Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish('todos', function todoPublication(){
  return Todos.find({
    $or:[
      {private:{$ne: true}},
      {owner: this.userId}

    ]
  });
});

Meteor.methods({
  'todos.insert'(text, time){
    if(!this.userId){
      throw new Meteor.Error('not-authorized');
    }
    Todos.insert({
      text,
      time,
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  'todos.setChecked'(id,setChecked){
    Todos.update(id,{$set:{checked: setChecked}});
  },
  'todos.remove'(id){
    if(todo.owner !==this.userId){
      throw new Meteor.Error('Unauthorzied');
    }
    Todos.remove(id);

  },
  'todos.setPrivate'(id,setToPrivate){
    const todo= Todos.findOne(id);
    if(todo.owner !==this.userId){
      throw new Meteor.Error('Unauthorzied');
    }
    Todos.update(id,{$set:{private:setToPrivate}});
  }
});

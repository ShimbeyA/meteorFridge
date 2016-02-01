Products = new Mongo.Collection('products');


if (Meteor.isClient) {
  // counter starts at 0
 // Session.setDefault('counter', 0);

  Template.fridge.helpers({
   products: function () {
      return Products.find({
        place: 'fridge'
      });
    }
  });

  Template.productList.helpers ({
    products: function() {
      return Products.find ({
        place: 'supermarket'
      });
    }
    });
  Template.fridge.onRendered(function() {
    var templateInstance = this;
    
    templateInstance.$('#fridge').droppable ({
      drop: function (evt, ui){
        var query = { _id: ui.draggrable.data('id')};
        var changes = { $set: {place: 'fridge'}};
        Products.update(query, changes);
      }
    });
  });
  
   Template.productList.onRendered(function(){
    var templateInstance = this;
    
    templateInstance.$('#supermarket').droppable ({
      drop: function (evt, ui){
        var query = { _id: ui.draggrable.data('id') };
        var changes = { $set: {place: 'supermarket' } };
        Products.update(query, changes);
      }
    });
   });
   
   Template.productListItem.onRendered(function() {
    var templateInstance = this;
    
    templateInstance.$('.draggable').draggable ({
      cursor: 'move',
      helper: 'clone'
    });
   });
}
      // increment the counter when button is clicked
      //Session.set('counter', Session.get('counter') + 1);
 

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    Products.remove({});
    
    Products.insert ({
      name: 'Milk',
      img:'/milk.jpg',
      place: 'frigde'
    });
    
    Products.insert({
      name: 'Bread',
      img: '/bread.jpg',
      place: 'supermarket'
    });
  });
}

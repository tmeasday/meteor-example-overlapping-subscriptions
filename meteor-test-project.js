var Posts = new Meteor.Collection('posts');

if (Meteor.isClient) {
  Template.hello.post = function() {
    return Posts.findOne();
  }
  
  Meteor.subscribe('private');
  Meteor.subscribe('public');
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // create some data
    if (Posts.find().count() === 0) {
      Posts.insert({publicValue: 'public', hiddenValue: 'hidden'});
    }
    
    // two subscriptions
    Meteor.publish('private', function() {
      return Posts.find({});
    });
    
    Meteor.publish('public', function() {
      return Posts.find({}, {fields: {hiddenValue: 0}});
    });
  });
}

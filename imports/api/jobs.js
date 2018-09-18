import { Mongo } from 'meteor/mongo';

//I am wondering if the collection being empty matters
export const Jobs = new Mongo.Collection('jobs');

export const Helpers = new Mongo.Collection('helpers');

export const Helperjobs = new Mongo.Collection('helperjobs');




 
// if (Meteor.isServer) {
//   // This code only runs on the server
//   Meteor.publish('jobsnohelpers', function () {
//     return Jobs.find();
//   });
// }


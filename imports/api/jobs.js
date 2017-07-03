import { Mongo } from 'meteor/mongo';

export const Jobs = new Mongo.Collection('jobs');

export const Helpers = new Mongo.Collection('helpers');

export const Helperjobs = new Mongo.Collection('helperjobs');

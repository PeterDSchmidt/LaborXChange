import '../imports/api/jobs.js';

import { Jobs } from '../imports/api/jobs.js';
import { Helpers } from '../imports/api/jobs.js';

import { Helperjobs } from '../imports/api/jobs.js';

Meteor.publish('Helpers', function(){
    return Helpers.find();
});

Meteor.publish('Jobs', function(){
    return Jobs.find();
});

Meteor.publish('Helperjobs', function(){
    return Helperjobs.find();
});


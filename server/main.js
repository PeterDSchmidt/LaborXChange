import '../imports/api/jobs.js';

import { Jobs } from '../imports/api/jobs.js';
import { Helpers } from '../imports/api/jobs.js';

import { Helperjobs } from '../imports/api/jobs.js';

import { Jobsnohelpers } from '../imports/api/jobs.js';


// import {Accounts} from '../imports/api/accounts-config.js';

// I am having a hard time with this. I know the aggregation works but the return seems to be empty??????????

// Meteor.publish('Jobsnohelpers', function(){
//     var self = this;
//     var handle = Jobs.aggregate([{
//  // return Jobs.aggregate([{
//   $lookup: {
//      from: "Helperjobs",
//      localField: "_id",
//      foreignField: "job",
//      as: "temp"
//   }},
//   {
//     $match: { "temp.HelperName": { $exists: false } }
    
//   }
//   ,{ $unwind: "_id"}
//   ]);
  
//     console.log("Handle what is it a collection a cursor or something else?");
//     console.log(handle.find());
//   // var temp = jobs.find();
//     //This line creates a cursor
//     // console.log(temp);
//     // //This line creates a collection
//     // console.log(Jobs);
    
//     return   handle;
//     // var temp = Jobs.find({_id: {$in: JobIDs}});
//     //  console.log(temp);
//     //  return temp;
     
     
// //   Jobsnohelpers =  Jobs.find({username: "PSchmidt"});
   
// //   return Jobsnohelpers;
//   //  return Jobs.find();
   
//   });
  
  Meteor.publish("Jobsnohelpers", function (args) {
    var sub = this;
    var db = MongoInternals.defaultRemoteCollectionDriver().mongo.db;
    const a = new array;
    // Your arguments to Mongo's aggregation. Make these however you want.
    var pipeline = [
         { $lookup:
         {
            from: "Helperjobs",
            localField: "job",
            foreignField: "_id",
            as: "temp"
        }},
          // { 
           //    $match: 
            //   {"temp.Helpername": {$exists: false }}
               
          // },
        //   { $group: {_id: Jobs._id, }}
                    ];

    db.collection("Jobs").aggregate(     
    //Jobs.aggregate(
        pipeline,
        // Need to wrap the callback so it gets called in a Fiber.
        Meteor.bindEnvironment(
            function(err, result) {
                // Add each of the results to the subscription.
                _.each(result, function(a) {
                    // console.log("result");
                     console.log(a);
                    // Generate a random disposable id for aggregated documents
                    sub.added("Jobsnohelpers", Random.id(), 
                    {
                       // ShortDesc:
                        //ShortDesc: "Hello",
                        LongDesc: A.LongDesc
                       // count: e.count
                    }
                    );
                });
                
               //console.log(sub)
               //console.log(e.)
                //console.log(sub._id.client_Jobsnohelpers)
                
                sub.ready();
            },
            function(error) {
                Meteor._debug( "Error doing aggregation: " + error);
            }
        )
    );
});


// the code below did not solve the problem...
// What if I create a jobsnohelpers table and then just pull that through
// Meteor.publish('Jobsnohelpers', function() {
//     Jobsnohelpers = Jobs.find();
//     return Jobsnohelpers;
    
//   });

Meteor.publish('Helpers', function(){
    return Helpers.find();
});

Meteor.publish('Jobs', function(){
    return Jobs.find();
});

Meteor.publish('Helperjobs', function(){
    return Helperjobs.find();
});


import { Template } from 'meteor/templating';

import { Mongo } from 'meteor/mongo';

//Imports are required so that the client has a definition of the collection
import { Jobs } from '../api/jobs.js';

import { Helpers } from '../api/jobs.js';

import { Helperjobs } from '../api/jobs.js';

import {Accounts} from '../api/accounts-config.js'; 
//testing this out

// import './body.html';
import './layout.html';
import './sidebar.html';
import './MainTemplates.html';
import './HeaderNav.html';
import { ReactiveDict } from 'meteor/reactive-dict';

 Meteor.subscribe("Jobs");
//Meteor.subscribe("Helpers");
 //Meteor.subscribe("Helperjobs");
 
Template.createjob.events({
  'submit form': function(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const shortdesc = target.shortdesc.value;
    const longdesc = target.longdesc.value;
    // Insert a task into the collection
    var JobID = Jobs.insert({
      owner: Meteor.userId(),
      username: Meteor.user().username,
      //test of User based display
      ShortDesc: shortdesc,
      LongDesc: longdesc,
      createdAt: new Date(), // current time
    });
    console.log(JobID);

    // Clear form
//     target.shortdesc.value = '';
//     target.longdesc.value = '';
//  Router.go('listPage', { _id: results }
     Router.go ('/SelectHelpers/' + JobID );

  },
});

Template.invitehelpers.events({
  'submit form': function(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const helpername  = target.helpername.value;
    const helperemail = target.helperemail.value;

    // Insert a task into the collection
    Helpers.insert({
      owner: Meteor.userId(),
      username: Meteor.user().username,
      //test of User based display
      HelperName: helpername,
      HelperEmail: helperemail,
      createdAt: new Date(), // current time
    });



    // Clear form
    target.helpername.value = '';
    target.helperemail.value = '';
    Router.go ('/MyJobs');
  },
});



Template.selecthelpers.events({
  'submit form': function(event,template) {
    // Prevent default browser form submit
    event.preventDefault();
    console.log(event.target);
    //find checked items
    var selected = template.findAll( "input[type=checkbox]:checked");
    console.log(selected);
  //create array of items checked
   var array = _.map(selected, function(item) {
     return item.value;
   });
    //iterate through items in the array and insert them in the DB
    var arrayLength = array.length
   console.log(array);
    for (i = 0; i < arrayLength; i++) {
      var helpername = array[i];
      console.log('Id: ' + this._id);
    // Insert a task into the collection
    Helperjobs.insert({
      job: this._id,
      helper: helpername,
      createdAt: new Date(), // current time
    });

}
    // Clear form

     Router.go ('/MyJobs');
  },
});

// Template.selecthelpers.helpers({
//   helpers() {
// //     console.log('Id: ' + this._id);
//     return Helpers.find({owner: Meteor.userId()});
//   },
// });

Template.selecthelpers.helpers({
  helpers(){
         // return Helpers.find({owner: Meteor.userId()});
            var temp = Helpers.find();
            console.log(temp);
            return temp;
      
      
  },
});
        

Template.addhelpertojob.events({
  'submit form': function(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const shortdesc = target.shortdesc.value;
    const longdesc = target.longdesc.value;
    // Insert a task into the collection
    Jobs.insert({
      owner: Meteor.userId(),
      username: Meteor.user().username,
      //test of User based display
      ShortDesc: shortdesc,
      LongDesc: longdesc,
      createdAt: new Date(), // current time
    });

    // Clear form
    target.shortdesc.value = '';
    target.longdesc.value = '';
    Router.go ('/MyJobs');
  },
});

// if(Meteor.isClient){ 

// Template.body.onCreated(function () {
//   Meteor.subscribe("jobsnohelpers"); 
// });
// }

// 
  // jobs () {
  //   Meteor.subscribe("Jobs")
  
  // helpers() {
  //   return Helpers.find({ owner: Meteor.userId() } );
  // },

Template.alljobs.helpers({
    
   jobs(){
     var temp = Jobs.find({owner: {$ne: Meteor.userId()}});
     console.log(temp);
     return temp;
   }

});

Template.myjobfeed.helpers({
   
  jobs() {
      var temp = Jobs.find({owner: Meteor.userId()});
     
      console.log(temp);
    
    return Jobs.find({owner: Meteor.userId()});
  },
});


Template.helperlist.helpers({
  helpers() {
    return Helpers.find({ owner: Meteor.userId() } );
  },
});


Template.signedupjobs.helpers({
                              // need to change this to bring back jobs that I have hours assigned to
//   helperjobs() {
//     return Helperjobs.find({helper: Meteor.userId()});
        jobs(){ var temp = Jobs.find({"Helper.HelperName":  Meteor.user().username})   ;
        console.log(Meteor.user().username);
        console.log(temp);
        return temp;
//   },
}});


Template.job.helpers({
  jobs() {
   // return Helperjobs.find({owner: Meteor.userId()});
    return Jobs.find({"Helper.Helpername": Meteor.user().username});
     console.log('Id: ' + this._id);

    //need to figure out how to send in job Id for this? Or maybe just take it all back and then sort it out in the template?
  },
});

Template.signup.helpers({
  jobs() {
    console.log('Id: ' + this._id);
    return Jobs.find({_id: this._id});
  },
});

Template.signup.events({
  'submit form': function(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const hours  = target.hours.value;
    console.log(hours);


    // Insert a helper document into the jobs collection

   Jobs.update({_id: this._id},{$push:{Helper: {"_id": Meteor.userId(), "HelperName": Meteor.user().username, "hours": hours }
   //Jobs.update({_id: this._id},{$push:{Helper: {"_id": Meteor.userId(), "HelperName": Meteor.user().username, "hours" }
       // ShortDesc: hours
     //hours1: "I am doing this as a test", - this worked
     //"helper.$.name": Meteor.user().username,
     //"helper.$.hours": hours}
    }});
console.log(Meteor.userId());
    // Clear form
    target.hours.value = '';
    Router.go ('/MyJobs');
  },
});

Template.editjob.helpers({
  jobs() {
    console.log('Id: ' + this._id);
    return Jobs.find({_id: this._id});
  },
});



Template.editjob.events({

     'submit form': function(event){
//     'click .submit': function(event) {

    // Prevent default browser form submit
     event.preventDefault();
    // Get value from form element
          const target = event.target;
       console.log(target)
// //         Session.get('selectedPlayer')
         const shortdesc = event.target.shortdesc.value;
         const longdesc = event.target.longdesc.value;


             Jobs.update({_id: this._id},{
               $set:{
//              owner: Meteor.userId(),
//              username: Meteor.user().username,
             //test of User based display
             ShortDesc: shortdesc,
             LongDesc: longdesc,
//              updatedAt: new Date(), // current time
              }});
    // Clear form

//     target.shortdesc.value = '';
//     target.longdesc.value = '';

    Router.go ('/MyJobs');
    },

  'click .remove': function(){
//       console.log('IdCheck: ' + this._id);
 //     event.preventDefault();
      Jobs.remove({ _id: this._id });
//       const target = event.target;
//       target.shortdesc.value = '';
//       target.longdesc.value = '';
      Router.go ('/MyJobs');
    },

});



Template.closejobs.helpers({
  jobs() {
    return Jobs.find({owner: Meteor.userId()});
   // return Jobs.find({_id: this._id});
  },
});

Template.closejob.helpers({
                         jobs() {
                          return Jobs.find({_id: this._id});},
                        //   helperjobs() {
                        //   // return Helperjobs.find({owner: Meteor.userId()});
                        //   return Helperjobs.find({job: this._id});},
                          
                         });

Template.closejob.events({
  'submit form': function(event) {

    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const closed = "closed"
    console.log(target);
    const hours = target.hours.value;
    const name = target.helpername.value;
    console.log(hours);
    console.log(name);

//  !!! I AM ONLY TAKING IN THE FIRST ELEMENT OF THE ARRAY> I NEED TO LOOP THROGH IT
    //  foreach helper in job = jobID 
  
    console.log("Helpers");
   const  subdocs = Jobs.findOne({"_id" : this._id}).Helper.length;
   
   
   
   console.log(subdocs);
   var myhours= document.getElementsByName("hours[]");
   var myname= document.getElementsByName("helpername[]");
    console.log(myhours[0].value); //Outputs "atrib name 1"
  
    
    for (var i = 0; i < subdocs; i++){
       var toSet =  'Helper.' + i + '.hours';
        //console.log(toSet);
    Jobs.update({_id: this._id},{$set:{[toSet]: myhours[i].value }});
           
   // Jobs.update({_id: this._id },{$set:{x}}) ;
   
    }
    // Clear form
  //  target.hours.value = '';
    Router.go ('/CloseJobs');


  }
});

Router.go ('/HomePage');
    // Clear form
//    target.shortdesc.value = '';
//     target.longdesc.value = '';

// } -- End bracket for IsMeteor
// Template.jobdeleter.helpers({
//  jobs() {
//    Jobs.remove(this._id)
// //    return Jobs.find({_id: this._id});
//    },
// });

// Template.deletejob.helpers({
//   jobs() {
//     console.log('Id: ' + this._id);
//     return Jobs.find({_id: this._id});
//   },
// });

// Template.deletejob.events({
//   'submit form': function(event) {

//     // Prevent default browser form submit
//     event.preventDefault();

//     // Get value from form element
//     const target = event.target;
//     const shortdesc = target.shortdesc.value;
//     const longdesc = target.longdesc.value;
//     // update a job into the collection


//     Jobs.remove({_id: this._id});
//     // Clear form
//     target.shortdesc.value = '';
//     target.longdesc.value = '';
//     Router.go ('/MyJobs');
//   },
// });

// Template.removejob.helpers({
//   jobs() {
//     return Jobs.find({owner: Meteor.userId()});
//   },
// });


// Template.removejob.events({
//   'submit form': function(event) {

//     // Prevent default browser form submit
//     event.preventDefault();

//     // Get value from form element
//     const target = event.target;
//     const shortdesc = target.shortdesc.value;
//     const longdesc = target.longdesc.value;
//     // update a job into the collection


//     Jobs.delete({_id: this._id});
//     // Clear form
//     target.shortdesc.value = '';
//     target.longdesc.value = '';
//     Router.go ('/MyJobs');
//   },
// });



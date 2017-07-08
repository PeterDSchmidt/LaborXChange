import { Template } from 'meteor/templating';

import { Jobs } from '../api/jobs.js';

import { Helpers } from '../api/jobs.js';

import { Helperjobs } from '../api/jobs.js';

import {Accounts} from '../api/accounts-config.js';

// import './body.html';
import './layout.html';
import './sidebar.html';
import './MainTemplates.html';
import './HeaderNav.html';
// import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

// if(Meteor.isClient){ -- Not sure whether to use this or not


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

Template.selecthelpers.helpers({
  helpers() {
//     console.log('Id: ' + this._id);
    return Helpers.find({owner: Meteor.userId()});
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

Template.alljobs.helpers({
  jobs() {
    return Jobs.find({ owner: { $ne: Meteor.userId() } });
  },
});

// Template.helper.helpers({
//   helpers() {
//     return Helpers.find({ owner: { $ne: Meteor.userId() } });
//   },
// });

Template.helperlist.helpers({
  helpers() {
    return Helpers.find({ owner: Meteor.userId() } );
  },
});

Template.myjobfeed.helpers({
  jobs() {
    return Jobs.find({owner: Meteor.userId()});
  },
});

Template.signedupjobs.helpers({
                              // need to change this to bring back jobs that I have hours assigned to
  helperjobs() {
    return Helperjobs.find({helper: Meteor.userId()});
                              console.log('Id: ' + this._id);
  },
});


Template.job.helpers({
  helperjobs() {
   // return Helperjobs.find({owner: Meteor.userId()});
    return Helperjobs.find({job: this._id});
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


    // Insert a task into the collection

    Helperjobs.insert({
     helper: Meteor.userId(),
      job: this._id,
      hours: hours,
    });

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
       console.log(event)
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
  },
});

Template.closejob.helpers({
                         jobs() {
                          console.log('Id: ' + this._id);
                          return Jobs.find({_id: this._id});},
                          helperjobs() {
                          // return Helperjobs.find({owner: Meteor.userId()});
                          return Helperjobs.find({job: this._id});},
                          
                         });

Template.closejob.events({
  'submit form': function(event) {

    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const totalhours = target.totalhours.value;

    // update helperjobs with hours
    Helperjobs.update({_id: this._id},
     { $set:{
      //test of User based display
      totalhours: totalhours,
    }});

    // Clear form
    target.totalhours.value = '';
    Router.go ('/CloseJobs');


  },
});

Router.go ('/MyJobs');
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



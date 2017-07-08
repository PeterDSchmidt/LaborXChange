Router.configure({
  // the default layout
  layoutTemplate: 'layout'
});

Router.route('/', function () {
  this.render('jobfeed');
  this.layout('layout');
});

Router.route('/CreateJob', function () {
  this.render('createjob');
  this.layout('layout');
});

Router.route('/DeleteJob/:_id', function () {
  this.render('removejob');
  this.layout('layout');
});

Router.route('/RemoveJob/:_id', function () {
  this.render('removejob', {data: {_id: this.params._id}});
  this.layout('layout');
});

Router.route('/CloseJobs', function () {
  this.render('closejobs');
  this.layout('layout');
});
Router.route('/CloseJob/:_id', function () {
             console.log(this.params._id);
             this.render('closejob', {data: {_id: this.params._id}});
             this.layout('layout');
             });

Router.route('/SignUp/:_id', function () {
  this.render('signup', {data: {_id: this.params._id}});
  this.layout('layout');
});

Router.route('/SignedUpJobs', function () {
 this.render('signedupjobs');
  this.layout('layout');
});


Router.route('/EditJob/:_id', function () {
   console.log(this.params._id);
  this.render('editjob', {data: {_id: this.params._id}});
  this.layout('layout');
});

Router.route('/AllJobs', function () {
  this.render('alljobs');
  this.layout('layout');
});

Router.route('/MyJobs', function () {
   this.render('myjobfeed');
   this.layout('layout');
});

Router.route('/HowTo', function () {
             this.render('howto');
             this.layout('layout');
             });

Router.route('/MyAccount', function () {
             this.render('myaccount');
             this.layout('layout');
             });

Router.route('/SelectHelpers/:_id', function () {
  console.log(this.params._id);
  this.render('selecthelpers', {data: {_id: this.params._id}});
  this.layout('layout');
});

Router.route('/AddHelpertoJob', function () {
  this.render('addhelpertojob');
  this.layout('layout');
});

Router.route('/InviteHelpers', function () {
  this.render('invitehelpers');
  this.layout('layout');
});

Router.route('/EditProfile', function () {
  this.render('editprofile');
  this.layout('layout');
});

Router.route('/InvitebyEmail', function () {
  this.render('invitebyemail');
  this.layout('layout');
});

Router.route('/ImportFacebook', function () {
  this.render('importfacebook');
  this.layout('layout');
});

Router.route('/ImportGoogle', function () {
  this.render('importgoogle');
  this.layout('layout');
});

Router.route('/CurrentHelpers', function () {
  this.render('helperlist');
  this.layout('layout');
});

Router.route('/Credits', function () {
  this.render('credits');
  this.layout('layout');
});


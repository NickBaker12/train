var config = {
  	apiKey: "AIzaSyAsSZjzzv2BQWurOqpDx3BrFX1T8l4Gyz4",
	authDomain: "intro-17f5e.firebaseapp.com",
	databaseURL: "https://intro-17f5e.firebaseio.com",
	storageBucket: "intro-17f5e.appspot.com",
};
firebase.initializeApp(config);
var database = firebase.database();

$("#submit").on("click", function(event){
event.preventDefault();
var name = $("#name").val().trim();
var destination = $("#destination").val().trim();
var firstTime = $("#first-time").val().trim();
var firstHours = parseInt(firstTime.substr(0,2));
var firstMinutes = parseInt(firstTime.substr(3,4));
firstTime = (firstHours*60) + firstMinutes;
var frequency = parseInt($("#frequency").val().trim());
database.ref().set({
	name: name,
	destination: destination,
	firstTime: firstTime,
	frequency: frequency
})
var currentTime = moment().format("HH:mm");
var currentHours = parseInt(currentTime.substr(0,2));
var currentMinutes = parseInt(currentTime.substr(3,4));
currentTime = (currentHours*60) + currentMinutes;
var duration = firstTime - currentTime;
var nextTime = firstTime;
while (duration < 0){
	nextTime = nextTime+frequency;
	duration = nextTime - currentTime;
}
var markup = "<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + moment().add(duration, 'm').format("hh:mm a") + "</td><td>" + duration + "</td>";
$("table").append(markup);
});
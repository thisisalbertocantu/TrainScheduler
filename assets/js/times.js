// Initialize Firebase
var config = {
    apiKey: "AIzaSyARWRUwxYZGlySDKaxJJWtWmiizCnRY1n8",
    authDomain: "thisisalbertocantu.firebaseapp.com",
    databaseURL: "https://thisisalbertocantu.firebaseio.com",
    projectId: "thisisalbertocantu",
    storageBucket: "thisisalbertocantu.appspot.com",
    messagingSenderId: "971795188818"
  };
  firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

    // Capture Button Click
    $("#add-user").on("click", function(event) {
      event.preventDefault();

      // Capture User Inputs and store into variables
      var name = $("#name-input").val().trim();
      var dest = $("#dest-input").val().trim();
      var firstTrain = $("#firstTrain-input").val().trim();
      var freq = $("#freq-input").val().trim();


      // Console log each of the user inputs to confirm we are receiving them
      console.log(name);
      console.log(dest);
      console.log(firstTrain);
      console.log(freq);
  
       // Creates local "temporary" object for holding employee data
var newTrain = {
    name: name,
    destination: dest,
    first: firstTrain,
    frequency: freq,
};

// Uploads employee data to the database
database.ref().push(newTrain);

// Clears all of the text-boxes
$("#name-input").val("");
$("#dest-input").val("");
$("#firstTrain-input").val("");
$("#freq-input").val("");

    //   database.ref().set({
    //     name: name,
    //     destination: dest,
    //     firstTrain: firstTrain,
    //     frequency: freq
    //   })

      return false
    });

//---------------------------------function to pull info from firebase and add it to the  table----------------------------------------------------
    database.ref().on("child_added", function(snapshot) {
        console.log(snapshot.val());
      
        // Store everything into a variable.

        var name = snapshot.val().name;
        var dest = snapshot.val().destination;
        var firstTrain = snapshot.val().first;
        var freq = snapshot.val().frequency;
        
        // train Info
        console.log(name);
        console.log(dest);
        console.log(firstTrain);
        console.log(freq);
        
// Assumptions
var tFrequency = freq;

// Time is 3:30 AM
var firstTime = firstTrain;

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var MinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + MinutesTillTrain);

// Next Train
var nextTrain = moment().add(MinutesTillTrain, "minutes").format("hh:mm A");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // Console log each of the user inputs to confirm we are receiving them
    console.log(name);
    console.log(dest);
    console.log(firstTime);
    console.log(tFrequency);
    console.log(MinutesTillTrain);

// Create the new row
var newRow = $("<tr>").append(
$("<td class='tdName'>").text(name),
$("<td class='tdDest'>").text(dest),
$("<td class='tdFreq'>").text(freq),
$("<td class='tdArrival'>").text(nextTrain),
$("<td class='tdAway'>").text(MinutesTillTrain)
);

// Append the new row to the table
$("#schedule-table > tbody").append(newRow);
});

//---------------------------------Train Math----------------------------------------------------
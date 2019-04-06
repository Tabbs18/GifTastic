//array of strings with a variable called Topics
var topics = [
        "Dog", "cat", "rabbit", "squirrel", "panda", "chipmonk", "parrot", "rat", "kangaroo"
];

// Function for displaying gifs data
function renderButtons() {

        //delting the gifs before adding new gifs 
        $("#buttons-view").empty();

        //looping through the array of animals
        for (var ctr = 0; ctr < topics.length; ctr++) {

                //generating buttons for each gif in the array
                var b = $("<button>");
                console.log(b);
                // Adding a class of topic-btn to our button
                // b.addClasss("topic-btn");
                // Adding a data-attribute
                b.attr("data-name", topics[ctr]);
                // Providing the initial button text
                b.text(topics[ctr]);
                // Adding the button to the buttons-view div
                $("#buttons-view").append(b);
        }
}
// displayGifs function display content
function displayGifs() {

        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=Yjmtlr74t0eM9ru2pOIr02HchgPTe5A5&limit=10";

        //creating the ajax call for the specific animal button being clicked 
        $.ajax({
                url: queryURL,
                method: "GET"
        }).then(function (response) {

                // storing the response in a variable
                var results = response.data;

                //looping through the results that come back
                for (var i = 0; i < results.length; i++) {

                        //creating a Div to hold the gifs
                        var animalDiv = $("<div>");

                        //creating an element to have the rating displayed
                        var pOne = $("<p>").text("Rating: " + results[i].rating);

                        // Retrieving the URL for the image
                        var imgURL = response.Poster;

                        // Creating an element to hold the image
                        var image = $("<img>").attr("src", imgURL, results[i]);

                        //appending the rating and image to the animalDiv
                        animalDiv.append(pOne);
                        animalDiv.append(image);

                        //prepending the animalDiv and the gifs-here div from the html
                        $("#gifs-here").prepend(animalDiv);
                }

        });

        // This function handles events where a button is clicked
        $("#add-topic").on("click", function (event) {
                event.preventDefault();

                // grabs the input from the textbox
                var topic = $("#topics-input").val().trim();

                // Adding animals from the textbox to our array 
                topics.push(topic);

                // Calling renderButtons which handles the processing of our Topics array
                renderButtons();

        });
};
// Adding a click event listener to all elements with a class of "topic-btn"
$(document).on("click", ".topic-btn", displayGifs);

// Calling the renderButtons function to display the intial buttons
renderButtons();
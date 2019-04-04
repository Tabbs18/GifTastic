//array of strings with a variable called Topics
var topics = [
    "Dog", "cat", "rabbit", "squirrel", "panda", "chipmonk", "parrot", "rat", "kangaroo"
];

function displayGifs(){

    var animal = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=Yjmtlr74t0eM9ru2pOIr02HchgPTe5A5&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {

        var results = response.data;

        for (var i = 0; i < results.length; i++) {

        var animalDiv = $("<div>");

        var pOne = $("<p>").text("Rating: " + results[i].rating);

        var imgURL = response.Poster;

        var image = $("<img>").attr("src", imgURL, results[i]);

        animalDiv.append(pOne);
        animalDiv.append(image);

        $("#gifs-here").prepend(animalDiv);
      }

      });
    

      function renderButtons(){

        $("#buttons-view").empty();

        for(var ctr = 0; ctr < topics.length; ctr++){

          var b = $("<button>");
          b.addclasss("topic-btn");
          b.attr("data-name", topics[ctr]);
          b.text(topics[ctr]);
          $("#buttons-view").append(b);
        }
      }

      $("#add-topic").on("click", function(event) {
        event.preventDefault();

        var topic =  $("#topics-input").val().trim();

        topics.push(topic);

        renderButtons();

      });
    };

      $(document).on("click", ".topic-btn", displayGifs);

      renderButtons();
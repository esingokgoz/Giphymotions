$(document).ready(function () {

    var topics = ["Angry", "Sad", "Surprised", "Sassy", "Lonely"];

    function createButtons() {
        $("#button").empty();

        //create the buttons and label them and give each button data-name attribute
        for (var i = 0; i < topics.length; i++) {

            var button = $("<button>")
            button.addClass("button");
            button.attr("data-name", topics[i]);
            button.text(topics[i]);

            //add to html
            $("#button").append(button);
        }
    }

    //add user button
    $("#submitButton").on("click", function () {

        emotions = $("#userinput").val().trim();
        topics.push(emotions);
        console.log(emotions);

        form.reset();
        createButtons();

        return false;
    });

    $(document).on("click", ".button", giphy);
    createButtons();

    //create the giphies
    function giphy() {
        $("#images").empty();

        var emotions = $(this).attr("data-name");
        var apiKey = "AG2BrnEPrqRujLoCRYjvENEO9SE2RFEJ";
        var limit = 10;
        var URL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + emotions + "&limit=" + limit + "&offset=0";

        $.ajax({
            url: URL,
            method: "GET"
        }).then(function (response) {
            console.log("this is the response");
            console.log(response);
            console.log("This is the response data");
            console.log(response.data);
            var results = response.data;

            //create a giphh div
            //get & set the object data types to still, animate, state states
            for (var i = 0; i < results.length; i++) {

                var giphiesDiv = $("<div class = giphies>");
                var img = $("<img>");
                
                img.attr("src", results[i].images.fixed_height_still.url);
                img.attr("data-still", results[i].images.fixed_height_still.url);
                img.attr("data-animate", results[i].images.fixed_height.url);
                img.attr("data-state", "still");
                img.addClass("gif");
                giphiesDiv.append(img);

                //get the rating the of the object
                var rating = results[i].rating;

                var giphRating = $("<p>").text("Rating: " + rating);
                giphiesDiv.append(giphRating);

                $("#images").prepend(giphiesDiv);

            }
        });
    }

    $(document).on("click", ".gif", function () {

        var state = $(this).attr("data-state");
        //if the image is still, change the src and data-state to animate
        if (state === "still") {
            $(this).attr("src", $(this).data("animate"));
            $(this).attr("data-state", "animate");
        } 
        else {
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
        }
    });

});



//Emotions Tags
// #angry
// #bored
// #disappointed
// #drunk
// #embarrassed
// #excited
// #frustrated
// #happy
// #hungry
// #inspired
// #lonely
// #love
// #nervous
// #pain
// #reaction
// #relaxed
// #sad
// #sassy
// #scared
// #shocked
// #sick
// #stressed
// #surprised
// #suspicious
// #tired
// #unimpressed

//Giphy function:
function soothingGif(tag) {
    queryURL = "https://api.giphy.com/v1/gifs/random?api_key=YH4MrA2S7hO4bt490OPWcfMSS4SQUtl1&tag=" + tag;
    
    //this ajax call is for the soothing gif function
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        
        //this builds an image and sets the source to be the url in the response
        $("#soothingGif").html($("<img>").attr("src", response.data.images.original.url));

    });//closing bracket for soothinggif ajax call


};//closing bracket for soothingGif function




// spoonacular function:
function getRecipe(tag) {
    queryURL = "https://api.spoonacular.com/recipes/search?query=" + tag + "&number1&apiKey=c30cd056ba1c4e459950da3b71b83d82"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        var recipeLink = $("<a>").attr("href", response.results[0].sourceUrl);

        recipeLink.text(response.results[0].title);

        $("#recipe").empty()
        $("#recipe").append(recipeLink);

    });

};//closing bracket for spoonacular function

getRecipe("lasagna");




//youtube function, currently broken at line 54
function youtubeVideo(tag) {
    
    queryURL ="https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=" + tag + "&key=AIzaSyCgpNgJWhqC8iroTq5_Sbp53ulbGGbafzU"

    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {

        console.log(response)

        $("#youtube").html($("<video>").attr("src", items[0].snippet.thumbnails.default));//this gives an error that "items" isn't an object, we can't find the URL for the video in the object that our query is returning.

    });//closing bracket for youtube ajax call

};//closing bracket youtubevideo function


//this calls our youtubevideo function when the page loads, it's commented out because the function is broken
//youtubeVideo("yoga");

//this calls our giphy function when the page loads
soothingGif("puppy")
//Giphy function:
function retrieveGif(tag) {
  //this query url searches giphy for whatever gifs tagged with whatever "tag" is
  queryURL =
    "https://api.giphy.com/v1/gifs/random?api_key=YH4MrA2S7hO4bt490OPWcfMSS4SQUtl1&tag=" +
    tag;

  //ajax call for gifs
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    //this builds an image and sets the source to be the url in the response
    $("#gif").html($("<img>").attr("src", response.data.images.original.url));
  }); //closing bracket for retrieveGif ajax call
} //closing bracket for retrieveGif function

// spoonacular function:
function getRecipe(tag) {
  var queryURL =
    "https://api.spoonacular.com/recipes/search?query=" +
    tag +
    "&number1&apiKey=c30cd056ba1c4e459950da3b71b83d82";

  //ajax call for recipe
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {

    // generates a number between 1 and 10
    var random = Math.floor(Math.random() * 9) + 1;

    // create a url link to the address in the returned object
    var recipeLink = $("<a>").attr("href", response.results[random].sourceUrl);
    recipeLink.text(response.results[random].title);

    // empty the #recipe div and append the new link to it
    $("#recipe").append(recipeLink);
    $("#recipe").append("<br>");

    var currentRecipe = response.results[random].id;

    var recipePicture = `https://spoonacular.com/recipeImages/${currentRecipe}-556x370.jpg`;

    $("#recipe").append($("<img>").attr("src", recipePicture));

    // create a function to get the ingredients, with a second ajax call
    function getIngredients() {
      //create a variable for our ingredientQuery url
      var ingredientQuery = `https://api.spoonacular.com/recipes/${currentRecipe}/ingredientWidget.json?apiKey=c30cd056ba1c4e459950da3b71b83d82`;

      //second ajax function for ingredients:
      $.ajax({
        url: ingredientQuery,
        method: "GET",
      }).then(function (response) {

        // make an li to append each ingredient and its amount and image
        response.ingredients.forEach((element) => {
          var li = $("<li>").append(
            $("<span>").text(
              element.name +
                ":" +
                "   " +
                element.amount.us.value +
                "   " +
                element.amount.us.unit
            ),

            $("<img>").attr(
              "src",
              `https://spoonacular.com/cdn/ingredients_100x100/${element.image}`
            )
          );
          $("#recipe").append(li);
        });
      });
    } //closing bracket for getIngredients function

    //invoke getIngredients function as a step in the getRecipe function
    getIngredients();
  }); //closing bracket for getRecipe function's ajax call
} //closing bracket for spoonacular function

//random fact function for mind button
function randomFact() {
  var queryURL = `https://uselessfacts.jsph.pl/random.json?language=en`;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    $("#gif").text(response.text);
  }); //closing bracket for ajax call
} //closing bracket for randomfact function

//youtube function
function youtubeVideo(tag) {
  var queryURL =
    "https://www.googleapis.com/youtube/v3/search?type=video&maxResults=25&q=" +
    tag +
    "&key=AIzaSyCgpNgJWhqC8iroTq5_Sbp53ulbGGbafzU";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    //this generates a random number between 1 and 25 - we don't need the for loop since we're only doing it once
    var random = Math.floor(Math.random() * 24) + 1;

    //this creates a variable from the video id of the youtube response, we could probably just put this directly into the queryURL code below.
    var videoID = response.items[random].id.videoId;

    $(
      "#youtube"
    ).html(`<iframe id="ytplayer" type="text/html" width="100%" height="360"
        src="https://www.youtube.com/embed/${videoID}?autoplay=1&origin=http://example.com"
        frameborder="0"></iframe>`);
  }); //closing bracket for youtube ajax call
} //closing bracket for youtubevideo function

//this is a global function that lets us select randomly from a given array
function getRandomValue(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//function to display gifs in sidebar
function sidebarGif(){

 var sideBarGifCategories = ["soothing", "satisfying", "funny"];
 var sideBarGifChoice = getRandomValue(sideBarGifCategories);

  queryURL =
`https://api.giphy.com/v1/gifs/random?api_key=YH4MrA2S7hO4bt490OPWcfMSS4SQUtl1&tag=${sideBarGifChoice}`;

//ajax call for gifs
$.ajax({
url: queryURL,
method: "GET",
}).then(function (response) {
//this builds an image and sets the source to be the url in the response
$("#sidebarImage").html($("<img>").attr("src", response.data.images.original.url));
}); //closing bracket for sidebar gif ajax call
}; //closing bracket for sidebar gif

// these categories add randomization to our content buttons
var videoCategories = ["exercise", "yoga", "meditation"];
var bodyVideoCategories = ["excercise", "fitness", "health", "yoga"]
var mindVideoCategories = ["educational", "learning", "science", "space", "history", "standup"]
var soulVideoCategories = ["nature", "relaxing", "satisfying", "cute"]

var bodyRecipes = ["healthy", "fruit", "vegetable"]
var soulRecipes = ["comfort", "ice cream", "easy", "simple"]

var bodyGifs = ["exercise", "fitness", "sports", "active"]
var mindGifs = ["science", "weird", "mindblowing", "space", "timelapse"]
var soulGifs = ["cute", "sunset", "bunny", "kitten", "nature"]

$("#body").on("click", function () {
  $("#sidebarImage").empty();
  sidebarGif();
  $("#backgroundImage").empty();
  $("#recipe").empty();
  $("#gif").empty();
  $("#youtube").empty();
    var options = ["spoonacular", "youtube", "gif"];
    var contentType = getRandomValue(options);
    
    if (contentType === "spoonacular") {
        random = getRandomValue(bodyRecipes);
        getRecipe(random)
    } else if (contentType === "youtube") {
      random = getRandomValue(bodyVideoCategories);
      youtubeVideo(random)
    } else {
      random = getRandomValue(bodyGifs);
      retrieveGif(random)
    };
  }); 
  
var gifCategories = ["satisfying", "funny", "soothing", "weird", "kitten", "koala"];

$("#mind").on("click", function () {
  $("#sidebarImage").empty();
  sidebarGif();
  $("#backgroundImage").empty();
  $("#recipe").empty();
  $("#gif").empty();
  $("#youtube").empty();

  var options = ["fact", "video", "gif"];
  var contentType = getRandomValue(options);

  if (contentType === "fact") {
    randomFact();
  } else if (contentType === "video") {
    random = getRandomValue(mindVideoCategories);
    youtubeVideo(random);
  } else {
    random = getRandomValue(mindGifs);
    retrieveGif(random)
  }
});

var recipe = ["healthy", "simple", "comfort"];

$("#soul").on("click", function () {
  $("#sidebarImage").empty();
  sidebarGif();
  $("#backgroundImage").empty();
  $("#recipe").empty();
  $("#gif").empty();
  $("#youtube").empty();

  var options = ["recipe", "video", "gif"];
  var contentType = getRandomValue(options);

  if (contentType === "recipe") {
    random = getRandomValue(soulRecipes);
    getRecipe(random);
  } else if (contentType === "video") {
    random = getRandomValue(soulVideoCategories);
    youtubeVideo(random)
  } else {
    random = getRandomValue(soulGifs);
    retrieveGif(random)
  };

});

$("#auto").on("click", function () {
  $("#sidebarImage").empty();
  sidebarGif();
  $("#backgroundImage").empty();
  $("#recipe").empty();
  $("#gif").empty();
  $("#youtube").empty();

  var contentType = ["recipe", "video", "fact", "gif"];
  var choice = getRandomValue(contentType);

  if (choice === "video") {
    youtubeVideo("exercise");
  } else if (choice === "fact") {
    randomFact();
  } else if (choice === "recipe") {
    random = getRandomValue(bodyRecipes)
    getRecipe(random);
  } else {
    retrieveGif("random")
  };
});

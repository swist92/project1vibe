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
  }); //closing bracket for soothinggif ajax call
} //closing bracket for soothingGif function

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
    //see what information you can get from this api, make divs to display them to, append them to the target element one by one
    console.log(response);

    var random = Math.floor(Math.random() * 9) + 1;

    //create a url link to the address in the returned object
    var recipeLink = $("<a>").attr("href", response.results[random].sourceUrl);
    recipeLink.text(response.results[random].title);

    //empty the #recipe div and append the new link to it
    $("#recipe").append(recipeLink);
    $("#recipe").append("<br>");

    var currentRecipe = response.results[random].id;

    var recipePicture = `https://spoonacular.com/recipeImages/${currentRecipe}-556x370.jpg`;

    $("#recipe").append($("<img>").attr("src", recipePicture));

    //create a function to get the ingredients, with a second ajax call (probably don't have to use localstorage since it will be able to look outward)
    function getIngredients() {
      //create a variable for our ingredientQuery url
      var ingredientQuery = `https://api.spoonacular.com/recipes/${currentRecipe}/ingredientWidget.json?apiKey=c30cd056ba1c4e459950da3b71b83d82`;

      //second ajax function for ingredients:
      $.ajax({
        url: ingredientQuery,
        method: "GET",
      }).then(function (response) {
        //console.log(response)

        //STEP: make a for each function that creates a UL(?) for each of the items in the response using their name and picture

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

    console.log(response);

    $(
      "#youtube"
    ).html(`<iframe id="ytplayer" type="text/html" width="100%" height="600px"
        src="https://www.youtube.com/embed/${videoID}?autoplay=1&origin=http://example.com"
        frameborder="0"></iframe>`);
  }); //closing bracket for youtube ajax call
} //closing bracket for youtubevideo function

//this is a global function that lets us select randomly from a given array
function getRandomValue(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

var videoCategories = ["exercise", "yoga", "meditation"];

$("#body").on("click", function(){
  $("#backgroundImage").empty();
  $("#recipe").empty();
  $("#gif").empty();
  $("#youtube").empty();
    var options = ["spoonacular", "youtube"];
    var contentType = getRandomValue(options);
    
    if (contentType === "spoonacular") {
        random = getRandomValue(recipe);
        getRecipe(random)
    } else {
        random = getRandomValue(videoCategories);
        youtubeVideo(random)
    };
}); 

var gifCategories = ["satisfying", "funny", "soothing"];

$("#mind").on("click", function(){
  $("#backgroundImage").empty();
  $("#recipe").empty();
  $("#gif").empty();
  $("#youtube").empty();

    var options = ["fact", "video"];
    var contentType = getRandomValue(options);

    if (contentType === "fact") {
        randomFact()
    } else {
        random=getRandomValue(videoCategories);
        youtubeVideo(random)
    };
    
});

var recipe = ["healthy", "simple", "comfort"];

$("#soul").on("click", function () {
  $("#recipe").empty();
  $("#gif").empty();
  $("#youtube").empty();
  random = getRandomValue(recipe);
  getRecipe(random);
});

$("#auto").on("click", function () {
  $("#backgroundImage").empty();
  $("#recipe").empty();
  $("#gif").empty();
  $("#youtube").empty();

  var contentType = ["body", "mind", "soul"];
  var choice = getRandomValue(contentType);

  if (contentType === "body") {
    youtubeVideo("exercise");
  } else if (contentType === "mind") {
    randomFact();
  } else {
    getRecipe();
  }
});

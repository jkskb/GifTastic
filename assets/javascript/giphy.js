var cities = ["Chicago", "Cairo", "London", "New York", "Melbourne", "Mexico City", "Montevideo", "San Francisco", "Houston", "Paris", "Moscow", "Tokyo"];

function buttonList(){ 
	$('#buttonsView').empty();

	for (var i = 0; i < cities.length; i++){
		var btn = $('<button>') 
		btn.attr('city-name', cities[i]);
        btn.text(cities[i]);
        btn.addClass('city');
        $('#buttonsView').append(btn);
        
	}
}

$("#addCity").on("click", function(){
	var city = $("#input").val().trim();
	cities.push(city);
	buttonList();
    return false; 
    
})

function showGiphys(){
	var city = $(this).attr("city-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + city + "&api_key=dTRoPc7MYR9Y33m3OJo8DvZP5j5nDbk6&limit=10";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        console.log(response.data);

        var results = response.data;
        for (var i = 0; i < results.length; i++) {

            var giphyDiv = $('<div class=giphy>');
            var showGif = $('<img>');
            var rating = results[i].rating;
            var p = $('<p>').text('rating: ' + rating);

            showGif.attr('src', results[i].images.fixed_height_still.url);
            showGif.attr('data-still', results[i].images.fixed_height_still.url);
            showGif.attr('data-state', 'still');
            showGif.addClass('gif');
            showGif.attr('data-animate', results[i].images.fixed_height.url);

            giphyDiv.append(showGif)
            giphyDiv.append(p)

            $("#giphy").prepend(giphyDiv);

        }   
    });
}

$(document).on("click", ".city", showGiphys);

buttonList();

$(document).on('click', '.gif', function(){
	var state = $(this).attr('data-state');
		if (state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');

        };
});
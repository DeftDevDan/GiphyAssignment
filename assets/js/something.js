window.onload=start;
var topics = ["Tyrion Lannister", "Daenerys Targaryen", "Rick and Morty", "Doctor Who"];

function start() {
	for (var i = 0; i < topics.length; i++) {
		var btn = $("<button>");
		btn.attr("data-name", topics[i]);
		btn.text(topics[i]);
		$("#top").append(btn);
	}
}

$("#top").on("click", "button", function() {
	$("#images").empty();
	imageLoad($(this).attr("data-name"));
});

$("#search-submit").on("click", function(event) {
	event.preventDefault();
	$("#images").empty();
	imageLoad($("#search-input").val().trim());
});

function imageLoad(look) {
	publicKey = "&api_key=dc6zaTOxFJmzC&limit=10";
	queryURL = "http://api.giphy.com/v1/gifs/search?q=" + look + publicKey;

	$.ajax({
		url:queryURL,
		method: "GET"
	}).done(function(response) {
		var results = response.data;
		for (var i = 0; i < 10; i++) {
			var gifDiv = $("<div class='xD'>");
			var p = $("<p>").text("Rating: " + results[i].rating);
			var image = $("<img>");
			image.attr("src", results[i].images.fixed_height_still.url);
			image.attr("data-state", "still");
			image.attr("data-still", results[i].images.fixed_height_still.url);
			image.attr("data-animate", results[i].images.fixed_height.url);
			$(image).addClass("gif");
			gifDiv.prepend(p);
			gifDiv.prepend(image);
			$("#images").prepend(gifDiv);
		}
	});
}

$("#images").on("click", "img", function() {
	imageClick(this);
});

function imageClick(x) {
	var state = $(x).attr("data-state");
	if(state === "still") {
		$(x).attr("src", $(x).attr("data-animate"));
		$(x).attr("data-state", "animate");
	} else {
		$(x).attr("src", $(x).attr("data-still"));
		$(x).attr("data-state", "still");
	}
}
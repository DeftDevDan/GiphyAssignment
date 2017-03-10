window.onload=start;

var topics = ["Tyrion Lannister", "Daenerys Targaryen", "Rick and Morty", "Doctor Who", "Mr. Robot", "Dexter", "Harambe"];
var picNum = 0;
var results;

function start() {
	for (var i = 0; i < topics.length; i++) {
		addButton(topics[i]);
	}
	$("#playPause").hide();
}

function addButton(i) {
	var btn = $("<button>");
	btn.attr("data-name", i);
	btn.text(i);
	$(btn).addClass("gifBtn");
	$("#top").append(btn);
}

function imageLoad(look) {
	publicKey = "&api_key=dc6zaTOxFJmzC";
	queryURL = "https://api.giphy.com/v1/gifs/search?q=" + look + publicKey;

	$.ajax({
		url:queryURL,
		method: "GET"
	}).done(function(response) {
		results = response.data;
		
		load();
	});
}

function load() {
	$("#playPause").show();
	for (var i = 0; i < 10; i++) {
		var gifDiv = $("<div class='xD'>");
		var p = $("<p>").text("Rating: " + results[picNum].rating);
		var image = $("<img>");
		image.attr("src", results[picNum].images.fixed_height_still.url);
		image.attr("data-state", "still");
		image.attr("data-still", results[picNum].images.fixed_height_still.url);
		image.attr("data-animate", results[picNum].images.fixed_height.url);
		$(image).addClass("gif");
		gifDiv.prepend(p);
		gifDiv.prepend(image);
		$("#images").prepend(gifDiv);
		picNum++;
	}
}

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

function playAll() {
	$(".gif").each(function() {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	});
}

function stopAll() {
	$(".gif").each(function() {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	});
}

$("#top").on("click", "button", function() {
	picNum = 0;
	$("#images").empty();
	imageLoad($(this).attr("data-name"));
});

$("#search-submit").on("click", function(event) {
	event.preventDefault();
	if($("#search-input").val().trim() !== "") {
		picNum = 0;
		$("#images").empty();
		var search = $("#search-input").val().trim();
		imageLoad(search);
		if (topics.indexOf(search) === -1) {
			addButton(search);
		}
		topics.push(search);
		$("#search-input").val("");
	}
});

$("#images").on("click", "img", function() {
	imageClick(this);
});
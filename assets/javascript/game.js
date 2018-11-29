var giphys = ["Cats", "Dogs", "Ducks", "Goats"];
$(document).on('click', ".giphy", function () {
    var currentsearchTerm = $(this).attr("data-name");
    renderImage(currentsearchTerm);
})
function renderButtons() {
    $("#giphys-view").empty();
    for (var i = 0; i < giphys.length; i++) {
        var a = $("<button>");
        a.addClass("giphy");
        a.attr("data-name", giphys[i]);
        a.text(giphys[i]);
        $("#giphys-view").append(a);
    }
};
renderButtons();

function renderImage(queryTerm) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + queryTerm + "&api_key=N6gs90gKX9P7ojEA7ntmVRazPb8AYr1u&limit=10"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (data, err) {
        $('#images-view').empty();
        for
        (var i = 0; i < data.data.length; i++) {
            var gifImage = data.data[i].images.fixed_height.url;
            var stillImage = data.data[i].images.fixed_height_still.url;
            var rating = data.data[i].rating;

            var newHtml = `
                <div>
                <img src="${stillImage}" data-state="still" data-gif="${gifImage}" data-still="${stillImage}" alt="giphy">
                <p>Rating: ${rating}</p>
                </div>
                `;
            $("#images-view").append(newHtml);
        };
    });
}

$("#images-view").on("click", 'img', function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-gif"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});
$("#add-giphy").on("click", function (event) {
    event.preventDefault();
    var giph = $("#word-input").val().trim();
    giphys.push(giph);
    renderButtons();
});
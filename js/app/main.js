var access_token = "144091361.2ddec0d.ecaaf1fd29fc447382d0ee17a7ac3c3f";
var resolution = "thumbnail"; // resolution: low_resolution, thumbnail, standard_resolution
var user_id = "144091361"; //userid
var last_url = "";
var start_url = "https://api.instagram.com/v1/users/" + user_id + "/media/recent/?count=10&access_token=" + access_token;

function loadimage(next_url) {
	url = next_url;
	$(function() {
		$.ajax({
			type: "GET",
			dataType: "jsonp",
			cache: false,
			url: url,
			success: function(data) {
				next_url = data.pagination.next_url;
				count = data.data.length;
				drinking = false;
				for (var i = 0; i < count; i++) {
					if (typeof data.data[i] !== 'undefined') {
						var photo = data.data[i];
						console.log(photo);
						if (data.data[i].location.name) {
							drinking = true;
							$("#instagram").append("<h1>" + data.data[i].location.name + "</h1><div class='instagram-wrap' id='pic-" + data.data[i].id + "' ><a target='_blank' href='" + data.data[i].link + "'><img class='instagram-image' src='" + data.data[i].images.low_resolution.url + "' /></a></div>");
							$("#instagram").append("<a target='_blank' href='https://www.google.co.uk/maps/@" + photo.location.latitude + "," + photo.location.longitude + ",17z'><img src='http://maps.googleapis.com/maps/api/staticmap?center=" + photo.location.latitude + "," + photo.location.longitude + "&zoom=16&size=306x306&sensor=false&markers=color:blue%7Clabel:o%7C" + photo.location.latitude + "," + photo.location.longitude + "'></a>");
						}
					}
				}
				if (!drinking) $("#instagram").append("<h1>Nowhere :(</h1>");
			}
		});
	});
}


$(document).ready(function() {
	loadimage(start_url);
});
var rtm = {
	getThemeList: function(url) {
		$.getJSON("")
	},
	loadTheme: function(url, name) {
		$('head').append('<link id="rtm-' + name + '-theme" rel="stylesheet" href="' + url + '" />');
	},
	loadThemeList: function(localstorage) {

	},
	loadThemeUrl: function(url, shouldsave) {

	},
	addMenuItem: function(onclick, id, text) {
        $('#rtm-sect-t').append('<div class="rsrow" onclick="' + onclick + '"><div class="rscol-md-12 truncate"><div id="' + id + '" class="rcs item"><i class="icon icon-check-blue"></i><span>' + text + '</span></div></div></div>');
    },
	on: function() {
		// Create the menu section
		$('#rcs-menu-t').after('<div class="group" id="rtm-sect"><span>Radiant Theme Manager</span></div>');
		$('#rtm-sect').after('<div id="rtm-sect-t"></div>');
		// Everything we append should go here

		rtm.addMenuItem('alert("test");', 'testMenuItem', 'TestMenuItem');

		// Credits and version
	}
};

setTimeout(function() {
	rtm.on();
}, 500);

//https://csxking.me/nce/THEME.css
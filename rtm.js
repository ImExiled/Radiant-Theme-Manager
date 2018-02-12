var rtm = {
	loadTheme: function(url, name) {
		$("<link/>", {
   			rel: "stylesheet",
   			type: "text/css",
   			id: "rtm-theme-" + name,
   			href: url
		}).appendTo("head");
	},
	loadThemeUrl: function(url, shouldsave) {

	},
	addMenuItem: function(theme, id, text) {
        $('#rtm-sect-t').append('<a id="' + id + '" href="javascript:rtm.loadTheme(' + "'" + theme + "'" + ')"><div class="rsrow""><div class="rscol-md-12 truncate"><div class="rcs item"><i class="icon icon-check-blue"></i><span>' + text + '</span></div></div></div></a>');
    },
    getThemeList: function(url) {
		$.getJSON(url, function(data) {
			$.each(data, function(key, value) {
				rtm.addMenuItem(value, key, key);
				console.warn(':::: ' + value + "::::");
			});
		});
	},
	on: function() {
		// Create the menu section
		$('#rcs-menu-t').after('<div class="group" id="rtm-sect"><span>Radiant Theme Manager</span></div>');
		$('#rtm-sect').after('<div id="rtm-sect-t"></div>');

		// Everything we append should go here
		rtm.getThemeList('https://rawgit.com/bentenz5/Radiant-Theme-Manager/master/themes.json');
		
		// Credits and version
		rtm.addMenuItem('', 'rtm-credits', 'Made by CSxKING.');
		rtm.addMenuItem('', 'rtm-credits-rcs', 'RCS by Radiant, whos team includes xBytez.');
	}
};


//https://csxking.me/nce/THEME.css
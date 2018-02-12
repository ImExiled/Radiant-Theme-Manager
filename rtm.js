var rtm = {
	loadTheme: function(url, name) {
		$("<link/>", {
   			rel: "stylesheet",
   			type: "text/css",
   			id: "rtm-theme-" + name,
   			class: "rtm-theme",
   			href: url
		}).appendTo("head");
		$('#' + name + '-theme-btn > .rcs.item').attr('disabled');
	},
	loadThemeUrl: function(url, shouldsave) {

	},
	addThemeItem: function(theme, id, text) {
        $('#rtm-sect-t').append('<a id="' + id + '" href="javascript:rtm.loadTheme(' + "'" + theme + "', '" + text + "'" + ')"><div class="rsrow""><div class="rscol-md-12 truncate"><div class="rcs item"><i class="icon icon-check-blue"></i><span>' + text + '</span></div></div></div></a>');
    },
    addMenuItem: function(content, text, id) {
        $('#rtm-sect-t').append('<a id="' + id + '" href="' + content + '"><div class="rsrow""><div class="rscol-md-12 truncate"><div class="rcs item"><i class="icon icon-check-blue"></i><span>' + text + '</span></div></div></div></a>');
    },
    getThemeList: function(url) {
		$.getJSON(url, function(data) {
			$.each(data, function(key, value) {
				rtm.addThemeItem(value, key + "-theme-btn", key);
				console.warn(':::: ' + value + "::::");
			});
		});
	},
	disableThemes: function() {
		setTimeout(function() {
			$('.rtm-theme').remove();
		}, 500)
	},
	on: function() {
		// Append jQuert 3.3.1 because plug hates me.
		$('head').append('<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>');

		// Create the menu section
		$('#rs-external-site').before('<div class="group" id="rtm-sect"><span>Radiant Theme Manager</span></div>');
		$('#rtm-sect').after('<div id="rtm-sect-t"></div>');

		// Everything we append should go here
		rtm.addMenuItem('javascript:rtm.disableThemes();', 'Disable Themes', 'rtm-disable-btn');
		rtm.getThemeList('https://rawgit.com/bentenz5/Radiant-Theme-Manager/master/themes.json');

		// Credits and version
	}
};

rtm.on();

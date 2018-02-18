// Functions for cookies :3
// Note, I found these functions over on stackoverflow because i'm lazy ;p https://stackoverflow.com/questions/1458724/how-do-i-set-unset-a-cookie-with-jquery
function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function createCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

var rtmGotToSaved = {
	lists: [
		// links
	],
	names: [
		// names
	]
};


var rtm = {
	loadTheme: function(url, name) {
		if( $('#' + name + '-theme-btn > .rsrow > .truncate > .item').hasClass('selected') )  {
			$('#rtm-theme-' + name).remove();
			rtm.removeCheck('#' + name + '-theme-btn');

		} else {
			$("<link/>", {
   				rel: "stylesheet",
   				type: "text/css",
   				id: "rtm-theme-" + name,
   				class: "rtm-theme",
   				href: url
			}).appendTo("head");
			rtm.addCheck('#' + name + '-theme-btn');
		}
	},
	addThemeItem: function(theme, id, text) {
        $('#rtm-sect-t').append('<a id="' + id + '" href="javascript:rtm.loadTheme(' + "'" + theme + "', '" + text + "'" + ')"><div class="rsrow""><div class="rscol-md-12 truncate"><div class="rcs item"><i class="icon icon-check-blue"></i><span>' + text + '</span></div></div></div></a>');
    },
    addMenuItem: function(content, text, id) {
        $('#rtm-sect-t').append('<a id="' + id + '" href="' + content + '"><div class="rsrow""><div class="rscol-md-12 truncate"><div class="rcs item"><i class="icon icon-check-blue"></i><span>' + text + '</span></div></div></div></a>');
    },
    getThemeList: function(url) {
    	rtmGotToSaved.lists.push(url);
		$.getJSON(url, function(data) {
			$.each(data, function(key, value) {
				rtm.addThemeItem(value, key + "-theme-btn", key);
				rtmGotToSaved.names.push(key);
				console.warn(':::: ' + value + "::::");
			});
		});
	},
	installTheme: function() {
		var toInstall = prompt("Enter a URL to install", "https://rawgit.com/bentenz5/Radiant-Theme-Manager/master/themes.json");
		rtm.getThemeList(toInstall);
	},
	disableThemes: function() {
		setTimeout(function() {
			$('.rtm-theme').remove();
		}, 500)
	},
	addCheck: function(item) {
		$(item + ' > .rsrow > .truncate > .item').addClass('selected');
	},
	removeCheck: function(item) {
		$(item + ' > .rsrow > .truncate > .item').removeClass('selected');
	},
	loadSavedThemes: function() {
		// Load cookied themes

		var jsonToLoad = readCookie('rtmSaved');
		//var jsonToLoad = '{"lists":["https://rawgit.com/bentenz5/Radiant-Theme-Manager/master/themes.json"],"names":["NCE"]}';
		console.warn('Json Txt: ' + jsonToLoad);
		var parsedJson = JSON.parse(jsonToLoad);
		$.each(parsedJson.lists, function(data) {
			// Json files to render and load
			console.warn('Parsed: ' + parsedJson.lists[data]);
			rtm.getThemeList(parsedJson.lists[data]);
		});
		$.each(parsedJson.names, function(data) {
			setTimeout(function() {
			// Theme names
			console.warn('Parsed Names: ' + parsedJson.names[data]);
			var url = $('#' + parsedJson.names[data] + "-theme-btn").attr('href');
			window.location = url;
			}, 500);
		});

	},
	saveThemes: function() {
		document.cookie = "rtmSaved=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		var rtmToSave = JSON.stringify(rtmGotToSaved);
		console.warn(rtmToSave);
		document.cookie='rtmSaved=' + rtmToSave + "; expires=Fri, 18 Feb 2038 12:00:00 UTC; path=/";
		alert("Theme list saved!");

	},
	clearSavedThemes: function() {
		document.cookie = "rtmSaved=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		alert("Your themes cookie has been cleared and previously saved themes will no longer load on launch.");
	},
	on: function(themelistfile) {
		// Append jQuery 3.3.1 because plug hates me.
		$('head').append('<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>');

		// Create the menu section
		$('#rs-external-site').before('<div class="group" id="rtm-sect"><span>Radiant Theme Manager</span></div>');
		$('#rtm-sect').after('<div id="rtm-sect-t"></div>');

		// Everything we append should go here
		if( typeof themelistfile == 'undefined' ) {
			rtm.getThemeList('https://rawgit.com/bentenz5/Radiant-Theme-Manager/master/themes.json');
		} else {
			rtm.getThemeList(themelistfile);
		}
		rtm.addMenuItem('javascript:rtm.saveThemes();', 'Save Theme List', 'rtm-save-themes-btn');
		$('#chat-messages').append('<div class="cm rsshit sml message rs-log-green" id="rcs-1518950671516"><div class="badge-box"></div><div class="msg"><div class="from"><span class="timestamp" style="display: inline;">NA:NA</span></div><div class="text">RTM Loaded!</div></div><div class="rcs-delete" style="display: none;">Hide</div></div>');

		// Credits and version
	},
	onSaved: function() {
		// If loading saved...
		
		// Append jQuery 3.3.1 because plug hates me.
		$('head').append('<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>');

		// Create the menu section
		$('#rs-external-site').before('<div class="group" id="rtm-sect"><span>Radiant Theme Manager</span></div>');
		$('#rtm-sect').after('<div id="rtm-sect-t"></div>');

		// Everything we append should go here
		rtm.loadSavedThemes();
		rtm.addMenuItem('javascript:rtm.clearSavedThemes();', 'Clear Saved Themes', 'rtm-clear-saved-btn');
		rtm.addMenuItem('javascript:rtm.saveThemes();', 'Save Theme List', 'rtm-save-themes-btn');

		$('#chat-messages').append('<div class="cm rsshit sml message rs-log-green" id="rcs-1518950671516"><div class="badge-box"></div><div class="msg"><div class="from"><span class="timestamp" style="display: inline;">NA:NA</span></div><div class="text">RTM Loaded!</div></div><div class="rcs-delete" style="display: none;">Hide</div></div>');

		// Credits and version
	},
	init: function() {
		// This function serves to check for when RCS has fully loaded. Once it has, RTM will load.
		if( $('#rcs-appright-button').length ) {
			// rcs.loading == false

			if( readCookie('rtmSaved') == null || readCookie('rtmSaved') == "" ) {
				rtm.on();
			} else {
				rtm.onSaved();
			}
		} else {
			console.error('RTM failed to load because RCS is not running. Retrying in 10 seconds...');
			$('#chat-messages').append('<div class="cm rsshit sml message rs-log-red" id="rcs-1518950671516"><div class="badge-box"></div><div class="msg"><div class="from"><span class="timestamp" style="display: inline;">NA:NA</span></div><div class="text">RTM failed to load! Retrying in 10 seconds...</div></div><div class="rcs-delete" style="display: none;">Hide</div></div>');
			setTimeout(function() {
				rtm.init();
			}, 10000);
		}
	}
};


rtm.init();

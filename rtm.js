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
	addCheck: function(item) {
		$(item + ' > .rsrow > .truncate > .item').addClass('selected');
	},
	removeCheck: function(item) {
		$(item + ' > .rsrow > .truncate > .item').removeClass('selected');
	},
	on: function(themelistfile) {
		// Append jQuert 3.3.1 because plug hates me.
		$('head').append('<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>');

		// Create the menu section
		$('#rs-external-site').before('<div class="group" id="rtm-sect"><span>Radiant Theme Manager</span></div>');
		$('#rtm-sect').after('<div id="rtm-sect-t"></div>');

		// Everything we append should go here
		// 
		
		if( typeof themelistfile == 'undefined' ) {
			rtm.getThemeList('https://rawgit.com/bentenz5/Radiant-Theme-Manager/master/themes.json');
		} else {
			rtm.getThemeList(themelistfile);
		}

		$('#chat-messages').append('<div class="cm rsshit sml message rs-log-green" id="rcs-1518950671516"><div class="badge-box"></div><div class="msg"><div class="from"><span class="timestamp" style="display: inline;">NA:NA</span></div><div class="text">RTM Loaded!</div></div><div class="rcs-delete" style="display: none;">Hide</div></div>');

		// Credits and version
	},
	init: function() {
		// This function serves to check for when RCS has fully loaded. Once it has, RTM will load.
		if( $('#rcs-appright-button').length ) {
			// rcs.loading == false
			console.log('true');
			rtm.on();
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

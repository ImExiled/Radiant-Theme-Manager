# Radiant-Theme-Manager
A theme manager for Radiant Community Script (RCS) on Plug.dj.

To load, run RCS, then run this alongside it after it fully loads. (Via copy-paste or running through rawgit with a `$.getScript` etc)
Then in the chrome console, run `rtm.on();`

To load your own theme list, run `rtm.getThemeList('https://example.com/YourThemeListHere.json')`

Theme json files work simply. Make a theme file, put it somewhere where CORS wont get in the way and load it with the above command. Format below

```json
{
  "theme-name-here":"theme-link-here.css",
  "theme-name2-here":"theme-link2-here.css"
}
```

That should be it. Themes are written in CSS. Obviously.

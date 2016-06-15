Boiler Site
===========

This directory contains the primary boilerplate architecture for my projects.

What's in the box?
----

## Grunt file with basic tasks
- Run on local server 
- Watch
- Grunticon SVG generator with PNG fallbacks and SVG cleaner
- Copy files
- Clean files
- Build files
- Deploy to Github Pages

### Other Includes
  - Basic HTML5 file with boilerplate code
  - Initial Sass structure and resets
  - A few basic jquery/js helper snippets

Version
----

2.0

## Installation
` $ npm install `

## Use

### Watching and viewing on localhost
-In your terminal, run ` $ grunt ` in your project directory: 
-Navigate to `localhost:8000` to view your project.

### Deploying to gh-pages
- Run ` grunt deploy `
- View your app on your custom gh-pages URL

### Manually build icons
` grunt icons `

Tech
-----------

This boiler site takes its inspiration from these places and uses this technology:

* [Normalize] - a basic CSS reset file
* [jQuery] - it's jQuery
* [GH-Pages] - Github pages is an extremely easy way to host your project

License
----

MIT

[Normalize]:https://necolas.github.io/normalize.css/
[jQuery]:http://jquery.com
[GH-Pages]:https://pages.github.com/

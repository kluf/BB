browserify ./app/main > ./static/bundle.js

jst------
browserify ./app/main.js -t jstify > static/bundle.js

eco------
browserify ./app/main.js -t browserify-eco > static/bundle.js

handlebards------
browserify ./app/main.js -t browserify-handlebars > static/bundle.js
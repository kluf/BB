var App = App || {};

window.onload = function() {
    (function App () {

        var menu = document.querySelector('.menu');

        function hasClass(element, klass) {
            var klasses = element.className.split(' ');
            if (klasses.indexOf(klass) === -1) {
                return false;
            }
            return true;
        }

        function removeClass(element, klass) {
            var klasses = element.className.split(' ');
            delete klasses[klasses.indexOf(klass)];
            element.className = klasses.join(' ');
        }

        function addClass(element, klass) {
            element.className += ' ' + klass;
        }

        function toggleClass(element, klass, event) {
            if (hasClass(element, klass)) {
                removeClass(element, klass);
            } else {
                addClass(element, klass);
            }
        }

        function toggleMenu(event) {
            toggleClass(menu, 'display', event);
        }
        menu.addEventListener('click', toggleMenu);

    }());
}
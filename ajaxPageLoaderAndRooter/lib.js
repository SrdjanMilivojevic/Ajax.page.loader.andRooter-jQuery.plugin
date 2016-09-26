// This script implements simple routing by loading partial
// HTML files named corresponding to view identifiers.

/**
 * @class Application
 * @constructor  object settings [private property]
 */
function Application (settings) {

    /**
     * The downloaded view partials will be stored here.
     *
     * @var private
     */
     var viewsCache = {};

    /**
     * Updates dynamic content based on the view identifier.
     *
     * @method public
     */
    this.render = function () {
        // Fetch the view identifier.
        var view = window.location.hash;
        // If location.hash is undentified,
        // set the default view identifier.
        if (! view) {
            view = 'home';
        } else {
            // Isolate the view identifier using substr.
            // This gets rid of the "#" character.
            view = view.substr(1);
        }
        // Set the adjusted div innerHTML based on the view identifier.
        _getContent(view, settings.pathToIncludes, function (content) {
            $(settings.contentSelector).html(content);
        });
        // Toggle the "active" class on the link currently navigated to.
        _setActiveLink(view, settings.navLinkSelector);
    };

    /**
     * Gets the appropriate content for the given view identifier.
     * This method implements a simple cache.
     *
     * @method private
     * @param  string view [name of the view file]
     * @param  string pathToIncludes
     * @param  closure callback
     */
    var _getContent = function (view, pathToIncludes, callback) {
        // If the page has been fetched before,
        if(viewsCache[view]) {
            // pass the previously fetched content to the callback.
            callback(viewsCache[view]);
        } else {
            // If the page has not been fetched before, fetch it.
            $.get(pathToIncludes + '/' + view + '.html', function (content) {
                // Store the fetched content in the cache.
                viewsCache[view] = content;
                // Pass the newly fetched content to the callback.
                callback(content);
            })
            // If reqested page is not found, show the landing page instead.
            .fail(function() {
                window.location.href = '';
            });
        }
    };

    /**
     * Sets the "active" class on the active navigation link.
     *
     * @method private
     * @param  string view
     * @param  string navLinkSelector
     */
    var _setActiveLink = function (view, navLinkSelector) {
        // Loop trough each link.
        $(navLinkSelector).each(function (i, linkElement) {
            // Save the element; no need to select it via jQuery every time.
            var link = $(linkElement),
                pageName = link.attr("href").substr(1);
            // Find the match.
            if (pageName === view) {
                // Add class="active".
                link.attr("class", "active");
            } else {
                // Remove class if it doesn't match.
                link.removeAttr("class");
            }
        });
    };
}

function aplrNavigate (settings) {
    // Make the application object.
    var app = new Application(settings);
    // Render the view, once, to the initial view identifier.
    app.render();
    // Render the view whenever the view identifier value changes.
    $(window).bind('hashchange', app.render);
}

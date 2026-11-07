define([], function () {
    'use strict';

    return function (Preview) {
        /**
         * Keep the stage free of the accordion widget. In the admin it is built on the backend tabs widget, which
         * takes the Page Builder option menu of the first FAQ item as its tab list and loads its links by AJAX.
         */
        Preview.prototype.initializeAccordionWidget = function () {};

        return Preview;
    };
});

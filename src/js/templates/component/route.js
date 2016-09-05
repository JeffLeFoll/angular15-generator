'use strict';

exports.routeTemplate = function (name) {

  return `

${name}Route.$inject = ['$routeProvider', '$locationProvider'];
export function ${name}Route($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider) {
    $routeProvider
        .when('/${name}', {
            template: '<${name}></${name}>'
        });

    $locationProvider.html5Mode(true);
}
`
};
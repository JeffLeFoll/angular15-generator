'use strict';

exports.routeTemplate = function (capitalizedName, lowerCaseName) {

  return `
${capitalizedName}Route.$inject = ['$routeProvider', '$locationProvider'];
export function ${capitalizedName}Route($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider) {
    $routeProvider
        .when('/${lowerCaseName}', {
            template: '<${lowerCaseName}></${lowerCaseName}>'
        });

    $locationProvider.html5Mode(true);
}
`
};
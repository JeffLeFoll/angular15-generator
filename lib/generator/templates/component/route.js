'use strict';

let StringUtil = require('../../../utils/stringUtil');

exports.routeTemplate = function (name) {

  let capitalizedName = StringUtil.capitalizeFirstLetter(name);

  return `
${capitalizedName}Route.$inject = ['$routeProvider', '$locationProvider'];
export function ${capitalizedName}Route($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider) {
    $routeProvider
        .when('/${name}', {
            template: '<${name}></${name}>'
        });

    $locationProvider.html5Mode(true);
}
`
};
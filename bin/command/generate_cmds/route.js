exports.command = 'route <name>';
exports.desc = 'Generate a route component named <name>';
exports.builder = {};
exports.handler = function (argv) {
  console.log('generate route %s, argv.name');
};
exports.command = 'component <name>';
exports.desc = 'Generate a component named <name>';
exports.builder = {};
exports.handler = function (argv) {
  console.log('generate component %s, argv.name');
};
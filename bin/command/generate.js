exports.command = 'g <command>';
exports.desc = 'Generate [component|route]';
exports.builder = function (yargs) {
  return yargs.commandDir('generate_cmds');
};
exports.handler = function (argv) {};
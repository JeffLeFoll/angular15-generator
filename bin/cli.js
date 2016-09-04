#! /usr/bin/env node




require('yargs')
  .commandDir('command')
  .demand(1)
  .help()
  .argv


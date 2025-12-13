#!/usr/bin/env node

const { Command } = require('commander');
const package = require('../package.json');

const program = new Command();

program
  .name('nepali-calendar')
  .description('Add Nepali Calendar components to your project')
  .version(package.version);

program
  .command('init')
  .description('Initialize nepali-calendar in your project')
  .action(async () => {
    const { initCommand } = require('../lib/commands/init');
    await initCommand();
  });

program
  .command('add [component]')
  .description('Add a calendar component to your project')
  .action(async (component) => {
    const { addCommand } = require('../lib/commands/add');
    await addCommand(component);
  });

program.parse(process.argv);

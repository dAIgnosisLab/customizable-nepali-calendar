const fs = require('fs-extra');
const path = require('path');
const prompts = require('prompts');
const chalk = require('chalk');
const ora = require('ora');

async function initCommand() {
  console.log(chalk.bold.cyan('\n🗓️  Nepali Calendar CLI\n'));

  const response = await prompts([
    {
      type: 'text',
      name: 'componentsPath',
      message: 'Where should we install the calendar components?',
      initial: 'src/components/nepali-calendar',
    },
    {
      type: 'text',
      name: 'dataPath',
      message: 'Where should we install the calendar data?',
      initial: 'src/data/nepali-calendar',
    },
    {
      type: 'text',
      name: 'stylesPath',
      message: 'Where should we install the calendar styles?',
      initial: 'src/styles',
    },
  ]);

  if (!response.componentsPath) {
    console.log(chalk.red('\n❌ Installation cancelled.\n'));
    process.exit(0);
  }

  const spinner = ora('Creating configuration...').start();

  // Create config file
  const config = {
    componentsPath: response.componentsPath,
    dataPath: response.dataPath,
    stylesPath: response.stylesPath,
  };

  const configPath = path.join(process.cwd(), 'nepali-calendar.json');
  await fs.writeJSON(configPath, config, { spaces: 2 });

  spinner.succeed('Configuration created');

  console.log(chalk.green('\n✅ Successfully initialized!\n'));
  console.log(chalk.dim('Next steps:'));
  console.log(chalk.dim('  Run: npx nepali-calendar add calendar\n'));
}

module.exports = { initCommand };

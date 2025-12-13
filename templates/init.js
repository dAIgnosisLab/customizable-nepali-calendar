const fs = require('fs-extra');
const path = require('path');
const prompts = require('prompts');
const chalk = require('chalk');
const ora = require('ora');

async function initCommand(options = {}) {
  console.log(chalk.bold.cyan('\n🗓️  Nepali Calendar CLI\n'));

  // If provided programmatically, skip prompts
  if (options.componentsPath && options.dataPath && options.stylesPath) {
    return createConfig(options.componentsPath, options.dataPath, options.stylesPath);
  }

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
    console.log(chalk.dim('\nUsing default paths...\n'));
    return createConfig(
      'src/components/nepali-calendar',
      'src/data/nepali-calendar',
      'src/styles'
    );
  }

  return createConfig(response.componentsPath, response.dataPath, response.stylesPath);
}

async function createConfig(componentsPath, dataPath, stylesPath) {
  const spinner = ora('Creating configuration...').start();

  const config = {
    componentsPath,
    dataPath,
    stylesPath,
  };

  const configPath = path.join(process.cwd(), 'nepali-calendar.json');
  await fs.writeJSON(configPath, config, { spaces: 2 });

  spinner.succeed('Configuration created');

  console.log(chalk.green('\n✅ Successfully initialized!\n'));
  console.log(chalk.dim('Next steps:'));
  console.log(chalk.dim(`  Run: npx nepali-calendar add calendar\n`));
}

module.exports = { initCommand };

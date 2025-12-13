// # 1. Already linked (done)
// cd /Users/apurbakoirala/dAIgnosis/customizable-nepali-calendar
// npm link

// # 2. Test in test-calendar-app (done)
// cd /Users/apurbakoirala/dAIgnosis/test-calendar-app
// # Config created manually, component added successfully

// # 3. Test in a real React app (do this)
// cd /Users/apurbakoirala/dAIgnosis
// npm create vite@latest my-test-app -- --template react
// cd my-test-app
// npm install
// npm link customizable-nepali-calendar
// npx nepali-calendar init    # Interactive prompts
// npx nepali-calendar add calendar
// npm run dev                  # Test the component

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');

const COMPONENTS = {
  calendar: {
    name: 'NepaliCalendar',
    description: 'Full-featured Nepali calendar component',
  },
};

async function addCommand(component) {
  if (!component) {
    console.log(chalk.yellow('\nAvailable components:\n'));
    Object.entries(COMPONENTS).forEach(([key, value]) => {
      console.log(chalk.cyan(`  ${key}`) + chalk.dim(` - ${value.description}`));
    });
    console.log(chalk.dim('\nUsage: npx nepali-calendar add [component]\n'));
    return;
  }

  if (!COMPONENTS[component]) {
    console.log(chalk.red(`\n❌ Unknown component: ${component}\n`));
    return;
  }

  // Load config
  const configPath = path.join(process.cwd(), 'nepali-calendar.json');
  if (!fs.existsSync(configPath)) {
    console.log(chalk.red('\n❌ Configuration not found. Run: npx nepali-calendar init\n'));
    process.exit(1);
  }

  const config = await fs.readJSON(configPath);
  const spinner = ora('Installing calendar component...').start();

  try {
    const templateDir = path.join(__dirname, '../../templates');
    const targetDir = process.cwd();

    // Copy component files
    const componentSource = path.join(templateDir, 'components/NepaliCalendar');
    const componentTarget = path.join(targetDir, config.componentsPath);
    await fs.copy(componentSource, componentTarget);

    // Copy data files
    const dataSource = path.join(templateDir, 'data');
    const dataTarget = path.join(targetDir, config.dataPath);
    await fs.copy(dataSource, dataTarget);

    // Copy engine files
    const engineSource = path.join(templateDir, 'engine');
    const engineTarget = path.join(targetDir, config.componentsPath, 'engine');
    await fs.copy(engineSource, engineTarget);

    // Copy styles
    const stylesSource = path.join(templateDir, 'styles/calendar.css');
    const stylesTarget = path.join(targetDir, config.stylesPath, 'nepali-calendar.css');
    await fs.copy(stylesSource, stylesTarget);

    // Update import paths in the component
    await updateImportPaths(
      path.join(componentTarget, 'NepaliCalendar.jsx'),
      config
    );

    spinner.succeed('Calendar component installed');

    console.log(chalk.green('\n✅ Successfully added calendar component!\n'));
    console.log(chalk.dim('Import it in your project:'));
    console.log(chalk.cyan(`  import { NepaliCalendar } from '@/${config.componentsPath}/NepaliCalendar';\n`));
  } catch (error) {
    spinner.fail('Failed to install component');
    console.error(chalk.red('\n' + error.message + '\n'));
    process.exit(1);
  }
}

async function updateImportPaths(filePath, config) {
  let content = await fs.readFile(filePath, 'utf-8');

  // Calculate relative paths
  const componentDir = path.dirname(filePath);
  const dataRelative = path.relative(componentDir, path.join(process.cwd(), config.dataPath));
  const stylesRelative = path.relative(componentDir, path.join(process.cwd(), config.stylesPath));

  // Update imports
  content = content.replace(/from "\.\.\/\.\.\/data\//g, `from "${dataRelative}/`);
  content = content.replace(/from "\.\.\/\.\.\/engine\//g, `from "./engine/`);
  content = content.replace(/import "\.\.\/\.\.\/styles\/calendar\.css"/g, `import "${stylesRelative}/nepali-calendar.css"`);

  await fs.writeFile(filePath, content, 'utf-8');
}

module.exports = { addCommand };

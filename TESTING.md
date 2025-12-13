# Testing Guide for Customizable Nepali Calendar CLI

## Quick Test (Already Done ✅)

The CLI is working! Basic commands tested successfully.

## Full Workflow Test

### Step 1: Link Package Locally (Already Done)
```bash
cd /Users/apurbakoirala/dAIgnosis/customizable-nepali-calendar
npm link
```

### Step 2: Test in a New React Project

#### Option A: Manual Interactive Test
```bash
# 1. Create test directory
cd /Users/apurbakoirala/dAIgnosis/test-calendar-app

# 2. Run init (interactive prompts)
nepali-calendar init
# Press Enter to accept defaults:
# - src/components/nepali-calendar
# - src/data/nepali-calendar
# - src/styles

# 3. Add the calendar component
nepali-calendar add calendar

# 4. Verify files were created
ls -la src/components/nepali-calendar/
ls -la src/data/nepali-calendar/
ls -la src/styles/

# 5. Check the config file
cat nepali-calendar.json
```

#### Option B: Create a Full React App
```bash
# Using Vite (recommended)
npm create vite@latest my-calendar-test -- --template react
cd my-calendar-test
npm install
npm link customizable-nepali-calendar

# Initialize and add calendar
npx nepali-calendar init
npx nepali-calendar add calendar

# Update src/App.jsx to use the calendar
# Then run the app
npm run dev
```

### Step 3: Verify Installation

Check that these files exist:
```
test-calendar-app/
├── nepali-calendar.json          # Config file
├── src/
│   ├── components/
│   │   └── nepali-calendar/
│   │       ├── NepaliCalendar.jsx
│   │       └── engine/
│   │           ├── calendarEngine.js
│   │           └── annotationEngine.js
│   ├── data/
│   │   └── nepali-calendar/
│   │       ├── bsCalendar.js
│   │       ├── colorTokens.js
│   │       ├── dayAnnotations.js
│   │       ├── holidays.js
│   │       ├── locales.js
│   │       └── today.js
│   └── styles/
│       └── nepali-calendar.css
```

### Step 4: Test Component Import

Create `src/App.jsx`:
```jsx
import React from 'react';
import NepaliCalendar from './components/nepali-calendar/NepaliCalendar';
import './styles/nepali-calendar.css';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Nepali Calendar Test</h1>
      <NepaliCalendar
        width={400}
        height={450}
        initialYear={2081}
        initialMonth={0}
        language="ne"
      />
    </div>
  );
}

export default App;
```

## Test Checklist

- [x] CLI command available (`nepali-calendar --help`)
- [x] Version command works (`nepali-calendar --version`)
- [x] Add command lists components (`nepali-calendar add`)
- [ ] Init command creates config file
- [ ] Init command accepts custom paths
- [ ] Add command copies all files correctly
- [ ] Add command updates import paths
- [ ] Component files are valid JSX
- [ ] Data files are valid JavaScript
- [ ] CSS file is valid
- [ ] Component imports work in React app
- [ ] Calendar renders without errors
- [ ] Month navigation works
- [ ] Language switching works
- [ ] Annotations display correctly

## Common Issues to Check

### Issue: "Configuration not found"
**Solution:** Run `nepali-calendar init` first

### Issue: Import paths not working
**Check:** 
- Is `nepali-calendar.json` in project root?
- Are paths in config correct?
- Does your project use path aliases (@/...)?

### Issue: React not found
**Solution:** Install React: `npm install react react-dom`

## Clean Up After Testing

```bash
# Unlink the package
cd /Users/apurbakoirala/dAIgnosis/customizable-nepali-calendar
npm unlink

# Remove test directory
cd /Users/apurbakoirala/dAIgnosis
rm -rf test-calendar-app
```

## Before Publishing

1. Test on a fresh machine/container
2. Test with different React project structures (Vite, CRA, Next.js)
3. Verify all templates are included in npm package
4. Test with `npm pack` to see what files get published
5. Bump version appropriately
6. Update CHANGELOG.md

## Publishing

```bash
# Test what will be published
npm pack

# Check package contents
tar -tzf customizable-nepali-calendar-*.tgz

# Publish to npm
npm publish
```

## After Publishing

Test installation from npm:
```bash
npm install -g customizable-nepali-calendar
npx nepali-calendar --version
```

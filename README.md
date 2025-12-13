# Customizable Nepali Calendar

A shadcn-style CLI tool to add beautiful, customizable Nepali (Bikram Sambat) calendar components to your React project.

> **Copy. Paste. Customize.** Not a component library. Not a package. Just copy the code into your project and make it yours.

## Features

- 🗓️ **Full Nepali Calendar** - Complete Bikram Sambat calendar with accurate date calculations
- 🌐 **Bilingual Support** - Switch between Nepali (Devanagari) and English
- 🎨 **Fully Customizable** - Source code is copied to your project - style it however you want
- 📅 **Event Annotations** - Add holidays, reminders, and events with color coding
- 🎯 **Today Highlighting** - Visual marker for current date
- 📱 **Responsive Design** - Works on all screen sizes
- ⚡ **No Bundle Bloat** - Only add what you need

## Installation

```bash
npm install -D customizable-nepali-calendar
```

## Usage

### 1. Initialize

Run the init command to set up your project:

```bash
npx nepali-calendar init
```

This will ask you where to install components, data files, and styles. A `nepali-calendar.json` config file will be created.

### 2. Add Components

Add the calendar component to your project:

```bash
npx nepali-calendar add calendar
```

This copies the source files directly into your project:
- `src/components/nepali-calendar/NepaliCalendar.jsx` - Main component
- `src/components/nepali-calendar/engine/` - Calendar calculation engine
- `src/data/nepali-calendar/` - Calendar data and locales
- `src/styles/nepali-calendar.css` - Component styles

### 3. Use in Your App

```jsx
import { NepaliCalendar } from '@/components/nepali-calendar/NepaliCalendar';

function App() {
  return (
    <div>
      <NepaliCalendar
        width={360}
        height={420}
        initialYear={2081}
        initialMonth={0}
        language="ne"  // 'ne' for Nepali, 'en' for English
      />
    </div>
  );
}
```

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | number | 360 | Calendar width in pixels |
| `height` | number | 420 | Calendar height in pixels |
| `initialYear` | number | 2081 | Starting year (BS) |
| `initialMonth` | number | 0 | Starting month (0-11) |
| `language` | string | "ne" | Display language ("ne" or "en") |
| `className` | string | "" | Additional CSS classes |
| `style` | object | {} | Inline styles |

## Customization

Since the code is in your project, you can customize everything:

### Add More Years

Edit `src/data/nepali-calendar/bsCalendar.js`:

```javascript
const BS_CALENDAR = {
  years: {
    2083: {
      startWeekday: 4,
      months: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    },
    // Add more years...
  },
};
```

### Add Events/Holidays

Edit `src/data/nepali-calendar/dayAnnotations.js`:

```javascript
export const DAY_ANNOTATIONS = {
  "2081-0-15": [
    { 
      type: "holiday", 
      label: { ne: "नयाँ वर्ष", en: "New Year" }, 
      color: "red" 
    },
  ],
  // Add more annotations...
};
```

### Change Colors

Edit `src/data/nepali-calendar/colorTokens.js`:

```javascript
export const COLOR_TOKENS = {
  red: "#dc2626",
  blue: "#2563eb",
  purple: "#7c3aed",
  // Add custom colors...
};
```

### Style the Calendar

Edit `src/styles/nepali-calendar.css` - customize everything from colors to layout.

## CLI Commands

### `init`

Initialize configuration for your project.

```bash
npx nepali-calendar init
```

### `add [component]`

Add a component to your project.

```bash
npx nepali-calendar add calendar
```

## Why This Approach?

Inspired by [shadcn/ui](https://ui.shadcn.com/), this isn't a traditional npm package or component library. Instead:

- ✅ **Full Control** - Code is in your project, modify anything
- ✅ **No Vendor Lock-in** - Not dependent on package updates
- ✅ **Easy Debugging** - See and fix issues directly
- ✅ **Custom Styling** - No CSS conflicts or overrides
- ✅ **Tree Shakeable** - Only bundle what you use

## Requirements

- React 16.8.0 or higher (for hooks)
- A React project with JSX support

## Data Coverage

Currently includes calendar data for years:
- 2080 BS
- 2081 BS
- 2082 BS

Add more years by editing `bsCalendar.js` in your project.

## License

ISC

## Contributing

Issues and pull requests are welcome!

## Links

- [GitHub Repository](https://github.com/dAIgnosisLab/customizable-nepali-calendar)
- [Report Issues](https://github.com/dAIgnosisLab/customizable-nepali-calendar/issues)

---

Made with ❤️ by [dAIgnosisLab](https://github.com/dAIgnosisLab)

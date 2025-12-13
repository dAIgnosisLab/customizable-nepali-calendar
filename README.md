# Customizable Nepali Calendar

A CLI tool to add beautiful, customizable Nepali (Bikram Sambat) calendar components to your React project.

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
| `layout` | object | {} | Customize section sizes (see Layout Customization) |
| `colors` | object | {} | Customize theme colors (see Color Customization) |
| `colorTokens` | object | {} | Add/override annotation colors (see Color Customization) |

### Layout Customization

Control the size of every calendar section:

```jsx
<NepaliCalendar
  layout={{
    containerWidth: 480,        // overall calendar width
    containerHeight: 520,       // overall calendar height
    headerHeight: 80,           // top bar (month/year) height
    headerPadding: "18px 20px", // spacing inside header
    weekdaysHeight: 34,         // weekdays row height
    weekdaysPadding: "6px 0 10px",
    gridGap: 12,                // spacing between day cells
    gridPadding: 14,            // padding around the grid
    dayCellMinHeight: 72,       // each date cell height
    dayCellMinWidth: 44,        // each date cell width
    dayCellPadding: "10px 6px", // inner padding for date cells
  }}
/>
```

### Color Customization

Customize theme colors and annotation tokens:

```jsx
<NepaliCalendar
  colors={{
    primary: "#0d9488",
    primarySoft: "#ccfbf1",
    bgMain: "#fdfcfb",
    bgSoft: "#f4f4f5",
    bgHover: "#e0f2f1",
    holidayBg: "#fff4e5",
    holidayText: "#ea580c",
    textMain: "#0f172a",
    textMuted: "#94a3b8",
  }}
  colorTokens={{
    primary: "#0d9488",
    teal: "#14b8a6",     // use in dayAnnotations color field
    orange: "#f97316",
  }}
/>
```

## Customization

### Props-Based Customization

Use `layout`, `colors`, and `colorTokens` props for quick styling without editing files (see Component Props section above).

### Direct Code Customization

Since the code is in your project, you can also customize everything by editing files directly:

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

### Add Custom Color Tokens

Edit `src/data/nepali-calendar/colorTokens.js` to add annotation colors:

```javascript
export const COLOR_TOKENS = {
  red: "#dc2626",
  blue: "#2563eb",
  purple: "#7c3aed",
  myCustomColor: "#your-color",  // Add custom colors
};
```

Then use in `dayAnnotations.js`:

```javascript
{
  type: "event",
  label: { ne: "कस्टम", en: "Custom" },
  color: "myCustomColor",  // reference your custom token
}
```

### Style the Calendar

Edit `src/styles/nepali-calendar.css` - customize everything from colors to layout.

## CLI Commands

### `init`

Initialize configuration for your project. Creates `nepali-calendar.json` with your preferred paths.

```bash
npx nepali-calendar init
```

**Note:** Works in interactive mode. Non-interactive? Just create `nepali-calendar.json` manually:

```json
{
  "componentsPath": "src/components/nepali-calendar",
  "dataPath": "src/data/nepali-calendar",
  "stylesPath": "src/styles"
}
```

### `add [component]`

Add a component to your project. Copies all files and updates import paths automatically.

```bash
npx nepali-calendar add calendar
```

## Why This Approach?

This isn't a traditional npm package or component library. Instead:

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

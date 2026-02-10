# Morning Melissa - Clickable Prototype

A polished, interactive desktop prototype for the B2B productivity dashboard "Morning Melissa".

## Files

- `index.html` - Main HTML with all three screens and real app icons
- `styles.css` - Polished styles with micro-interactions and animations
- `app.js` - Enhanced navigation with smooth transitions
- `Icons/` - Folder containing app icon PNGs

## Changes Made

### 1. Real App Icons (from `/Icons` folder)
- **Connections row**: inbox, gmail, slack, google_drive, google_calendar, Notion, Xero, plus
- **Task list icons**:
  - Share access → Gmail
  - Approve supplier invoice → Xero
  - Confirm meeting room booking → Google Calendar
  - Review onboarding doc → Google Drive
  - Reply to IT request → Slack
  - Update roadmap → Notion

### 2. Micro-interactions & Animations

**App Icon Buttons (44x44px clickable area):**
- Default: subtle border, white background
- Selected: stronger border + light fill
- Hover: translateY(-1px) + subtle shadow
- Press: translateY(0) + scale(0.98)

**List Screen:**
- Page load: container fades in + moves up (180ms)
- Each row staggers in (40ms delay between rows)
- Row hover: background tint + title turns blue + chevron slides right
- Clickable rows show chevron indicator

**Screen Transitions:**
- Crossfade + slide animation (200-260ms)
- Forward/backward direction detection
- Smooth opacity and transform transitions

**Primary Button:**
- Hover: lift + colored shadow
- Active: press down
- Loading: spinner + "Sharing..." text + pulse animation

**Toast:**
- Slides up + scales in with spring-like easing
- Success icon (checkmark) added
- Auto-dismiss after 4 seconds
- Enhanced shadow for depth

### 3. UI Polish Improvements

- **Max width**: 920px for better large-screen appearance
- **Spacing**: 28px header-to-list, consistent 16px row padding
- **Fixed width**: "Due by" column (72px) for aligned titles
- **Typography hierarchy**:
  - Title: 32px bold
  - Subtitle: 16px regular with semibold number
  - Task title: 15px semibold
  - Meta: 13px muted
- **Chevrons**: Added to all task rows for affordance
- **Borders**: Subtle borders on cards and list for definition

## How to Run

### Option 1: Direct File Open
1. Navigate to: `C:\Users\61431\morning-melissa-prototype`
2. Double-click `index.html`

### Option 2: Local Server (Recommended)

**Python:**
```bash
cd "C:\Users\61431\morning-melissa-prototype"
python -m http.server 8000
```
Open: http://localhost:8000

**Node.js:**
```bash
cd "C:\Users\61431\morning-melissa-prototype"
npx serve
```

**VS Code:**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

## Prototype Flow

1. **Screen 1 (Dashboard)**: 6 prioritized tasks with stagger animation
   - Click **first task** "Share access to latest timesheet"
   - Hover over rows to see interactions

2. **Screen 2 (Task Detail)**: Email context with action buttons
   - Click **"Share access"** → shows loading spinner for 600ms
   - Or click **"Back"** to return

3. **Screen 3 (Dashboard + Toast)**: Updated to 5 tasks
   - Success toast slides in from bottom-right
   - Toast auto-dismisses after 4 seconds

## Keyboard Shortcuts

- `Escape` - Go back from detail view
- `Enter` - Activate focused task row

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari

## Notes

- Desktop-first design (768px+ for optimal experience)
- Icons are PNG files from the Icons folder
- All animations use CSS transforms for 60fps performance
- No backend - this is a presentation prototype

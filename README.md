# Morning Melissa - Clickable Prototype

A polished, interactive desktop prototype for the B2B productivity dashboard "Morning Melissa" with filtering and multiple task detail views.

## Files

- `index.html` - Main HTML with dashboard, 6 task detail screens, and completion state
- `styles.css` - Polished styles with filters, micro-interactions, and animations
- `app.js` - Enhanced navigation, filtering logic, and task completion flow
- `Icons/` - Folder containing app icon PNGs

## New Features

### 1. Filter Bar
Located below the header, click to filter tasks by app:
- **All** - Shows all tasks (6 or 5 after completion)
- **App icons** - Filter to show only Gmail, Xero, Calendar, Drive, Slack, or Notion tasks
- Active filter highlighted with dark background
- Task counts shown on each filter button

### 2. All Tasks Are Now Clickable
Each task opens its own detail view with relevant content:

| Task | App | Detail View Content |
|------|-----|---------------------|
| Share access to timesheet | Gmail | Email from Alex Chen, document found in Drive |
| Approve supplier invoice | Xero | Invoice summary ($4,250), vendor details |
| Confirm meeting room | Calendar | Meeting details (date, time, room, attendees) |
| Review onboarding doc | Drive | Google Doc preview, sections needing feedback |
| Reply to IT request | Slack | Slack message from Sam, tool access request |
| Update roadmap | Notion | Notion page preview, flagged sections |

### 3. Task-Specific Actions & Toasts
Each task has unique primary action and success toast:
- **Gmail**: "Share access" → "Alex can now view Latest Timesheet"
- **Xero**: "Approve invoice" → "Payment of $4,250.00 is scheduled"
- **Calendar**: "Confirm booking" → "Conference Room B is reserved"
- **Drive**: "Mark as reviewed" → "Jessica has been notified"
- **Slack**: "Approve access" → "Emily will receive credentials Monday"
- **Notion**: "Mark updated" → "Product Team has been notified"

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

## Prototype Flow

### Dashboard (Screen 1)
- 6 prioritized tasks with stagger animation
- **Filter bar** below header - click any app icon to filter
- **Click any task row** to open its detail view
- Chevron indicators show all rows are clickable

### Task Detail Screens (6 different screens)
Each shows:
- Back button to return to dashboard
- Task header with app icon and priority bar
- Context card (email, invoice, meeting details, etc.)
- Action buttons (primary + secondary + link)
- Relevant metadata and source information

### Completion Flow
- Click primary action button (e.g., "Approve invoice")
- Loading state for 600ms with spinner
- Returns to **Dashboard** with completion animation:
  1. Task row turns green with white tick overlay (600ms)
  2. Task fades out and slides upward (800ms)
  3. Task removed from list, counts update
- **Success toast** slides in with task-specific message
- Toast auto-dismisses after 4 seconds

### Completion Animation
When a task is completed:
- Green background highlights the task
- White tick/checkmark appears in center
- Task fades and slides up
- Header count updates (e.g., "6 actions" → "5 actions")
- Filter button for that app grays out

## Keyboard Shortcuts

- `Escape` - Go back from detail view to dashboard
- `1-6` - Quick filter (1=All, 2=Gmail, 3=Xero, 4=Calendar, 5=Drive, 6=Slack, 7=Notion)
- `Enter` - Activate focused task row

## Design Details

### Filter Buttons
- Pill-shaped buttons with app icons
- Active state: dark background, white text
- Hover: subtle lift + background change
- Shows task count badge

### Task Detail Views
Each detail screen is customized:
- **Gmail**: Email card with sender, subject, body
- **Xero**: Invoice summary with amount, vendor, PO number
- **Calendar**: Meeting card with icons for date/time/attendees/room
- **Drive**: Document preview with feedback checklist
- **Slack**: Slack-style message card with avatar
- **Notion**: Page preview with status indicators

### Animations
- Screen transitions: Crossfade + slide (200-260ms)
- Filter changes: Tasks fade out/in with stagger
- Row hover: Background tint + title color change
- Button hover: Lift + shadow
- Toast: Slide up + scale with spring easing

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari

## Notes

- Desktop-first design (768px+ for optimal experience)
- All animations use CSS transforms for 60fps performance
- Icons are PNG files from the Icons folder
- No backend - this is a presentation prototype
- Filter state resets when returning from detail view (by design)

# AI Chat Web Application

A secure, password-protected AI chat web application built with Next.js 16, featuring rate limiting, AI thinking display, and Telegram integration.

## Features

✨ **Key Features:**

- 🔒 **Password Protected Access** - Secure login with password: `@NGYT777GGG`
- ⏱️ **Rate Limiting** - 20 requests per minute to prevent abuse
- 🧠 **AI Thinking Display** - See the AI's reasoning process
- 📱 **Telegram Integration** - Join our Telegram channel on first visit
- 🎨 **Beautiful UI** - Dark theme with smooth animations
- 💬 **Real-time Chat** - Instant message responses with streaming
- 📊 **Request Counter** - Track remaining requests per minute
- 📋 **Copy Messages** - Easy message copying with one click
- 🚀 **Fast & Responsive** - Built with Next.js and Tailwind CSS
- 📱 **Mobile Friendly** - Works great on all devices

## Prerequisites

- Node.js 18+ 
- npm or yarn package manager

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/jjqjpq-droid/Duli-duli-bombao.git
cd Duli-duli-bombao
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:3000`

## Usage

### First Time Access

1. When you open the application, you'll be prompted to enter the password
2. **Password**: `@NGYT777GGG`
3. After entering the correct password, a popup will invite you to join our Telegram channel
4. You can click "Join Channel" or "Continue to Chat"

### Chatting

1. Type your message in the input field at the bottom
2. Press Enter or click the Send button
3. Wait for the AI response
4. The AI will show its thinking process, which you can expand by clicking "🧠 AI Thinking"

### Rate Limiting

- **Limit**: 20 requests per minute
- **Remaining**: Check the blue alert at the bottom showing remaining requests
- **Reset**: Automatically resets every minute
- The button will show how much time is remaining before the reset

### Telegram Integration

- Click "Join Telegram" button in the top right to visit our Telegram channel
- Channel: `@NGYT777GGG`
- You can also dismiss the initial popup and access it later via the header button

### Logout

Click the "Logout" button in the top right to end your session and return to the password screen.

## Project Structure

```
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts        # Chat API endpoint with rate limiting
│   ├── page.tsx                # Main page component
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/
│   ├── ChatInterface.tsx        # Main chat UI component
│   ├── Message.tsx             # Message display with thinking
│   ├── PasswordModal.tsx        # Password authentication modal
│   ├── TelegramPopup.tsx        # Telegram join popup
│   ├── TelegramButton.tsx       # Telegram join button
│   └── RateLimitAlert.tsx       # Rate limit display
├── lib/
│   └── rateLimiter.ts          # Rate limiting utility
├── package.json                # Dependencies
├── tailwind.config.ts          # Tailwind CSS config
├── tsconfig.json               # TypeScript config
└── README.md                   # This file
```

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useRef, useEffect)
- **API**: Next.js Route Handlers with Server-Side Rate Limiting
- **AI Backend**: External AI API (dolphinserver:24B model)

## Rate Limiting System

The application implements a server-side rate limiting system:

```typescript
- Maximum: 20 requests per minute
- Time Window: 60 seconds
- Per Client: Identified by IP address
- Reset: Automatic every minute
```

When the limit is exceeded:
- HTTP 429 status code returned
- Clear error message displayed
- Countdown timer shows reset time

## API Integration

The chat uses the external AI API at `https://chat.dphn.ai/api/chat` with:
- Model: `dolphinserver:24B`
- Template: `code-advanced`
- Streaming responses for real-time chat

## Security Features

1. **Password Protection** - All access requires correct password
2. **Server-Side Rate Limiting** - Prevents abuse
3. **Session Storage** - Authentication persists during session
4. **Input Validation** - All user inputs validated
5. **Error Handling** - Graceful error handling throughout

## Customization

### Change Password

Edit `components/PasswordModal.tsx`:
```typescript
const CORRECT_PASSWORD = '@NGYT777GGG'; // Change this
```

### Change Rate Limit

Edit `app/api/chat/route.ts`:
```typescript
const REQUEST_LIMIT = 20; // Change this
const TIME_WINDOW = 60 * 1000; // Change this (in milliseconds)
```

### Change Telegram Channel

Edit `components/TelegramPopup.tsx` and `components/TelegramButton.tsx`:
```typescript
window.open('https://t.me/YOUR_CHANNEL_HERE', '_blank');
```

### Customize Theme

Edit `app/globals.css` to change colors:
```css
@theme {
  --color-primary: #3b82f6;      /* Blue */
  --color-accent: #10b981;       /* Green */
  --color-background: #0f172a;   /* Dark Blue */
  /* ... other colors ... */
}
```

## Building for Production

1. **Build the project**
```bash
npm run build
```

2. **Start the production server**
```bash
npm start
```

3. **Deploy to Vercel** (recommended)
```bash
npm install -g vercel
vercel
```

## Deployment

### Deploy on Vercel

1. Push to GitHub
2. Connect your repo on Vercel
3. Vercel auto-deploys on every push

### Deploy Elsewhere

Make sure to set environment variables if using external services:
- No specific env vars needed for basic operation
- The app works with default settings

## Troubleshooting

### "Rate limit exceeded" error
- Wait for the timer to reset (usually 60 seconds)
- Check the blue alert box for remaining requests

### Messages not sending
- Ensure you've entered the correct password
- Check internet connection
- Try refreshing the page

### AI not responding
- Check if external API is accessible
- Verify network connectivity
- Check browser console for errors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit with clear messages
5. Push to your fork
6. Open a pull request

## License

ISC License - See LICENSE file for details

## Support

For issues and feature requests, please open an issue on GitHub.

Join our Telegram community for support: [@NGYT777GGG](https://t.me/NGYT777GGG)

---

**Made with ❤️ for secure AI conversations**

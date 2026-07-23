# Deployment Guide

## Quick Start

### Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

**Login credentials:**
- Password: `@NGYT777GGG`

### Production Build

```bash
npm run build
npm start
```

## Deploy to Vercel (Recommended)

The easiest way to deploy this app!

### Option 1: GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your GitHub repository
5. Click "Deploy"
6. Done! Your app is live

### Option 2: Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts and your app will be deployed.

## Environment Variables

No environment variables are required for basic operation. The app works out of the box!

### Optional Configuration

If you want to use Redis or a database in the future, add them as environment variables in your Vercel dashboard.

## Features Working After Deployment

✅ Password Protection - Works  
✅ Rate Limiting - Works (per IP address)  
✅ AI Chat - Works  
✅ Telegram Integration - Works  
✅ Thinking Display - Works  
✅ Real-time Chat - Works  

## Performance

- **FCP (First Contentful Paint)**: ~1-2 seconds
- **LCP (Largest Contentful Paint)**: ~2-3 seconds
- **Rate Limiting**: Server-side, zero latency impact
- **API Response**: Depends on external AI service

## Scaling Considerations

### Current Implementation
- In-memory rate limiting (suitable for single instance)
- Session-based authentication with localStorage

### For Production Scale
Consider:
1. **Redis** for distributed rate limiting
2. **Database** for user sessions and chat history
3. **CDN** for static assets (already Vercel-optimized)
4. **Load Balancing** if expecting high traffic

## Security Checklist

- ✅ Password protection enabled
- ✅ Rate limiting implemented
- ✅ Input validation active
- ✅ HTTPS enforced (automatic with Vercel)
- ✅ No sensitive data in frontend code
- ✅ API requests validated

## Monitoring

### Vercel Dashboard
- View deployments
- Check build logs
- Monitor analytics
- Set up alerts

### Debug Mode
The app logs to browser console:
```javascript
console.log("[v0] Debug message");
```

## Rollback

### Vercel
1. Go to deployments tab
2. Find previous deployment
3. Click "Promote to Production"

### Manual Rollback
```bash
git revert <commit-hash>
git push
# Redeploy automatically
```

## Common Issues

### Rate Limiting Not Working
- Check that it's deployed (not just local dev)
- Wait 60 seconds for counter reset
- Check browser console for errors

### Password Not Working
- Password is case-sensitive: `@NGYT777GGG`
- Clear localStorage: Open DevTools → Application → Clear All
- Reload page

### AI Not Responding
- Check external API status: https://chat.dphn.ai
- Verify network tab in DevTools
- Check rate limit hasn't been exceeded

## Support

For Vercel-specific help: [Vercel Support](https://vercel.com/support)

For this project: Check GitHub Issues or Telegram [@NGYT777GGG](https://t.me/NGYT777GGG)

---

**Happy deploying! 🚀**

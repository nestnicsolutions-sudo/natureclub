# 🚀 Quick Start Guide - Interactive Nature Explorer

## Step-by-Step Setup

### 1️⃣ Install Dependencies

Open PowerShell in this directory and run:

```powershell
npm install
```

This will install:
- Next.js 14
- React 18
- Framer Motion (animations)
- Firebase (save progress)
- TypeScript
- Tailwind CSS
- And all other dependencies

### 2️⃣ Set Up Firebase

#### Create Firebase Project:
1. Go to https://console.firebase.google.com
2. Click "Add Project"
3. Name it "nature-explorer" (or your choice)
4. Disable Google Analytics (optional for kids app)
5. Click "Create Project"

#### Enable Firestore:
1. In Firebase Console, click "Firestore Database"
2. Click "Create Database"
3. Select "Start in test mode" (for development)
4. Choose your region
5. Click "Enable"

#### Get Firebase Config:
1. Click the gear icon → "Project Settings"
2. Scroll to "Your apps" section
3. Click the web icon (</>)
4. Register your app
5. Copy the firebaseConfig object

#### Add Firebase Rules (Security):
In Firestore, go to "Rules" tab and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /gameStates/{userId} {
      allow read, write: if true; // For development
      // In production, add proper authentication
    }
  }
}
```

### 3️⃣ Configure Environment Variables

1. Copy the example file:
```powershell
Copy-Item .env.example .env.local
```

2. Edit `.env.local` with your Firebase config:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123:web:abc123
```

### 4️⃣ Run Development Server

```powershell
npm run dev
```

Open your browser to: **http://localhost:3000**

🎉 You should see the Nature Explorer app!

---

## 🌐 Deploy to Vercel

### Option A: Deploy via GitHub (Recommended)

1. **Create GitHub Repository:**
```powershell
git init
git add .
git commit -m "Initial commit: Interactive Nature Explorer"
git branch -M main
# Create repo on GitHub, then:
git remote add origin https://github.com/yourusername/nature-explorer.git
git push -u origin main
```

2. **Deploy on Vercel:**
   - Go to https://vercel.com
   - Click "Import Project"
   - Connect your GitHub account
   - Select the repository
   - Vercel auto-detects Next.js
   - Add environment variables:
     - Click "Environment Variables"
     - Add all `NEXT_PUBLIC_FIREBASE_*` variables
     - Copy values from your `.env.local`
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app is live! 🎉

### Option B: Deploy via CLI

```powershell
npm install -g vercel
vercel login
vercel
```

Follow the prompts and add environment variables when asked.

---

## 📱 Testing on Mobile

### Local Network Testing:

1. Find your computer's IP address:
```powershell
ipconfig
# Look for "IPv4 Address" (e.g., 192.168.1.100)
```

2. On your phone, open browser to:
```
http://YOUR_IP_ADDRESS:3000
```

3. Make sure your phone and computer are on the same WiFi network

---

## 🎨 Customization Ideas

### Add More Animals:
Edit `contexts/GameContext.tsx` and add to the animals array:
```typescript
{ 
  id: 'squirrel1', 
  type: 'squirrel', 
  mood: 'playful', 
  lastFed: 0, 
  feedCount: 0, 
  position: { x: 45, y: 50 } 
}
```

Then update `components/scene/Animals.tsx` to handle the new type:
```typescript
const emojis = {
  // ... existing
  squirrel: '🐿️',
};
```

### Add More Badges:
Edit `contexts/GameContext.tsx`:
```typescript
{ 
  id: 'animal-whisperer', 
  name: 'Animal Whisperer', 
  description: 'Made 5 different animals happy',
  icon: '🦊',
  earned: false,
  requirement: 5,
  progress: 0
}
```

### Change Colors:
Edit `tailwind.config.ts`:
```typescript
colors: {
  sky: {
    light: '#YOUR_COLOR',
    DEFAULT: '#YOUR_COLOR',
  },
}
```

---

## 🐛 Troubleshooting

### Problem: "Module not found" errors
**Solution:** 
```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

### Problem: Firebase errors
**Solution:** 
- Check `.env.local` has correct values
- Ensure no extra spaces in environment variables
- Restart dev server after changing `.env.local`

### Problem: Build errors
**Solution:**
```powershell
npm run build
```
This will show detailed error messages.

### Problem: Slow animations on mobile
**Solution:** Reduce animation complexity in Tailwind config or component files.

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Firebase Firestore](https://firebase.google.com/docs/firestore)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 🎯 Feature Checklist

- [x] Interactive animals with moods
- [x] Growing plants system
- [x] Weather controls (sun, rain, rainbow)
- [x] Day/night cycle
- [x] Hidden creatures to discover
- [x] Badge achievement system
- [x] Mission quests
- [x] Progress saving to Firebase
- [x] Mobile-responsive design
- [x] Touch-friendly interactions
- [ ] Sound effects (needs audio files)
- [ ] Background music
- [ ] More animal types
- [ ] Seasonal themes
- [ ] Parent dashboard

---

## 💡 Tips for Success

1. **Test on Real Devices**: Kids use touch screens differently than adults
2. **Get Feedback**: Show it to children in the target age range
3. **Performance**: Keep animations smooth (60 FPS)
4. **Accessibility**: Ensure good contrast and large touch targets
5. **Safety**: Never collect personal information from kids

---

## 🆘 Need Help?

- Check the README.md for detailed documentation
- Review the code comments in each component
- Test each feature individually
- Use browser DevTools to debug

---

**Happy Coding! Let's make learning about nature fun! 🌳🦋✨**

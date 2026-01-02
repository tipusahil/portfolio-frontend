# 🚀 Meta Pixel & CAPI - Enterprise Setup Guide

## 📋 Table of Contents
1. [Quick Start](#quick-start)
2. [Environment Setup](#environment-setup)
3. [Generate Access Token](#generate-access-token)
4. [File Structure](#file-structure)
5. [Testing](#testing)
6. [Meta Ads Manager Setup](#meta-ads-manager-setup)
7. [Optimization Tips](#optimization-tips)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Quick Start

### 1. Install Dependencies
```bash
# No additional dependencies needed!
# Next.js built-in crypto is sufficient
```

### 2. Create File Structure
```
your-project/
├── .env.local                          # Environment variables
├── app/
│   ├── layout.tsx                      # Add FacebookPixelProvider
│   ├── thank-you/page.tsx             # Thank you page
│   └── api/
│       └── meta/
│           └── capi/
│               └── route.ts            # CAPI endpoint
├── components/
│   ├── FacebookPixelProvider.tsx
│   └── ContactForm.tsx                 # Example form
├── lib/
│   └── meta/
│       ├── types.ts
│       ├── crypto.ts
│       ├── cookies.ts
│       ├── capi.ts
│       ├── trackEvent.ts
│       ├── audiences.ts
│       └── testing.ts
└── hooks/
    └── useScrollTracking.ts
```

---

## 🔐 Environment Setup

### 1. Create `.env.local`
```env
NEXT_PUBLIC_FB_PIXEL_ID=1498876997844254
FB_ACCESS_TOKEN=your_actual_token_here
NEXT_PUBLIC_SITE_URL=https://tipusahil.vercel.app
META_API_VERSION=v21.0
```

### 2. Generate Access Token

#### Option A: Via Meta Events Manager (Recommended)
1. Go to [Meta Events Manager](https://business.facebook.com/events_manager2/)
2. Select your Pixel
3. Settings → Generate Access Token
4. Copy token to `.env.local`

#### Option B: Via Meta Business Settings
1. Go to [Meta Business Settings](https://business.facebook.com/settings/)
2. System Users → Create System User
3. Assign Pixel permissions
4. Generate token → Copy to `.env.local`

**⚠️ IMPORTANT:** 
- Token should start with `EAA...`
- Keep it secret - never commit to Git
- Add to `.gitignore`: `.env*.local`

---

## 📁 File Structure Explained

### Core Files (Copy exactly as provided):
1. ✅ `lib/meta/types.ts` - Type definitions
2. ✅ `lib/meta/crypto.ts` - Data hashing (SHA256)
3. ✅ `lib/meta/cookies.ts` - Facebook cookie extraction
4. ✅ `lib/meta/capi.ts` - CAPI sender
5. ✅ `lib/meta/trackEvent.ts` - Main tracking functions
6. ✅ `app/api/meta/capi/route.ts` - API endpoint
7. ✅ `components/FacebookPixelProvider.tsx` - Pixel script

### Optional Enhancement Files:
8. 🎯 `lib/meta/audiences.ts` - Advanced audience segmentation
9. 🧪 `lib/meta/testing.ts` - Debugging tools
10. 📊 `hooks/useScrollTracking.ts` - Engagement tracking

---

## 🧪 Testing

### Step 1: Install & Copy Files
Copy all files to your Next.js project.

### Step 2: Update `.env.local`
Replace `your_generated_access_token` with real token.

### Step 3: Add Provider to Layout
```tsx
// app/layout.tsx
import { FacebookPixelProvider } from "@/components/FacebookPixelProvider";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <FacebookPixelProvider />
        {children}
      </body>
    </html>
  );
}
```

### Step 4: Test in Browser Console
```javascript
// Open browser console (F12)
window.metaDebug.runHealthCheck();
```

Expected output:
```
✅ NEXT_PUBLIC_FB_PIXEL_ID: Set
✅ FB_ACCESS_TOKEN: Set
✅ Facebook Pixel loaded
✅ _fbp cookie found
✅ CAPI connection successful!
```

### Step 5: Test Events in Meta Events Manager
1. Go to [Events Manager](https://business.facebook.com/events_manager2/)
2. Select your Pixel
3. Test Events → Enter your URL
4. Browse your site → See events in real-time

---

## 🎯 Meta Ads Manager Setup

### 1. Verify Pixel Installation
Events Manager → Diagnostics → Should show "Active"

### 2. Create Custom Conversions
Events Manager → Custom Conversions → Create

Examples:
- **Lead Quality**: `CompleteRegistration` event
- **High Intent**: `content_category = "high_intent_visitor"`
- **Cart Abandoners**: `AddToCart` in last 7 days, NOT Purchase

### 3. Create Custom Audiences

#### A. Website Custom Audiences
Audiences → Create Audience → Website Traffic

Examples:
- **All Website Visitors (Last 30 days)**
- **ViewContent (Last 180 days)** → For Lookalike
- **Lead (Last 30 days)** → For Retargeting
- **Purchase (Last 180 days)** → For Lookalike 1%

#### B. Lookalike Audiences
Audiences → Create Lookalike Audience

Source: "Purchase (Last 180 days)"
- 1% Lookalike (High quality)
- 3% Lookalike (Balance)
- 5% Lookalike (Broader reach)

### 4. Campaign Structure for Maximum ROAS

#### Campaign 1: Prospecting
- **Objective:** Conversions (Lead / Purchase)
- **Audience:** Lookalike 1-3%
- **Optimization:** Lead / Purchase
- **Budget:** 60% of total

#### Campaign 2: Retargeting
- **Objective:** Conversions
- **Audience:** 
  - ViewContent (Last 30 days)
  - AddToCart (Last 7 days)
- **Optimization:** Purchase / CompleteRegistration
- **Budget:** 40% of total

#### Campaign 3: Exclusions (IMPORTANT!)
In ALL campaigns, exclude:
- **Purchased (Last 180 days)** - Don't waste money
- **CompleteRegistration (Last 30 days)** - Already converted

---

## 💡 Optimization Tips for Lower CPM & CPA

### 1. Event Naming Best Practices
```typescript
// ❌ BAD
trackLead(); // Same event twice

// ✅ GOOD
// On form submit
trackLead({ email, phone });

// On thank you page
trackCompleteRegistration();
```

### 2. Advanced Matching (Lower CPA by 20-30%)
```typescript
// Always pass as much user data as possible
trackLead({
  email: "user@example.com",
  phone: "+8801712345678",
  firstName: "John",
  lastName: "Doe",
  city: "Dhaka",
  country: "BD",
});
```

### 3. Value Optimization
```typescript
// For lead gen, assign estimated value
trackLead({
  email: "user@example.com",
  customData: {
    value: 50, // Estimated lead value
    currency: "USD",
  },
});

// For e-commerce, ALWAYS pass actual value
trackPurchase("ORDER123", 99.99, "USD");
```

### 4. Engagement Events (Better Lookalikes)
```typescript
// In your pages, track engagement
useScrollTracking(); // 50% scroll
useTimeOnPage(); // Time spent

// High engagement = Better audience quality
```

### 5. Audience Segmentation
```typescript
// Import from lib/meta/audiences.ts
trackHighIntentVisitor(); // Visited 3+ pages
trackProductCategoryView("Electronics", 299);
trackHighValuePurchase("ORDER123", 599);

// Use these for precise retargeting
```

---

## 🐛 Troubleshooting

### Issue 1: "Pixel not firing"
**Check:**
```javascript
window.metaDebug.checkPixelStatus();
```
**Solution:** Verify `NEXT_PUBLIC_FB_PIXEL_ID` in `.env.local`

### Issue 2: "CAPI not working"
**Check:**
```javascript
window.metaDebug.testCAPIConnection();
```
**Solutions:**
- Verify `FB_ACCESS_TOKEN` is correct
- Check token hasn't expired
- Verify API route exists: `/api/meta/capi/route.ts`

### Issue 3: "No _fbp cookie"
**Check:**
```javascript
window.metaDebug.checkFacebookCookies();
```
**Solutions:**
- Clear browser cache
- Check if cookies are blocked
- Wait 10 seconds after page load

### Issue 4: "Events showing in Test Events but not in Events Manager"
**Reason:** Processing delay (5-20 minutes)
**Solution:** Wait 20 minutes, then refresh

### Issue 5: "Duplicate events"
**Check:** Same `eventID` used in Pixel & CAPI
**Solution:** Already handled in `trackEvent.ts` with `crypto.randomUUID()`

### Issue 6: "High CPA / Low ROAS"
**Common causes:**
1. Not using `CompleteRegistration` on thank you page
2. Not excluding converted users
3. Not passing user data for Advanced Matching
4. Not using lookalike audiences
5. Targeting too broad

**Solutions:**
- Follow the enterprise event flow (Lead → CompleteRegistration)
- Pass email/phone in all events
- Create 1% Lookalike from converters
- Use retargeting for warm audiences

---

## 🎉 Expected Results

### After Proper Setup:
- ✅ Event Match Quality Score: **Good to Excellent** (7.0+)
- ✅ CPM reduction: **20-40%**
- ✅ CPA reduction: **30-50%**
- ✅ ROAS improvement: **2-3x**
- ✅ Better lookalike audience performance
- ✅ Accurate attribution across devices

### Timeline:
- **Day 1-3:** Events start firing, match quality improves
- **Day 7:** Learning phase complete
- **Day 14:** Optimized delivery kicks in
- **Day 30:** Full optimization, stable performance

---

## 📊 Monitoring Checklist

Daily:
- [ ] Check Events Manager for event volume
- [ ] Verify no errors in diagnostics
- [ ] Monitor CPM/CPA trends

Weekly:
- [ ] Review Event Match Quality score
- [ ] Analyze audience overlap
- [ ] Optimize underperforming campaigns

Monthly:
- [ ] Refresh lookalike audiences
- [ ] Update custom conversions
- [ ] A/B test new audience segments

---

## 🚨 Common Mistakes to Avoid

1. ❌ Using same event (Lead) twice
2. ❌ Not passing email/phone data
3. ❌ Ignoring _fbp/_fbc cookies
4. ❌ Not excluding converters
5. ❌ Not using lookalike audiences
6. ❌ Setting up CAPI without Pixel
7. ❌ Not testing before going live

---

## ✅ Success Checklist

Before launching campaigns:
- [ ] Pixel installed in layout.tsx
- [ ] CAPI endpoint working (`/api/meta/capi`)
- [ ] Access token configured
- [ ] Test events showing in Events Manager
- [ ] _fbp cookie present
- [ ] Event Match Quality score > 6.0
- [ ] Custom conversions created
- [ ] Lookalike audiences built
- [ ] Exclusion audiences set up
- [ ] All tracking tested with `runHealthCheck()`

---

## 🆘 Need Help?

1. Run health check: `window.metaDebug.runHealthCheck()`
2. Check Meta's [Troubleshooting Guide](https://www.facebook.com/business/help/1457335954546369)
3. Review Events Manager → Diagnostics

---

## 📝 Notes

- **Data Privacy:** This implementation complies with Meta's data handling requirements
- **GDPR/CCPA:** Add consent management if operating in EU/California
- **Testing:** Always test in Meta's Test Events before live campaigns
- **Updates:** Meta API version updated periodically - check for latest

---

**Last Updated:** January 2026
**Meta API Version:** v21.0
**Next.js Version:** 14.x / 15.x compatible
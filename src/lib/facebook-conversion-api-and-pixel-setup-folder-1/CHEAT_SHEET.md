# 🎯 Meta Tracking - Quick Reference Cheat Sheet

## 📦 Common Tracking Patterns

### Pattern 1: Simple Page View
```typescript
// Automatic - no code needed
// FacebookPixelProvider handles this
```

### Pattern 2: Contact Form
```typescript
import { trackLead, trackCompleteRegistration } from "@/lib/meta/trackEvent";

// On form submit
const handleSubmit = async (e) => {
  await trackLead({
    email: formData.email,
    phone: formData.phone,
  });
  router.push("/thank-you");
};

// On thank you page (useEffect)
useEffect(() => {
  trackCompleteRegistration();
}, []);
```

### Pattern 3: Product View
```typescript
import { trackViewContent } from "@/lib/meta/trackEvent";

useEffect(() => {
  trackViewContent("Product Name", 99.99);
}, []);
```

### Pattern 4: Add to Cart
```typescript
import { trackAddToCart } from "@/lib/meta/trackEvent";

const handleAddToCart = () => {
  trackAddToCart("product_123", 49.99, 1);
};
```

### Pattern 5: Purchase Complete
```typescript
import { trackPurchase } from "@/lib/meta/trackEvent";

useEffect(() => {
  if (orderComplete) {
    trackPurchase("ORDER_" + orderId, totalAmount, "USD");
  }
}, [orderComplete]);
```

### Pattern 6: Scroll Tracking
```typescript
import { useScrollTracking } from "@/hooks/useScrollTracking";

export default function BlogPost() {
  useScrollTracking("Article Title");
  // Rest of component
}
```

---

## 🎨 Advanced Patterns

### Pattern 7: High-Intent Visitor
```typescript
import { trackHighIntentVisitor } from "@/lib/meta/audiences";

// After user visits 3+ pages
useEffect(() => {
  const pageCount = sessionStorage.getItem("pageCount") || 0;
  if (pageCount >= 3) {
    trackHighIntentVisitor();
  }
}, []);
```

### Pattern 8: Newsletter Signup
```typescript
import { trackNewsletterSignup } from "@/lib/meta/audiences";

const handleSignup = async (email) => {
  await trackNewsletterSignup(email);
};
```

### Pattern 9: Video Engagement
```typescript
import { trackVideoView } from "@/lib/meta/audiences";

// When video reaches 50%
const onProgress = (percent) => {
  if (percent >= 50 && !tracked) {
    trackVideoView("Product Demo Video", 50);
    setTracked(true);
  }
};
```

---

## 🧪 Testing Commands

### Browser Console
```javascript
// Run health check
window.metaDebug.runHealthCheck();

// Check pixel status
window.metaDebug.checkPixelStatus();

// Check cookies
window.metaDebug.checkFacebookCookies();

// Test CAPI connection
window.metaDebug.testCAPIConnection();
```

---

## 🎯 Event Priority for Different Industries

### E-commerce
**Priority Order:**
1. ✅ Purchase (HIGHEST)
2. ✅ InitiateCheckout
3. ✅ AddToCart
4. ✅ ViewContent (product pages)
5. ⚡ PageView

### Lead Generation
**Priority Order:**
1. ✅ CompleteRegistration (HIGHEST)
2. ✅ Lead
3. ✅ ViewContent (scroll 50%+)
4. ⚡ PageView

### SaaS/Subscription
**Priority Order:**
1. ✅ Subscribe (HIGHEST)
2. ✅ StartTrial
3. ✅ Lead
4. ✅ ViewContent (pricing page)
5. ⚡ PageView

### Content/Media
**Priority Order:**
1. ✅ ViewContent (90% scroll)
2. ✅ Subscribe (newsletter)
3. ✅ ViewContent (50% scroll)
4. ⚡ PageView

---

## 📊 Meta Ads Manager Quick Actions

### Create Custom Audience
```
Audiences → Create Audience → Website Traffic
→ Choose event (e.g., ViewContent)
→ Last 30 days
→ Name: "Product Viewers - 30d"
```

### Create Lookalike Audience
```
Audiences → Create Lookalike
→ Source: "Purchase - 180d"
→ Location: Bangladesh
→ Audience size: 1%, 3%, 5%
```

### Create Custom Conversion
```
Events Manager → Custom Conversions → Create
→ Data source: Your pixel
→ Rules: CompleteRegistration
→ Name: "Lead - High Quality"
```

### Exclude Converters (CRITICAL!)
```
Campaign → Ad Set → Audience
→ Exclude: "Purchase - 180d"
→ Exclude: "CompleteRegistration - 30d"
```

---

## 💰 Budget Allocation (Proven Strategy)

### Starting Budget: $50/day
- 60% ($30) - Lookalike 1-3% (Cold)
- 30% ($15) - Retargeting (Warm)
- 10% ($5) - Testing

### Scaling (After 7 days of data)
- Winners: +20% every 3 days
- Losers: Pause if CPA > 2x target

---

## 🔥 Pro Tips

### 1. Minimum Data for Learning Phase
- **Conversions needed:** 50+ per week
- **If below:** Use "Lead" instead of "Purchase" for optimization

### 2. Campaign Budget Optimization (CBO)
- Use for 3+ ad sets
- Let Meta allocate budget automatically
- Better results than manual allocation

### 3. Dynamic Ads for Retargeting
- Show exact products users viewed
- 2-3x better CTR than static ads
- Requires product catalog setup

### 4. Best Time to Launch
- Monday 10 AM - 2 PM (High office engagement)
- Thursday 6 PM - 10 PM (High browsing time)
- Avoid Friday night / Saturday (Low quality)

### 5. Creative Best Practices
- **Images:** 1080x1080 (square) or 1200x628 (landscape)
- **Video:** 15-30 seconds max
- **Text:** 125 characters or less
- **CTA:** Always include clear call-to-action

---

## ⚡ Quick Wins for Immediate Results

### Day 1-3: Setup
- [ ] Copy all files
- [ ] Configure .env.local
- [ ] Run health check
- [ ] Test events

### Day 4-7: Launch
- [ ] Create lookalike audiences
- [ ] Launch 3 campaigns (1%, 3%, 5%)
- [ ] Budget: $10-20 per campaign
- [ ] Monitor Event Match Quality

### Day 8-14: Optimize
- [ ] Pause ad sets with CPA > 2x target
- [ ] Increase winners by 20%
- [ ] Add retargeting campaign
- [ ] Refresh ad creatives

### Day 15-30: Scale
- [ ] Launch dynamic retargeting
- [ ] Test new lookalikes
- [ ] Expand to 5-10% if performing
- [ ] Implement exclusion audiences

---

## 🚨 Red Flags to Watch

| Issue | Cause | Fix |
|-------|-------|-----|
| CPM > $15 | Audience too small | Expand to 3-5% lookalike |
| CPA increasing | Ad fatigue | Refresh creative every 7-10 days |
| Low CTR (<1%) | Poor creative | A/B test new images/copy |
| High CTR, low conversions | Wrong audience | Review targeting criteria |
| Events not showing | CAPI error | Run `testCAPIConnection()` |

---

## 📱 Mobile Optimization

### Must-Have for Bangladesh Market
```typescript
// Track mobile app installs (if applicable)
trackMetaEvent({
  eventName: "Subscribe",
  customData: {
    content_category: "mobile_user",
  },
});

// Optimize for 2G/3G (common in BD)
// Use smaller images, faster loading
```

---

## 💡 Industry-Specific Values

### Lead Gen (BD Market)
- **Good CPA:** $2-5
- **Target ROAS:** 3:1 minimum
- **Lead value:** $10-50

### E-commerce (BD Market)
- **Good ROAS:** 4:1+
- **Target CPA:** 10-20% of AOV
- **AOV:** $20-100

### SaaS (Global)
- **Good CPA:** $20-50
- **Target LTV/CAC:** 3:1
- **Trial value:** $50-200

---

## 🎯 Final Checklist Before Launch

Technical:
- [ ] `window.metaDebug.runHealthCheck()` passes
- [ ] Events showing in Test Events
- [ ] Event Match Quality > 6.0
- [ ] _fbp cookie present

Audiences:
- [ ] Custom audiences created
- [ ] Lookalike 1%, 3%, 5% built
- [ ] Exclusion audiences set up

Campaigns:
- [ ] Budget allocated properly
- [ ] Conversions tracked correctly
- [ ] Ad creative tested
- [ ] Landing page optimized

---

**🎉 You're ready to launch! Expected results in 7-14 days.**
<!--Browser console এ:  window.metaDebug.runHealthCheck(); -->


/**
 * 🎯 ADVANCED AUDIENCE SEGMENTATION
 * 
 * এই events গুলো Meta তে custom audiences তৈরি করতে ব্যবহার হবে
 * যার মাধ্যমে lookalike audiences এবং retargeting campaigns চালাতে পারবেন
 */

import { trackMetaEvent } from "@/lib/facebook-conversion-api-and-pixel-setup-folder-1/trackEvent";

/**
 * Segment: High-Intent Visitors
 * Visited multiple pages + spent 2+ minutes
 */
export const trackHighIntentVisitor = () => {
  trackMetaEvent({
    eventName: "ViewContent",
    customData: {
      content_category: "high_intent_visitor",
      content_name: "High Intent Visitor",
    },
  });
};

/**
 * Segment: Product Viewers
 * For e-commerce: viewed specific product category
 */
export const trackProductCategoryView = (category: string, value?: number) => {
  trackMetaEvent({
    eventName: "ViewContent",
    customData: {
      content_category: category,
      content_name: `Product Category: ${category}`,
      content_type: "product_group",
      value,
      currency: "USD",
    },
  });
};

/**
 * Segment: Cart Abandoners
 * Added to cart but didn't complete purchase
 */
export const trackCartAbandonment = (cartValue: number) => {
  trackMetaEvent({
    eventName: "AddToCart",
    customData: {
      value: cartValue,
      currency: "USD",
      content_category: "cart_abandoner",
    },
  });
};

/**
 * Segment: Checkout Abandoners
 * Started checkout but didn't complete
 */
export const trackCheckoutAbandonment = (checkoutValue: number) => {
  trackMetaEvent({
    eventName: "InitiateCheckout",
    customData: {
      value: checkoutValue,
      currency: "USD",
      content_category: "checkout_abandoner",
    },
  });
};

/**
 * Segment: High-Value Customers
 * Completed purchase above threshold (e.g., $500)
 */
export const trackHighValuePurchase = (orderId: string, value: number) => {
  trackMetaEvent({
    eventName: "Purchase",
    customData: {
      value,
      currency: "USD",
      content_name: orderId,
      content_category: "high_value_customer",
      predicted_ltv: value * 3, // Lifetime value prediction
    },
  });
};

/**
 * Segment: Video Watchers (if you have video content)
 */
export const trackVideoView = (videoName: string, percentage: number) => {
  trackMetaEvent({
    eventName: "ViewContent",
    customData: {
      content_name: videoName,
      content_type: "video",
      content_category: `video_${percentage}%_watched`,
    },
  });
};

/**
 * Segment: Blog/Content Readers
 */
export const trackArticleRead = (articleTitle: string, readTime: number) => {
  trackMetaEvent({
    eventName: "ViewContent",
    customData: {
      content_name: articleTitle,
      content_type: "article",
      content_category: readTime > 120 ? "engaged_reader" : "casual_reader",
    },
  });
};

/**
 * Segment: Newsletter Subscribers
 */
export const trackNewsletterSignup = (email: string) => {
  trackMetaEvent({
    eventName: "Subscribe",
    userData: { email },
    customData: {
      content_name: "Newsletter Subscription",
      value: 5, // Estimated value of a subscriber
      currency: "USD",
    },
  });
};

/**
 * 📊 HOW TO USE THESE IN META ADS MANAGER:
 * 
 * 1. Go to Events Manager → Custom Conversions
 * 2. Create conversion based on content_category
 * 3. Use these audiences for:
 *    - Lookalike Audiences (1%, 3%, 5%)
 *    - Retargeting campaigns
 *    - Exclusion audiences
 * 
 * Example Custom Audiences:
 * - "High Intent Visitors" → content_category = "high_intent_visitor"
 * - "Cart Abandoners (Last 7 days)" → AddToCart in last 7 days
 * - "High Value Customers" → Purchase value > $500
 */
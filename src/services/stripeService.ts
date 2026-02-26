export const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY as string;

export const STRIPE_LINKS = {
  pro: import.meta.env.VITE_STRIPE_PRO_LINK as string ||
    'https://buy.stripe.com/4gM00keeYdDH62d6OR9R606',
  premium: import.meta.env.VITE_STRIPE_PREMIUM_LINK as string ||
    'https://buy.stripe.com/6oUbJ2gn62Z3aitc9b9R607',
};

export const redirectToCheckout = (plan: 'pro' | 'premium'): void => {
  const link = STRIPE_LINKS[plan];
  if (link) {
    window.location.href = link;
  } else {
    console.error(`No Stripe link found for plan: ${plan}`);
  }
};

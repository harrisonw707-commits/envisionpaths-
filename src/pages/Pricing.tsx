import React from 'react';
import { Link } from 'react-router-dom';
import PricingCard from '../components/PricingCard';
import { PricingTier } from '../types';

const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    price: 0,
    features: [
      '5 interview practice sessions/month',
      '1 resume review/month',
      'Basic career path suggestions',
      'Community support',
      'Access to question library',
    ],
  },
  {
    name: 'Pro',
    price: 19,
    features: [
      'Unlimited interview practice',
      '10 resume reviews/month',
      'Advanced AI career coaching',
      'Priority support',
      'Personalized feedback reports',
      'Interview performance analytics',
      'Custom question sets',
    ],
    stripeLink: import.meta.env.VITE_STRIPE_PRO_LINK || 'https://buy.stripe.com/4gM00keeYdDH62d6OR9R606',
    recommended: true,
  },
  {
    name: 'Premium',
    price: 49,
    features: [
      'Everything in Pro',
      'Unlimited resume reviews',
      'Live AI mock interviews',
      'LinkedIn profile optimization',
      'Salary negotiation coaching',
      'Job search strategy sessions',
      'Dedicated career advisor',
      '1-on-1 coaching sessions',
    ],
    stripeLink: import.meta.env.VITE_STRIPE_PREMIUM_LINK || 'https://buy.stripe.com/6oUbJ2gn62Z3aitc9b9R607',
  },
];

const Pricing: React.FC = () => {
  return (
    <div className="pricing-page">
      <div className="pricing-header">
        <h1>Simple, Transparent Pricing</h1>
        <p>
          Choose the plan that fits your career goals. Upgrade or downgrade at
          any time.
        </p>
      </div>

      <div className="pricing-grid">
        {pricingTiers.map((tier) => (
          <PricingCard key={tier.name} tier={tier} />
        ))}
      </div>

      <div className="pricing-faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>Can I cancel anytime?</h3>
            <p>
              Yes, you can cancel your subscription at any time. You'll continue
              to have access until the end of your billing period.
            </p>
          </div>
          <div className="faq-item">
            <h3>Is there a free trial?</h3>
            <p>
              Our Free plan is available forever at no cost. You can upgrade
              whenever you're ready for more features.
            </p>
          </div>
          <div className="faq-item">
            <h3>What payment methods are accepted?</h3>
            <p>
              We accept all major credit cards, debit cards, and other payment
              methods through our secure Stripe payment system.
            </p>
          </div>
          <div className="faq-item">
            <h3>Can I switch plans?</h3>
            <p>
              Absolutely! You can upgrade or downgrade your plan at any time.
              Changes take effect at the start of your next billing cycle.
            </p>
          </div>
        </div>
      </div>

      <div className="pricing-cta">
        <p>
          Still have questions?{' '}
          <Link to="/signup" className="auth-link">
            Start for free
          </Link>{' '}
          and explore all features.
        </p>
      </div>
    </div>
  );
};

export default Pricing;

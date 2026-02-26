import React from 'react';
import { PricingTier } from '../types';

interface PricingCardProps {
  tier: PricingTier;
}

const PricingCard: React.FC<PricingCardProps> = ({ tier }) => {
  const handleSelect = () => {
    if (tier.stripeLink) {
      window.location.href = tier.stripeLink;
    }
  };

  return (
    <div className={`pricing-card ${tier.recommended ? 'pricing-card-recommended' : ''}`}>
      {tier.recommended && <div className="pricing-badge">Most Popular</div>}
      <div className="pricing-card-header">
        <h3 className="pricing-tier-name">{tier.name}</h3>
        <div className="pricing-price">
          {tier.price === 0 ? (
            <span className="price-free">Free</span>
          ) : (
            <>
              <span className="price-currency">$</span>
              <span className="price-amount">{tier.price}</span>
              <span className="price-period">/month</span>
            </>
          )}
        </div>
      </div>
      <ul className="pricing-features">
        {tier.features.map((feature, index) => (
          <li key={index} className="pricing-feature">
            <span className="feature-check">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      <button
        className={`btn ${tier.recommended ? 'btn-primary' : tier.price === 0 ? 'btn-outline' : 'btn-secondary'} pricing-btn`}
        onClick={handleSelect}
        disabled={!tier.stripeLink && tier.price > 0}
      >
        {tier.price === 0 ? 'Get Started Free' : `Subscribe to ${tier.name}`}
      </button>
    </div>
  );
};

export default PricingCard;

import React, { useEffect } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-buy-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'buy-button-id': string;
        'publishable-key': string;
      };
    }
  }
}

export function StripePaymentButton() {
  useEffect(() => {
    const scriptId = 'stripe-buy-button-script';
    
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://js.stripe.com/v3/buy-button.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full">
      <stripe-buy-button
        buy-button-id="buy_btn_1QbX7cG4v6p3MzGm0yNUJtAd"
        publishable-key="pk_live_51QbHiWG4v6p3MzGmT6JpK5OOH1Ahk0pPI5zM0YkgbxPnYr46bAtrpkKoyJe1sm8EWXD5AW2V2bUp19HviGDFJQT500rPMFW9mH"
      />
    </div>
  );
}
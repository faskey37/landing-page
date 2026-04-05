// app/components/ReCaptcha.tsx
'use client';

import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    grecaptcha: any;
    onRecaptchaLoad: () => void;
  }
}

interface ReCaptchaProps {
  onVerify: (token: string) => void;
  siteKey: string;
}

export const ReCaptcha: React.FC<ReCaptchaProps> = ({ onVerify, siteKey }) => {
  const widgetId = useRef<number | null>(null);

  useEffect(() => {
    if (!window.grecaptcha) {
      window.onRecaptchaLoad = () => {
        widgetId.current = window.grecaptcha.render('recaptcha-container', {
          sitekey: siteKey,
          callback: onVerify,
        });
      };
      
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    } else if (window.grecaptcha && !widgetId.current) {
      widgetId.current = window.grecaptcha.render('recaptcha-container', {
        sitekey: siteKey,
        callback: onVerify,
      });
    }
  }, [onVerify, siteKey]);

  return <div id="recaptcha-container" />;
};
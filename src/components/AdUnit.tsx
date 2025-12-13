
import React, { useEffect, useRef } from 'react';

interface AdUnitProps {
  slotId: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const AdUnit: React.FC<AdUnitProps> = ({ 
  slotId, 
  format = 'auto', 
  responsive = true,
  className = "",
  style = { display: 'block' } 
}) => {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense Error:", e);
    }
  }, []);

  return (
    <div className={`ad-container my-8 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-900 flex justify-center items-center min-h-[100px] ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" 
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
        ref={adRef}
      />
      <span className="text-[10px] text-slate-400 dark:text-slate-600 absolute top-2 right-2 pointer-events-none">Advertisement</span>
    </div>
  );
};

export default AdUnit;
import React, { useEffect, useState } from 'react';
import { Copy } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 300); // Wait for transition to finish before full unmount
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible && !show) return null;

  return (
    <div 
      className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[100] transition-all duration-300 ease-out ${
        show ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
      }`}
    >
      <div className="flex items-center gap-3 px-6 py-3 bg-slate-800/90 backdrop-blur-md text-white rounded-full shadow-2xl border border-white/10">
        <div className="p-1 bg-green-500/20 rounded-full">
          <Copy size={16} className="text-green-400" />
        </div>
        <span className="font-medium text-sm">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
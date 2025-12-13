import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  velocity: { x: number; y: number };
  life: number;
  scale: number;
}

interface ReactionOverlayProps {
  triggerEmoji: string | null;
  onComplete: () => void;
}

const REACTION_MAP: Record<string, string[]> = {
  '❤️': ['❤️', '💖', '💕', '💗'],
  '😂': ['😂', '🤣', '😹', '💀'],
  '🔥': ['🔥', '💥', '✨', '⚡️'],
  '🎉': ['🎉', '🎊', '🥳', '✨'],
  '👍': ['👍', '🌟', '💯', '✅'],
  '😭': ['😭', '💧', '🌊', '☔️'],
  '🙏': ['🙏', '✨', '🕊️', '🤍'],
};

const ReactionOverlay: React.FC<ReactionOverlayProps> = ({ triggerEmoji, onComplete }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!triggerEmoji) return;

    // Determine which particle set to use based on the emoji clicked
    // If specific match found in map, use it. Otherwise, default to sparkles if it's a smiley, or just the emoji itself.
    let particleSet = REACTION_MAP[triggerEmoji];
    
    // Loose matching for other hearts/smileys not explicitly mapped
    if (!particleSet) {
        if (triggerEmoji.includes('heart') || triggerEmoji === '🧡' || triggerEmoji === '💛' || triggerEmoji === '💚' || triggerEmoji === '💙' || triggerEmoji === '💜') {
            particleSet = ['❤️', '💖', '✨'];
        } else {
            // Default burst of the clicked emoji + sparkles
            particleSet = [triggerEmoji, triggerEmoji, '✨', '💫'];
        }
    }

    // Spawn particles (burst from center bottom)
    const newParticles: Particle[] = [];
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: 50, // Start middle (percent)
        y: 80, // Start lower middle (percent)
        emoji: particleSet[Math.floor(Math.random() * particleSet.length)],
        velocity: {
          x: (Math.random() - 0.5) * 2, // Random spread left/right
          y: -1.5 - Math.random() * 2, // Upward force
        },
        life: 1.0,
        scale: 0.5 + Math.random() * 1.5
      });
    }

    setParticles(newParticles);

    // Cleanup trigger in parent
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);

  }, [triggerEmoji, onComplete]);

  // Animation Loop
  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles(prev => {
        const updated = prev.map(p => ({
          ...p,
          x: p.x + p.velocity.x,
          y: p.y + p.velocity.y,
          velocity: {
            x: p.velocity.x * 0.98, // Air resistance
            y: p.velocity.y + 0.05, // Gravity
          },
          life: p.life - 0.02
        })).filter(p => p.life > 0);
        
        return updated;
      });
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [particles.length]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[150] overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute will-change-transform select-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: '2rem',
            transform: `scale(${p.scale})`,
            opacity: p.life,
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
};

export default ReactionOverlay;
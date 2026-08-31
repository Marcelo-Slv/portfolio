import { gsap } from 'gsap';

export type RevealPreset = 'up' | 'clip' | 'left' | 'right' | 'fade' | 'flip';

interface Preset {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
}

export const REVEAL_PRESETS: Record<RevealPreset, Preset> = {
  up: {
    from: { autoAlpha: 0, y: 34, filter: 'blur(6px)' },
    to: { autoAlpha: 1, y: 0, filter: 'blur(0px)' },
  },
  clip: {
    from: { autoAlpha: 0, clipPath: 'inset(0 0 100% 0)', y: -6 },
    to: { autoAlpha: 1, clipPath: 'inset(0 0 0% 0)', y: 0 },
  },
  left: {
    from: { autoAlpha: 0, x: -48 },
    to: { autoAlpha: 1, x: 0 },
  },
  right: {
    from: { autoAlpha: 0, x: 48 },
    to: { autoAlpha: 1, x: 0 },
  },
  fade: {
    from: { autoAlpha: 0 },
    to: { autoAlpha: 1 },
  },
  flip: {
    from: { autoAlpha: 0, rotateX: -72, y: 70, transformOrigin: '50% 100%' },
    to: { autoAlpha: 1, rotateX: 0, y: 0, transformOrigin: '50% 100%' },
  },
};

export function getRevealPreset(value?: string | null): RevealPreset {
  if (value && value in REVEAL_PRESETS) return value as RevealPreset;
  return 'up';
}

export const EASE_OUT = 'expo.out';

export const prefersReduced = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const gsapAvailable = (): boolean => !!gsap && typeof gsap.to === 'function';
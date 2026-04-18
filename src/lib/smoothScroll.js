import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

export function initSmoothScroll() {
  if (lenisInstance) return lenisInstance;
  if (typeof window === 'undefined') return null;

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  lenisInstance = lenis;
  return lenis;
}

export function destroySmoothScroll() {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}

export function scrollToSelector(selector, opts = {}) {
  const el = document.querySelector(selector);
  if (!el) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset: -80, duration: 1.5, ...opts });
  } else {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

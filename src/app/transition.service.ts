import { Injectable, signal } from '@angular/core';
import gsap from 'gsap';
import { gsapAvailable, prefersReduced } from './directives/presets';

const OVERLAY_SELECTOR = '.transition-overlay';
const PANELS = '.transition-overlay span';

/**
 * Transição de página em cortina: duas abas escuras cobrem a tela,
 * a nova rota renderiza por trás e as abas se abrem revelando o conteúdo.
 */
@Injectable({ providedIn: 'root' })
export class TransitionService {
  readonly busy = signal(false);

  constructor() {
    window.addEventListener('resize', () => this.setupPanels());
  }

  private setupPanels(): void {
    const panels = document.querySelectorAll(PANELS);
    panels.forEach((p) => {
      p.setAttribute('style', 'transform: translateY(101%)');
    });
  }

  cover(): Promise<void> {
    this.busy.set(true);
    const root = document.querySelector(OVERLAY_SELECTOR);
    if (!root || prefersReduced() || !gsapAvailable()) {
      this.busy.set(false);
      return Promise.resolve();
    }
    root.classList.add('is-active');
    return new Promise((resolve) => {
      gsap
        .timeline()
        .to(PANELS, {
          yPercent: 0,
          duration: 0.6,
          ease: 'power4.inOut',
          stagger: 0.08,
        })
        .eventCallback('onComplete', resolve);
    });
  }

  reveal(): Promise<void> {
    const root = document.querySelector(OVERLAY_SELECTOR);
    if (!root || prefersReduced() || !gsapAvailable()) {
      this.busy.set(false);
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      gsap
        .timeline()
        .to(PANELS, {
          yPercent: -101,
          duration: 0.75,
          ease: 'power4.inOut',
          stagger: 0.1,
          delay: 0.05,
        })
        .eventCallback('onComplete', () => {
          root.classList.remove('is-active');
          this.setupPanels();
          this.busy.set(false);
          resolve();
        });
    });
  }

  /** Conveniência: cobre, navega (já disparado pelo router), revela. */
  async transitionThrough(): Promise<void> {
    await this.cover();
    gsap.delayedCall(0.6, () => this.reveal());
  }
}
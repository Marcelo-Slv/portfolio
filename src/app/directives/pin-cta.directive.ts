import { AfterViewInit, Directive, ElementRef, NgZone, OnDestroy } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsapAvailable, prefersReduced } from './presets';

gsap.registerPlugin(ScrollTrigger);

const DESKTOP = () => window.matchMedia('(min-width: 768px)').matches;

/**
 * CTA "pinned": a faixa fica presa na tela enquanto as linhas do título
 * deslizam em sentidos opostos e o fundo gira (scrub).
 * Em telas pequenas vira só o movimento, sem pin.
 */
@Directive({
  selector: '[appPinCta]',
  standalone: true,
})
export class PinCtaDirective implements AfterViewInit, OnDestroy {
  private trigger: ScrollTrigger | null = null;

  constructor(
    private el: ElementRef<HTMLElement>,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    if (prefersReduced() || !gsapAvailable()) return;

    const root = this.el.nativeElement;
    const lines = Array.from(root.querySelectorAll<HTMLElement>('.line-mask .inner'));
    const bg = root.querySelector('.cta-strip__bg') as HTMLElement | null;

    this.ngZone.runOutsideAngular(() => {
      const scrub = gsap.timeline({ defaults: { ease: 'none' } });
      if (lines[0]) scrub.fromTo(lines[0], { xPercent: 5 }, { xPercent: -5 }, 0);
      if (lines[1]) scrub.fromTo(lines[1], { xPercent: -5 }, { xPercent: 5 }, 0);
      if (bg) scrub.fromTo(bg, { rotation: 0, scale: 1 }, { rotation: 120, scale: 1.5 }, 0);

      this.trigger = ScrollTrigger.create({
        trigger: root,
        start: DESKTOP() ? 'top top' : 'top bottom',
        end: DESKTOP() ? '+=1400' : '+=600',
        pin: DESKTOP(),
        scrub: 1.2,
        animation: scrub,
      });
    });
  }

  ngOnDestroy(): void {
    this.trigger?.kill();
  }
}
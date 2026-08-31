import { AfterViewInit, Directive, ElementRef, NgZone, OnDestroy } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsapAvailable, prefersReduced } from './presets';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero com parallax de scroll: título e camadas sobem em velocidades
 * diferentes e esmaecem conforme o usuário rola para a próxima seção.
 */
@Directive({
  selector: '[appHeroParallax]',
  standalone: true,
})
export class HeroParallaxDirective implements AfterViewInit, OnDestroy {
  private trigger: ScrollTrigger | null = null;

  constructor(
    private el: ElementRef<HTMLElement>,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    if (prefersReduced() || !gsapAvailable()) return;

    const root = this.el.nativeElement;
    const title = root.querySelector('.hero__title') as HTMLElement | null;
    const eyebrow = root.querySelector('.hero__eyebrow') as HTMLElement | null;
    if (!title) return;

    this.ngZone.runOutsideAngular(() => {
      const tween = gsap.timeline();
      tween
        .to(title, { yPercent: -22, opacity: 0.35, ease: 'none' }, 0)
        .to(eyebrow, { yPercent: -40, opacity: 0, ease: 'none' }, 0)
        .to(root.querySelectorAll('.hero__meta, .hero__cta, .hero__scroll'), {
          yPercent: -16,
          opacity: 0,
          ease: 'none',
        }, 0);

      this.trigger = ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: 'bottom 20%',
        scrub: 0.6,
        animation: tween,
      });
    });
  }

  ngOnDestroy(): void {
    this.trigger?.kill();
  }
}
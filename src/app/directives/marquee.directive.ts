import { AfterViewInit, Directive, ElementRef, NgZone, OnDestroy } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsapAvailable, prefersReduced } from './presets';

gsap.registerPlugin(ScrollTrigger);

/**
 * Marquee com velocidade reativa ao scroll: o ritmo do ticker acelera
 * conforme a velocidade de rolagem e relaxa quando o scroll para.
 * O conteúdo de .marquee__track já deve estar duplicado (2 cópias).
 */
@Directive({
  selector: '[appMarquee]',
  standalone: true,
})
export class MarqueeDirective implements AfterViewInit, OnDestroy {
  private tween: gsap.core.Tween | null = null;
  private trigger: ScrollTrigger | null = null;

  constructor(
    private el: ElementRef<HTMLElement>,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    if (prefersReduced() || !gsapAvailable()) return;

    const root = this.el.nativeElement;
    const track = root.querySelector('.marquee__track') as HTMLElement | null;
    if (!track) return;

    this.ngZone.runOutsideAngular(() => {
      this.tween = gsap.to(track, { x: '-50%', duration: 24, ease: 'none', repeat: -1 });

      this.trigger = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          if (!this.tween) return;
          const vel = Math.abs(self.getVelocity());
          const target = vel > 8 ? Math.min(1 + vel / 900, 7) : 1;
          gsap.to(this.tween, { timeScale: target, duration: 0.6, overwrite: true });
        },
      });
    });
  }

  ngOnDestroy(): void {
    this.trigger?.kill();
    this.tween?.kill();
  }
}
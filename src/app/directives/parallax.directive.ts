import { AfterViewInit, Directive, ElementRef, NgZone, OnDestroy } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsapAvailable, prefersReduced } from './presets';

gsap.registerPlugin(ScrollTrigger);

/**
 * Parallax genérico: o elemento anda para o eixo selecionado conforme a
 * seção-pai cruza a viewport. Uso: <span appParallax="0.16" appParallaxAxis="y">
 * speed = fração da viewport percorrida (positivo desce, negativo sobe).
 */
@Directive({
  selector: '[appParallax]',
  standalone: true,
})
export class ParallaxDirective implements AfterViewInit, OnDestroy {
  private trigger: ScrollTrigger | null = null;

  constructor(
    private el: ElementRef<HTMLElement>,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    if (prefersReduced() || !gsapAvailable()) return;

    const node = this.el.nativeElement;
    const speed = Number(this.el.nativeElement.getAttribute('appParallax') || 0.1);
    const axis = this.el.nativeElement.getAttribute('appParallaxAxis') === 'x' ? 'x' : 'y';
    const host = (node.parentElement ?? node) as HTMLElement;
    const dist = speed * window.innerHeight;

    this.ngZone.runOutsideAngular(() => {
      this.trigger = ScrollTrigger.create({
        trigger: host,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          gsap.set(node, { [axis]: (self.progress - 0.5) * 2 * dist });
        },
      });
    });
  }

  ngOnDestroy(): void {
    this.trigger?.kill();
  }
}
import { Directive, ElementRef, HostListener, NgZone, OnInit } from '@angular/core';
import gsap from 'gsap';
import { gsapAvailable, prefersReduced } from './presets';

/**
 * Atração magnética: o elemento "puxa" em direção ao cursor.
 * Use em .btn, .nav__cta.
 */
@Directive({
  selector: '[appMagnet]',
  standalone: true,
})
export class MagnetDirective implements OnInit {
  private strength = 16;

  constructor(
    private el: ElementRef<HTMLElement>,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    if (prefersReduced() || !gsapAvailable()) return;
    this.ngZone.runOutsideAngular(() => {
      gsap.set(this.el.nativeElement, { willChange: 'transform' });
    });
  }

  @HostListener('pointermove', ['$event'])
  onMove(e: PointerEvent): void {
    if (prefersReduced() || !gsapAvailable()) return;
    const node = this.el.nativeElement;
    const r = node.getBoundingClientRect();
    const relX = e.clientX - (r.left + r.width / 2);
    const relY = e.clientY - (r.top + r.height / 2);

    gsap.to(node, {
      x: (relX / r.width) * this.strength,
      y: (relY / r.height) * this.strength,
      duration: 0.5,
      ease: 'power3.out',
    });
  }

  @HostListener('pointerleave')
  onLeave(): void {
    if (prefersReduced() || !gsapAvailable()) return;
    gsap.to(this.el.nativeElement, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
  }
}
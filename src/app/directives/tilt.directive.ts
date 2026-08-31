import { Directive, ElementRef, HostListener, NgZone, OnInit } from '@angular/core';
import gsap from 'gsap';
import { gsapAvailable, prefersReduced } from './presets';

/**
 * Tilt 3D acompanhando o mouse + brilho local (--gx/--gy).
 * Use em .skill-card, .profile, .project-card, .social-link.
 */
@Directive({
  selector: '[appTilt]',
  standalone: true,
})
export class TiltDirective implements OnInit {
  private strength = 8;

  constructor(
    private el: ElementRef<HTMLElement>,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    if (prefersReduced() || !gsapAvailable()) return;
    this.ngZone.runOutsideAngular(() => {
      const node = this.el.nativeElement;
      gsap.set(node, { transformPerspective: 800, transformStyle: 'preserve-3d' });
    });
  }

  @HostListener('pointermove', ['$event'])
  onMove(e: PointerEvent): void {
    if (prefersReduced() || !gsapAvailable()) return;
    const node = this.el.nativeElement;
    const r = node.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;

    node.style.setProperty('--gx', `${(px + 0.5) * 100}%`);
    node.style.setProperty('--gy', `${(py + 0.5) * 100}%`);

    gsap.to(node, {
      rotateX: py * -this.strength,
      rotateY: px * this.strength,
      duration: 0.45,
      ease: 'power2.out',
    });
  }

  @HostListener('pointerleave')
  onLeave(): void {
    if (prefersReduced() || !gsapAvailable()) return;
    gsap.to(this.el.nativeElement, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power2.out',
    });
  }
}
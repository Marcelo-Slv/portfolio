import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import gsap from 'gsap';
import { EASE_OUT, REVEAL_PRESETS, getRevealPreset, gsapAvailable, prefersReduced } from './presets';

/**
 * Revela o elemento quando ele entra na viewport.
 * Presets: up | clip | left | right | fade.
 * Dentro de um [appRevealGroup], esta diretiva é o filho animado (grupo cuida do stagger).
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input() appReveal: string | undefined;
  @Input() appRevealDelay = 0;

  private destroyed = false;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const node = this.el.nativeElement;
    if (prefersReduced() || !gsapAvailable()) return;
    if (node.closest('[appRevealGroup]')) return; // o grupo gerencia

    const preset = REVEAL_PRESETS[getRevealPreset(this.appReveal)];
    gsap.fromTo(
      node,
      preset.from,
      {
        ...preset.to,
        duration: 1,
        ease: EASE_OUT,
        delay: this.appRevealDelay,
        scrollTrigger: { trigger: node, start: 'top 88%', once: true },
      },
    );
  }

  ngOnDestroy(): void {
    this.destroyed = true;
  }
}
import { AfterViewInit, Directive, ElementRef, effect, EffectRef, inject, OnDestroy } from '@angular/core';
import gsap from 'gsap';
import { UiStateService } from './ui-state.service';
import { gsapAvailable, prefersReduced } from './directives/presets';

/**
 * Anima os elementos [data-anim] de uma página quando ela aparece,
 * sincronizado com o fim do preloader / abertura da cortina.
 * Presets via data-anim: "mask" | "up" | "fade" | "left" | "right".
 */
@Directive({
  selector: '[pageIntro]',
  standalone: true,
})
export class PageIntroDirective implements AfterViewInit, OnDestroy {
  private ui = inject(UiStateService);
  private cleanup: EffectRef | null = null;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    if (prefersReduced() || !gsapAvailable()) return;

    const root = this.el.nativeElement;
    const play = () => this.play(root);

    // Primeira carga: espera o preloader terminar.
    // Navegações: aguarda a cortina abrir (~0.9s).
    if (this.ui.ready()) {
      window.setTimeout(play, 900);
    } else {
      this.cleanup = effect(() => {
        if (this.ui.ready()) play();
      });
    }
  }

  private play(root: HTMLElement): void {
    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-anim]'));
    if (!items.length) return;

    gsap.set(items, { autoAlpha: 0 });
    const tl = gsap.timeline({ delay: 0.05, defaults: { ease: 'power3.out' } });

    items.forEach((node) => {
      const preset = node.getAttribute('data-anim') || 'up';
      const isMask = preset === 'mask';
      tl.fromTo(
        node,
        start(preset),
        { ...end(preset), duration: isMask ? 1.15 : 0.9, ease: isMask ? 'expo.out' : 'power3.out' },
        0.08
      );
    });
  }

  ngOnDestroy(): void {
    this.cleanup?.destroy();
  }
}

function start(preset: string): gsap.TweenVars {
  switch (preset) {
    case 'mask':
      return { yPercent: 118 };
    case 'left':
      return { x: -46, autoAlpha: 0 };
    case 'right':
      return { x: 46, autoAlpha: 0 };
    case 'fade':
      return { autoAlpha: 0 };
    default:
      return { y: 38, autoAlpha: 0, filter: 'blur(4px)' };
  }
}

function end(preset: string): Record<string, unknown> {
  switch (preset) {
    case 'mask':
      return { yPercent: 0, autoAlpha: 1 };
    case 'left':
    case 'right':
      return { x: 0, autoAlpha: 1 };
    case 'fade':
      return { autoAlpha: 1 };
    default:
      return { y: 0, autoAlpha: 1, filter: 'blur(0px)' };
  }
}
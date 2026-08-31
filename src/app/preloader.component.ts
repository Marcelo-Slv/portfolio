import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, NgZone, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { gsapAvailable, prefersReduced } from './directives/presets';

/**
 * Preloader tipográfico: nome entra letra a letra, barra cresce e a
 * marca "sobe" como uma cortina. Sem símbolos — só tipografia.
 */
@Component({
  selector: 'app-preloader',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div class="preloader">
      <h1 class="preloader__name" aria-label="Marcelo Expedito">
        <span *ngFor="let ch of first" class="char" data-char>{{ ch }}</span>
        <span *ngFor="let ch of second" class="char" data-char>{{ ch }}</span>
      </h1>
      <p class="preloader__meta"><span class="inner">Desenvolvedor Full Stack</span></p>
      <div class="preloader__bar"><i></i></div>
    </div>
  `,
})
export class PreloaderComponent implements AfterViewInit, OnDestroy {
  readonly first = [...'MARCELO '];
  readonly second = [...'EXPEDITO'];

  @Output() done = new EventEmitter<void>();

  constructor(
    private host: ElementRef<HTMLElement>,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    const root = this.host.nativeElement;

    if (prefersReduced() || !gsapAvailable()) {
      this.done.emit();
      root.remove();
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      const chars = root.querySelectorAll<HTMLElement>('.char');
      gsap.set(chars, { opacity: 0, y: 46, rotateZ: 6 });
      gsap.set('.preloader__meta .inner', { yPercent: 110 });

      const tl = gsap.timeline();
      tl.to(chars, {
        opacity: 1,
        y: 0,
        rotateZ: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.045,
      })
        .to('.preloader__meta .inner', { yPercent: 0, duration: 0.45, ease: 'power2.out' }, '<0.3')
        .fromTo('.preloader__bar i', { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power2.inOut' }, 0.5)
        .to(
          root,
          {
            yPercent: -100,
            duration: 0.85,
            ease: 'expo.inOut',
            onComplete: () => {
              this.done.emit();
              root.remove();
            },
          },
          '+=0.15'
        );
    });
  }

  ngOnDestroy(): void {
    /* nada a limpar além dos tweens (gsap morre com o DOM) */
  }
}
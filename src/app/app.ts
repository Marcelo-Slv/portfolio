import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import gsap from 'gsap';
import { NavComponent } from './ui/nav.component';
import { FooterComponent } from './ui/footer.component';
import { PreloaderComponent } from './preloader.component';
import { TransitionService } from './transition.service';
import { UiStateService } from './ui-state.service';
import { gsapAvailable, prefersReduced } from './directives/presets';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterOutlet, NavComponent, FooterComponent, PreloaderComponent],
  template: `
    <div class="cursor" aria-hidden="true">
      <span class="cursor__dot"></span>
      <span class="cursor__ring"></span>
    </div>
    <div class="scroll-progress" aria-hidden="true"></div>

    <div class="transition-overlay" aria-hidden="true">
      <span></span><span></span>
    </div>

    <app-preloader *ngIf="preloading" (done)="onPreloaderDone()" />

    <app-nav *ngIf="!preloading" />

    <main>
      <router-outlet />
    </main>

    <app-footer *ngIf="!preloading" />
  `,
})
export class App implements OnInit, AfterViewInit, OnDestroy {
  preloading = true;
  private sub: Subscription | null = null;
  private cursorCleanup: (() => void) | null = null;

  constructor(
    private router: Router,
    private transitions: TransitionService,
    private ui: UiStateService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.sub = this.router.events
      .pipe(
        filter(
          (e): e is NavigationStart | NavigationEnd =>
            e instanceof NavigationStart || e instanceof NavigationEnd
        )
      )
      .subscribe((e) => {
        this.ngZone.runOutsideAngular(() => {
          if (e instanceof NavigationStart && e.navigationTrigger === 'imperative') {
            void this.transitions.cover();
          } else if (e instanceof NavigationEnd) {
            window.scrollTo(0, 0);
            window.setTimeout(() => void this.transitions.reveal(), 60);
          }
        });
      });
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll, { passive: true });
      this.initCursor();
    });
  }

  private onScroll = (): void => {
    const nav = document.querySelector('#nav');
    if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 40);

    const bar = document.querySelector<HTMLElement>('.scroll-progress');
    if (bar) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      bar.style.transform = `scaleX(${p})`;
    }
  };

  private initCursor(): void {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (prefersReduced() || !gsapAvailable()) return;

    const root = document.querySelector('.cursor') as HTMLElement | null;
    const dot = root?.querySelector('.cursor__dot') as HTMLElement | null;
    const ring = root?.querySelector('.cursor__ring') as HTMLElement | null;
    if (!root || !dot || !ring) return;

    document.documentElement.classList.add('has-cursor');

    const INTERACTIVE = 'a, button, input, textarea, select, label, [appTilt], [appMagnet], .tag, .work-row, .channel';
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.06, ease: 'power2.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.06, ease: 'power2.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.42, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.42, ease: 'power3.out' });

    const onMove = (e: MouseEvent): void => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };
    const inInteractive = (t: EventTarget | null): boolean =>
      t instanceof Element ? !!t.closest(INTERACTIVE) : false;
    const onOver = (e: MouseEvent): void => {
      root.classList.toggle('is-hover', inInteractive(e.target));
    };
    const onOut = (e: MouseEvent): void => {
      root.classList.toggle('is-hover', inInteractive(e.relatedTarget));
    };
    const onLeave = (): void => root.classList.remove('is-visible');
    const onEnter = (): void => root.classList.add('is-visible');

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseout', onOut, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    this.cursorCleanup = () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      document.documentElement.classList.remove('has-cursor');
    };
  }

  onPreloaderDone(): void {
    this.preloading = false;
    this.ui.markReady();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.cursorCleanup?.();
    window.removeEventListener('scroll', this.onScroll);
  }
}
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconDirective } from '../icon.directive';
import { MagnetDirective } from '../directives/magnet.directive';

@Component({
  selector: 'app-nav',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, RouterLinkActive, IconDirective, MagnetDirective],
  template: `
    <nav class="nav" id="nav">
      <a class="nav__logo" routerLink="/">Marcelo<em>.</em></a>

      <div class="nav__links" [class.is-open]="open()">
        <span class="nav__link-close" (click)="open.set(false)" role="button" tabindex="0">×</span>
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" (click)="open.set(false)">Home</a>
        <a routerLink="/work" routerLinkActive="active" (click)="open.set(false)">Trabalhos</a>
        <a routerLink="/about" routerLinkActive="active" (click)="open.set(false)">Sobre</a>
        <a routerLink="/contact" routerLinkActive="active" (click)="open.set(false)">Contato</a>
      </div>

      <a class="nav__cta" routerLink="/contact" appMagnet>
        Vamos conversar
        <svg appIcon="arrowUpRight"></svg>
      </a>

      <button class="nav__burger" [attr.aria-expanded]="open()" (click)="open.set(!open())" aria-label="Menu">
        <i></i><i></i><i></i>
      </button>
    </nav>
  `,
})
export class NavComponent {
  readonly open = signal(false);
}
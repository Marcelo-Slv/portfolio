import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageIntroDirective } from '../../page-intro.directive';
import { RevealDirective } from '../../directives/reveal.directive';
import { ParallaxDirective } from '../../directives/parallax.directive';
import { IconDirective } from '../../icon.directive';
import { PROJECTS, Cat } from '../../projects.data';

type Filter = 'tudo' | Cat;

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'tudo', label: 'Tudo' },
  { key: 'web', label: 'Web' },
  { key: 'sistema', label: 'Sistemas' },
  { key: 'design', label: 'Design' },
  { key: 'estudos', label: 'Estudos' },
];

@Component({
  selector: 'app-work',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, PageIntroDirective, RevealDirective, ParallaxDirective, IconDirective],
  template: `
    <div class="page" pageIntro>
      <section class="section section--has-num" style="padding-top: 30px">
        <span class="section-num" appParallax="0.2" aria-hidden="true">01</span>
        <header class="section-head" data-anim="up">
          <p class="section-head__label"><i></i>Portfólio</p>
          <h1 class="section-head__title">Projetos &amp; experimentos.</h1>
          <p class="section-head__desc">
            Sistemas, interfaces e marcas que desenvolvi no caminho para me tornar Full Stack.
          </p>
        </header>

        <div class="work-filter" data-anim="fade">
          <button
            *ngFor="let f of filters"
            (click)="apply(f.key)"
            [class.active]="active() === f.key"
          >
            {{ f.label }}
          </button>
        </div>

        <div class="works-list">
          <a
            *ngFor="let p of filtered(); let i = index"
            class="work-row"
            [href]="p.url"
            target="_blank"
            rel="noopener"
            appReveal="up"
            [appRevealDelay]="(i % 4) * 0.06"
          >
            <span class="work-row__num">0{{ p.id }}</span>
            <span class="work-row__title">
              <span class="swatch" [style.--c1]="p.c1" [style.--c2]="p.c2"></span>
              {{ p.title }}
              <span class="cat">{{ p.catLabel }} — {{ p.year }}</span>
            </span>
            <span class="work-row__arrow"><svg appIcon="arrowUpRight"></svg></span>
          </a>
        </div>
      </section>
    </div>
  `,
})
export class WorkComponent {
  readonly filters = FILTERS;
  readonly active = signal<Filter>('tudo');

  readonly all = PROJECTS;

  filtered() {
    return this.active() === 'tudo' ? this.all : this.all.filter((p) => p.cat === this.active());
  }

  apply(key: Filter): void {
    this.active.set(key);
  }
}
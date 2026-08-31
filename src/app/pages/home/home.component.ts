import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PageIntroDirective } from '../../page-intro.directive';
import { RevealDirective } from '../../directives/reveal.directive';
import { TiltDirective } from '../../directives/tilt.directive';
import { ParallaxDirective } from '../../directives/parallax.directive';
import { HeroParallaxDirective } from '../../directives/hero-parallax.directive';
import { ParticlesDirective } from '../../directives/particles.directive';
import { MarqueeDirective } from '../../directives/marquee.directive';
import { MagnetDirective } from '../../directives/magnet.directive';
import { PinCtaDirective } from '../../directives/pin-cta.directive';
import { IconDirective } from '../../icon.directive';
import { PROJECTS, MARQUEE_ITEMS } from '../../projects.data';

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterLink,
    PageIntroDirective,
    RevealDirective,
    TiltDirective,
    ParallaxDirective,
    HeroParallaxDirective,
    ParticlesDirective,
    MarqueeDirective,
    MagnetDirective,
    PinCtaDirective,
    IconDirective,
  ],
  template: `
    <div class="page" pageIntro>
      <!-- HERO -->
      <section class="hero" appHeroParallax>
        <canvas class="hero__canvas" appParticles aria-hidden="true"></canvas>

        <p class="hero__eyebrow" data-anim="up"><i></i>Desenvolvedor Full Stack — São Paulo, Brasil</p>

        <h1 class="hero__title">
          <span class="line-mask"><span class="inner" data-anim="mask">Marcelo</span></span>
          <span class="line-mask"><span class="inner" data-anim="mask">Expedito<em class="accent">.</em></span></span>
        </h1>

        <div class="hero__meta">
          <span>Estudante de Desenvolvimento de Sistemas</span>
          <span class="dot"></span>
          <span>Etec Horácio Augusto da Silveira</span>
          <span class="dot"></span>
          <span>Full Stack em formação</span>
        </div>

        <div class="hero__cta" data-anim="fade">
          <a class="btn btn--accent" routerLink="/work" appMagnet>
            Ver trabalhos
            <svg appIcon="arrowRight"></svg>
          </a>
          <a class="btn" routerLink="/about" appMagnet>Sobre mim</a>
        </div>

        <p class="hero__scroll" aria-hidden="true"><i></i><span>scroll</span></p>
      </section>

      <!-- MARQUEE -->
      <div class="marquee" appMarquee aria-hidden="true">
        <div class="marquee__track">
          <ng-container *ngFor="let _ of [0, 1]">
            <span class="item" *ngFor="let tag of marquee">
              {{ tag }} <em class="star">✦</em>
            </span>
          </ng-container>
        </div>
      </div>

      <!-- TRABALHOS SELECIONADOS -->
      <section class="section section--has-num" style="padding-top: 120px">
        <span class="section-num" appParallax="0.2" aria-hidden="true">01</span>
        <header class="section-head">
          <p class="section-head__label" appReveal="up"><i></i>Trabalhos selecionados</p>
          <h2 class="section-head__title" appReveal="up" [appRevealDelay]="0.1">
            Coisas que eu construí <em>com cuidado</em>.
          </h2>
        </header>

        <div class="works-grid">
          <a *ngFor="let p of featured; let i = index" class="work-card" appReveal="clip" [appRevealDelay]="0.08 + i * 0.1" [href]="p.url" target="_blank" rel="noopener">
            <div class="work-card__media" appTilt>
              <div class="cover" [style.--c1]="p.c1" [style.--c2]="p.c2">
                <span class="shape" style="top: 18%; left: 18%"></span>
                <span class="shape" style="bottom: 16%; right: 14%; width: 46px; height: 46px"></span>
                <span class="num">0{{ p.id }}</span>
              </div>
            </div>
            <div class="work-card__body">
              <div>
                <h3>{{ p.title }}</h3>
                <span class="cat">{{ p.catLabel }} — {{ p.year }}</span>
              </div>
              <span class="arrow"><svg appIcon="arrowUpRight"></svg></span>
            </div>
          </a>
        </div>
      </section>

      <!-- O QUE EU FAÇO -->
      <section class="section section--has-num" style="padding-top: 140px">
        <span class="section-num" appParallax="0.24" aria-hidden="true">02</span>
        <header class="section-head section-head--center">
          <p class="section-head__label" appReveal="up"><i></i>O que eu faço</p>
          <h2 class="section-head__title" appReveal="up" [appRevealDelay]="0.1">Do banco de dados ao<br>último pixel.</h2>
        </header>

        <div class="services">
          <article class="service is-tiltable" *ngFor="let s of services; let i = index" appReveal="clip" [appRevealDelay]="0.08 + i * 0.1" appTilt>
            <span class="service__num">0{{ i + 1 }}</span>
            <h3>{{ s.title }}</h3>
            <p>{{ s.desc }}</p>
            <ul>
              <li *ngFor="let item of s.items"><i></i><strong>{{ item }}</strong></li>
            </ul>
          </article>
        </div>
      </section>

      <!-- CTA -->
      <section class="cta-strip" appPinCta>
        <div class="cta-strip__bg"></div>
        <h2 data-anim="mask">
          <span class="line-mask"><span class="inner">Vamos construir </span></span>
          <span class="line-mask"><span class="inner"><em>algo juntos?</em></span></span>
        </h2>
        <a class="btn btn--accent" routerLink="/contact" appMagnet>
          Fale comigo
          <svg appIcon="arrowRight"></svg>
        </a>
      </section>
    </div>
  `,
})
export class HomeComponent {
  readonly featured = PROJECTS.filter((p) => p.featured);
  readonly marquee = MARQUEE_ITEMS;

  readonly services = [
    {
      title: 'Frontend',
      desc: 'Interfaces rápidas e elegantes com Angular, TypeScript e animações em GSAP.',
      items: ['Angular', 'TypeScript', 'GSAP', 'HTML & CSS'],
    },
    {
      title: 'Backend & Dados',
      desc: 'APIs e banco de dados que sustentam o produto por trás da tela.',
      items: ['C# (.NET)', 'SQL & MySQL', 'APIs REST', 'Modelagem'],
    },
    {
      title: 'Design & Estudos',
      desc: 'Ética de sistema, identidade e o hábito de aprender todos os dias.',
      items: ['Design responsivo', 'Acessibilidade', 'Git & GitHub', 'Figma'],
    },
  ];
}
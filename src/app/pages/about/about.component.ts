import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageIntroDirective } from '../../page-intro.directive';
import { RevealDirective } from '../../directives/reveal.directive';
import { RevealGroupDirective } from '../../directives/reveal-group.directive';
import { SkillBarDirective } from '../../directives/skill-bar.directive';
import { ParallaxDirective } from '../../directives/parallax.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    PageIntroDirective,
    RevealDirective,
    RevealGroupDirective,
    SkillBarDirective,
    ParallaxDirective,
  ],
  template: `
    <div class="page" pageIntro>
      <section class="about-hero">
        <p class="section-head__label" data-anim="up"><i></i>Sobre</p>
        <p class="intro-long" data-anim="mask">
          <span class="line-mask"><span class="inner">Eu sou <strong>Marcelo Expedito</strong>,</span></span>
          <span class="line-mask"><span class="inner">desenvolvedor em formação em <em>São Paulo</em>.</span></span>
          <span class="line-mask"><span class="inner">Cada dia eu transformo o que aprendo</span></span>
          <span class="line-mask"><span class="inner">em coisa que <strong>funciona</strong> — e impressiona.</span></span>
        </p>
      </section>

      <section class="section section--has-num" style="padding-bottom: 60px">
        <span class="section-num" appParallax="0.18" aria-hidden="true">01</span>
        <header class="section-head">
          <p class="section-head__label" appReveal="up"><i></i>Trajetória</p>
          <h2 class="section-head__title" appReveal="up" [appRevealDelay]="0.1">O caminho até aqui.</h2>
        </header>

        <div class="timeline">
          <div class="tl-row" appReveal="flip">
            <span class="tl-row__when">2024 — hoje</span>
            <div class="tl-row__what">
              <h3>Técnico em Desenvolvimento de Sistemas</h3>
              <p>Etec Horácio Augusto da Silveira — lógica, orientação a objetos, banco de dados e projetos reais.</p>
              <span class="tag">Etec</span>
            </div>
          </div>
          <div class="tl-row" appReveal="flip" [appRevealDelay]="0.06">
            <span class="tl-row__when">Ensino médio</span>
            <div class="tl-row__what">
              <h3>EE Afrânio Peixoto</h3>
              <p>Formação acadêmica paralela ao curso técnico, com foco em exatas e línguas.</p>
              <span class="tag">EE</span>
            </div>
          </div>
          <div class="tl-row" appReveal="flip" [appRevealDelay]="0.12">
            <span class="tl-row__when">Próximo passo</span>
            <div class="tl-row__what">
              <h3>Alvo: desenvolvedor Full Stack</h3>
              <p>Consolidar o backend com .NET, aprofundar arquitetura de software e virar referência em interfaces animadas.</p>
              <span class="tag">Meta</span>
            </div>
          </div>
        </div>
      </section>

      <section class="section section--has-num" style="padding-bottom: 60px">
        <span class="section-num" appParallax="0.22" aria-hidden="true">02</span>
        <header class="section-head section-head--center">
          <p class="section-head__label" appReveal="up"><i></i>Habilidades</p>
          <h2 class="section-head__title" appReveal="up" [appRevealDelay]="0.1">O que eu já domino.</h2>
        </header>

        <div class="skills-bars">
          <div class="bar-item" *ngFor="let s of skills">
            <div class="bar-head"><b>{{ s.name }}</b><span>{{ s.level }}%</span></div>
            <div class="bar"><i appSkillBar="{{ s.level }}"></i></div>
          </div>
        </div>
      </section>

      <section class="section section--has-num" style="padding-bottom: 120px">
        <span class="section-num" appParallax="0.26" aria-hidden="true">03</span>
        <header class="section-head">
          <p class="section-head__label" appReveal="up"><i></i>Ferramentas</p>
          <h2 class="section-head__title" appReveal="up" [appRevealDelay]="0.1">No meu dia a dia.</h2>
        </header>

        <div class="tag-cloud" appRevealGroup="fade" [appRevealStagger]="0.05">
          <span class="tag" *ngFor="let tag of tags" appReveal="fade">{{ tag }}</span>
        </div>
      </section>
    </div>
  `,
})
export class AboutComponent {
  readonly skills = [
    { name: 'Angular', level: 85 },
    { name: 'TypeScript', level: 82 },
    { name: 'JavaScript', level: 78 },
    { name: 'HTML5 & CSS3', level: 88 },
    { name: 'C# (.NET)', level: 70 },
    { name: 'SQL & MySQL', level: 75 },
    { name: 'Git & GitHub', level: 80 },
    { name: 'UI Design', level: 62 },
  ];

  readonly tags = [
    'Visual Studio',
    'VS Code',
    'Figma',
    'Swagger',
    'Postman',
    'MySQL Workbench',
    'Photoshop',
    'Windows',
    'Linux',
  ];
}
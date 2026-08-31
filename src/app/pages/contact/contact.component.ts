import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { PageIntroDirective } from '../../page-intro.directive';
import { RevealDirective } from '../../directives/reveal.directive';
import { RevealGroupDirective } from '../../directives/reveal-group.directive';
import { TiltDirective } from '../../directives/tilt.directive';
import { ParallaxDirective } from '../../directives/parallax.directive';
import { MagnetDirective } from '../../directives/magnet.directive';
import { IconDirective } from '../../icon.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, PageIntroDirective, RevealDirective, RevealGroupDirective, TiltDirective, ParallaxDirective, MagnetDirective, IconDirective],
  template: `
    <div class="page" pageIntro>
      <section class="contact-hero">
        <p class="section-head__label" data-anim="up"><i></i>Contato</p>
        <h2 data-anim="mask">
          <span class="line-mask"><span class="inner">Vamos conversar</span></span>
          <span class="line-mask"><span class="inner">sobre <em>o seu projeto?</em></span></span>
        </h2>
      </section>

      <section class="section section--has-num" style="padding-bottom: 40px">
        <span class="section-num" appParallax="0.2" aria-hidden="true">01</span>
        <div class="contact-channels" appRevealGroup="up" [appRevealStagger]="0.12">
          <a class="channel" href="https://github.com/Marcelo-Slv" target="_blank" rel="noopener" appReveal="up" appTilt>
            <span class="channel__icon"><svg appIcon="github"></svg></span>
            <h3>GitHub</h3>
            <p>Projetos, experimentos e código aberto.</p>
          </a>
          <a class="channel" href="https://www.linkedin.com/in/marcelo-expedito" target="_blank" rel="noopener" appReveal="up" appTilt>
            <span class="channel__icon"><svg appIcon="linkedin"></svg></span>
            <h3>LinkedIn</h3>
            <p>Carreira, estudos e rede profissional.</p>
          </a>
          <a class="channel" href="mailto:marceloexpedito@gmail.com" appReveal="up" appTilt>
            <span class="channel__icon"><svg appIcon="mail"></svg></span>
            <h3>Email</h3>
            <p>marceloexpedito@gmail.com</p>
          </a>
        </div>

        <form class="contact-form" (ngSubmit)="send(f)" #f="ngForm">
          <div class="field">
            <label for="name">Nome</label>
            <input id="name" name="name" type="text" ngModel required placeholder="Seu nome" />
          </div>
          <div class="field">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" ngModel required placeholder="voce@email.com" />
          </div>
          <div class="field full">
            <label for="message">Mensagem</label>
            <textarea id="message" name="message" ngModel required placeholder="Me conta sobre o seu projeto..."></textarea>
          </div>
          <button class="btn btn--accent" type="submit" [disabled]="sent" appMagnet>
            {{ sent ? 'Enviado!' : 'Enviar mensagem' }}
            <svg appIcon="arrowRight"></svg>
          </button>
        </form>
      </section>
    </div>
  `,
})
export class ContactComponent {
  sent = false;

  send(f: NgForm): void {
    if (f.invalid) return;
    const { name, email, message } = f.value;
    const subject = encodeURIComponent(`Contato via portfólio — ${name || 'sem nome'}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:marceloexpedito@gmail.com?subject=${subject}&body=${body}`;
    this.sent = true;
  }
}
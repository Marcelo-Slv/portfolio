import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconDirective } from '../icon.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconDirective],
  template: `
    <footer class="footer">
      <div class="footer__top">
        <div>
          <p class="footer__logo">Marcelo<em>.</em></p>
          <p class="footer__desc">
            Desenvolvedor Full Stack em formação. São Paulo, Brasil — criando interfaces e sistemas com cuidado.
          </p>
        </div>

        <nav class="footer__nav">
          <a routerLink="/">Home</a>
          <a routerLink="/work">Trabalhos</a>
          <a routerLink="/about">Sobre</a>
          <a routerLink="/contact">Contato</a>
        </nav>

        <div class="footer__social">
          <a href="https://github.com/Marcelo-Slv" target="_blank" rel="noopener" aria-label="GitHub">
            <svg appIcon="github"></svg>
          </a>
          <a href="https://www.linkedin.com/in/marcelo-expedito" target="_blank" rel="noopener" aria-label="LinkedIn">
            <svg appIcon="linkedin"></svg>
          </a>
          <a href="mailto:marceloexpedito@gmail.com" aria-label="Email">
            <svg appIcon="mail"></svg>
          </a>
        </div>
      </div>

      <div class="footer__bottom">
        <span>© {{ year }} Marcelo Expedito</span>
        <a class="top" href="#" (click)="toTop($event)">
          Voltar ao topo
          <svg appIcon="arrowUp"></svg>
        </a>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  readonly year = new Date().getFullYear();

  toTop(e: Event): void {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
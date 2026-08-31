import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

const ICONS: Record<string, string> = {
  arrowUpRight:
    '<path d="M7 17 17 7"/><path d="M9 7h8v8"/>',
  arrowRight:
    '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  arrowUp:
    '<path d="M12 19V5"/><path d="m6 11 6-6 6 6"/>',
  github:
    '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
  linkedin:
    '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v1.5A6 6 0 0 1 16 8z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  mail:
    '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
};

/**
 * Injeta ícones SVG dentro de um <svg appIcon="nome"> de forma confiável.
 * (Corrige o bug em que [innerHTML] em SVG não renderizava nada.)
 */
@Directive({
  selector: 'svg[appIcon]',
  standalone: true,
})
export class IconDirective implements AfterViewInit {
  @Input({ required: true }) appIcon!: string;

  constructor(private el: ElementRef<SVGElement>) {}

  ngAfterViewInit(): void {
    const markup = ICONS[this.appIcon];
    if (!markup) return;

    const node = this.el.nativeElement;
    node.setAttribute('viewBox', '0 0 24 24');
    node.setAttribute('fill', 'none');
    node.setAttribute('stroke', 'currentColor');
    node.setAttribute('stroke-width', '1.8');
    node.setAttribute('stroke-linecap', 'round');
    node.setAttribute('stroke-linejoin', 'round');

    const wrapped = `<svg xmlns="http://www.w3.org/2000/svg">${markup}</svg>`;
    const doc = new DOMParser().parseFromString(wrapped, 'image/svg+xml');
    const children = Array.from(doc.documentElement.children);
    for (const child of children) {
      node.appendChild(document.importNode(child, true));
    }
  }
}
import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASE_OUT, gsapAvailable, prefersReduced } from './presets';

gsap.registerPlugin(ScrollTrigger);

/**
 * Barra de habilidade presa ao scroll: o preenchimento (scaleX) acompanha
 * a rolagem pela seção (scrub) em vez de animar uma única vez.
 * <i class="skill__bar__fill" appSkillBar="82"></i>
 */
@Directive({
  selector: '[appSkillBar]',
  standalone: true,
})
export class SkillBarDirective implements AfterViewInit, OnDestroy {
  @Input() appSkillBar = '0';

  private trigger: ScrollTrigger | null = null;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const node = this.el.nativeElement;
    const level = Math.min(100, Math.max(0, Number(this.appSkillBar) || 0)) / 100;

    if (prefersReduced() || !gsapAvailable()) {
      node.style.transform = `scaleX(${level})`;
      return;
    }

    this.trigger = ScrollTrigger.create({
      trigger: node,
      start: 'top 92%',
      end: 'top 40%',
      scrub: 0.6,
      onUpdate: (self) => {
        gsap.set(node, { scaleX: level * self.progress });
      },
      onEnter: () => gsap.set(node, { scaleX: level }),
    });
  }

  ngOnDestroy(): void {
    this.trigger?.kill();
  }
}
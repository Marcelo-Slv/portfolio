import { AfterContentInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASE_OUT, REVEAL_PRESETS, getRevealPreset, gsapAvailable, prefersReduced } from './presets';

gsap.registerPlugin(ScrollTrigger);

/**
 * Anima em grupo todos os [appReveal] contidos, com stagger.
 * Use no contêiner: <div appRevealGroup="up" appRevealStagger="0.1">
 */
@Directive({
  selector: '[appRevealGroup]',
  standalone: true,
})
export class RevealGroupDirective implements AfterContentInit, OnDestroy {
  @Input() appRevealGroup: string | undefined;
  @Input() appRevealStagger = 0.1;

  private trigger: ScrollTrigger | null = null;
  private timeline: gsap.core.Timeline | null = null;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterContentInit(): void {
    const root = this.el.nativeElement;
    if (prefersReduced() || !gsapAvailable()) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>('[appReveal]'));
    if (!items.length) return;

    const defaultPreset = getRevealPreset(this.appRevealGroup);
    this.trigger = ScrollTrigger.create({
      trigger: root,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const tl = gsap.timeline();
        const usesClip = items.some((n) => getRevealPreset(n.getAttribute('appReveal')) === 'clip');
        items.forEach((node, i) => {
          const preset = REVEAL_PRESETS[getRevealPreset(node.getAttribute('appReveal'))];
          tl.fromTo(
            node,
            preset.from,
            { ...preset.to, duration: usesClip ? 1.15 : 0.9, ease: EASE_OUT },
            i * this.appRevealStagger
          );
        });
        this.timeline = tl;
      },
    });
  }

  ngOnDestroy(): void {
    this.timeline?.kill();
    this.trigger?.kill();
  }
}
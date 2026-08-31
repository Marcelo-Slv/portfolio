import { AfterViewInit, Directive, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { prefersReduced } from './presets';

interface P {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  tw: number;
  accent: boolean;
}

const ACCENT = '227, 74, 42';
const INK = '28, 25, 22';
const COUNT = 52;

/**
 * Campo de partículas ("brasas") desenhado em canvas sobre o hero.
 * Deriva lentamente para cima com micro-vibração e é repelido pelo mouse.
 */
@Directive({
  selector: '[appParticles]',
  standalone: true,
})
export class ParticlesDirective implements AfterViewInit, OnDestroy {
  private ctx: CanvasRenderingContext2D | null = null;
  private raf = 0;
  private particles: P[] = [];
  private w = 0;
  private h = 0;
  private mouse = { x: -9999, y: -9999 };
  private running = false;
  private reader: ResizeObserver | null = null;

  constructor(
    private el: ElementRef<HTMLCanvasElement>,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    if (prefersReduced()) return;

    const canvas = this.el.nativeElement;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = canvas.clientWidth || window.innerWidth;
    this.h = canvas.clientHeight || window.innerHeight;
    canvas.width = this.w * dpr;
    canvas.height = this.h * dpr;
    this.ctx = canvas.getContext('2d');
    if (!this.ctx) return;
    this.ctx.scale(dpr, dpr);

    this.particles = Array.from({ length: COUNT }, () => this.spawn(true));

    canvas.addEventListener('pointermove', this.onMove);

    this.reader = new ResizeObserver(() => {
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      if (!cw || !ch) return;
      this.w = cw;
      this.h = ch;
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      this.ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    });
    this.reader.observe(canvas);

    this.ngZone.runOutsideAngular(() => {
      this.running = true;
      const loop = (): void => {
        if (!this.running) return;
        this.step();
        this.raf = requestAnimationFrame(loop);
      };
      this.raf = requestAnimationFrame(loop);
    });
  }

  private spawn(initial = false): P {
    return {
      x: Math.random() * this.w,
      y: initial ? Math.random() * this.h : this.h + 8,
      vx: (Math.random() - 0.5) * 0.18,
      vy: -(0.12 + Math.random() * 0.32),
      r: 0.6 + Math.random() * 1.9,
      a: 0.25 + Math.random() * 0.5,
      tw: Math.random() * Math.PI * 2,
      accent: Math.random() < 0.55,
    };
  }

  private onMove = (e: PointerEvent): void => {
    const r = this.el.nativeElement.getBoundingClientRect();
    this.mouse.x = e.clientX - r.left;
    this.mouse.y = e.clientY - r.top;
  };

  private step(): void {
    const ctx = this.ctx;
    if (!ctx) return;
    ctx.clearRect(0, 0, this.w, this.h);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.tw += 0.03;
      p.y += p.vy;
      p.x += p.vx + Math.sin(p.tw) * 0.12;

      const dx = p.x - this.mouse.x;
      const dy = p.y - this.mouse.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < 120 * 120 && p.r > 1) {
        const d = Math.sqrt(d2) || 1;
        const force = (120 - d) / 120;
        p.x += (dx / d) * force * 2.2;
        p.y += (dy / d) * force * 2.2;
      }

      if (p.y < -8 || p.x < -8 || p.x > this.w + 8) {
        this.particles[i] = this.spawn();
        continue;
      }

      const alpha = p.a * (0.6 + 0.4 * Math.sin(p.tw));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.accent
        ? `rgba(${ACCENT}, ${alpha})`
        : `rgba(${INK}, ${alpha * 0.55})`;
      ctx.fill();
    }
  }

  ngOnDestroy(): void {
    this.running = false;
    cancelAnimationFrame(this.raf);
    this.reader?.disconnect();
    this.el.nativeElement.removeEventListener('pointermove', this.onMove);
    this.ctx = null;
  }
}
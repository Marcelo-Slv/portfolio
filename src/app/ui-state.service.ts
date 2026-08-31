import { Injectable, signal } from '@angular/core';

/** Estado global de UI compartilhado entre preloader, páginas e transições. */
@Injectable({ providedIn: 'root' })
export class UiStateService {
  /** true assim que o preloader termina (primeira carga). */
  readonly ready = signal(false);

  markReady(): void {
    this.ready.set(true);
  }
}
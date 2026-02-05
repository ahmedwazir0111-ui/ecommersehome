import { NgFor, NgIf } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf, NgFor],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('myProject');

  homeMenuOpen = false;

  readonly homePages = [
    { label: 'Home', path: '/' },
    { label: 'Home1', path: '/home1' },
    { label: 'Home2', path: '/home2' },
    { label: 'Home3', path: '/home3' },
    { label: 'Home4', path: '/home4' },
  ] as const;

  constructor(private readonly router: Router) {}

  toggleHomeMenu(event: MouseEvent) {
    event.stopPropagation();
    this.homeMenuOpen = !this.homeMenuOpen;
  }

  closeHomeMenu() {
    this.homeMenuOpen = false;
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.closeHomeMenu();
  }
}

import { NgIf } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
  standalone: true,
  imports: [NgIf],
  templateUrl: './section-heading.html',
  styleUrl: './section-heading.scss',
})
export class SectionHeading{
  subtitle = input<string>('');
  title = input<string>('');
  viewAllText = input<string>('View All');
  viewAllLink = input<string>('');
  align = input<'start' | 'center' | 'end'>('start');
}

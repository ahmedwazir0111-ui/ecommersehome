import { Component, computed, input } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';

export type StarClass = 'bi-star-fill star-full' | 'bi-star-half star-half' | 'bi-star star-empty';

export interface ProductCardModel {
  title: string;
  link: string;
  image: string;

  price: number;
  oldPrice?: number | null;

  rating?: number;
  reviews?: number;

  isNew?: boolean;
  discountPercent?: number | null;

  colors?: string[];
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  product = input.required<ProductCardModel>();

  showIcons = input<boolean>(true);
  showRating = input<boolean>(true);
  showColors = input<boolean>(true);
  showCart = input<boolean>(true);

  stars = computed<StarClass[]>(() => this.buildStars(this.product().rating ?? 0));

  private buildStars(rating: number): StarClass[] {
    const safe = Math.min(5, Math.max(0, rating));
    const full = Math.floor(safe);
    const half = safe % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;

    return [
      ...Array.from({ length: full }, () => 'bi-star-fill star-full' as const),
      ...(half ? (['bi-star-half star-half'] as const) : []),
      ...Array.from({ length: empty }, () => 'bi-star star-empty' as const),
    ];
  }
}

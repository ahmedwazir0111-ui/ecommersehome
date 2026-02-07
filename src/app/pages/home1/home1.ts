import { NgClass, NgFor, NgIf, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import type { ProductCardModel } from '../../shared/ui/product-card/product-card';

type TrendingTab = 'Western' | 'Tops' | 'Bags' | 'Shoes';

interface Slide {
  subtitle: string;
  title: string;
  offer: string;
  discount: string;
  text: string;
  button: string;
  image: string;
}

interface CategoryItem {
  title: string;
  items: number;
  image: string;
  link: string;
  colorClass: string;
}

interface FlashProduct extends ProductCardModel {
  isNew?: boolean;
  discount?: number;
}

interface RatingMeta {
  starsFull: number;
  hasHalf: boolean;
  starsEmpty: number;
}

@Component({
  selector: 'app-home1',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './home1.html',
  styleUrl: './home1.scss',
})
export class Home1 implements OnInit, OnDestroy {
  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {}

  // ================= Timers =================
  private timers: Array<ReturnType<typeof setInterval>> = [];
  private timeouts: Array<ReturnType<typeof setTimeout>> = [];

  private every(ms: number, fn: () => void): void {
    this.timers.push(setInterval(fn, ms));
  }

  private later(ms: number, fn: () => void): void {
    this.timeouts.push(setTimeout(fn, ms));
  }

  // ================= Trending Tabs =================
  activeTrendingTab: TrendingTab = 'Western';
  trendingTabs: TrendingTab[] = ['Western', 'Tops', 'Bags', 'Shoes'];

  setTrendingTab(tab: TrendingTab): void {
    this.activeTrendingTab = tab;
  }

  private buildRatingMeta(rating?: number | null): RatingMeta {
    const safe = Math.min(5, Math.max(0, rating ?? 0));
    const starsFull = Math.floor(safe);
    const hasHalf = safe % 1 >= 0.5;
    const starsEmpty = 5 - starsFull - (hasHalf ? 1 : 0);
    return { starsFull, hasHalf, starsEmpty };
  }

  private withRatingMeta<T extends { rating?: number | null }>(items: readonly T[]): Array<T & RatingMeta> {
    return items.map((p) => ({ ...p, ...this.buildRatingMeta(p.rating) }));
  }

  getStars(rating?: number | null): string[] {
    const { starsFull, hasHalf, starsEmpty } = this.buildRatingMeta(rating);

    return [
      ...Array.from({ length: starsFull }, () => 'bi-star-fill'),
      ...(hasHalf ? ['bi-star-half'] : []),
      ...Array.from({ length: starsEmpty }, () => 'bi-star'),
    ];
  }

  trendingProducts: Array<ProductCardModel & { category: TrendingTab; isNew?: boolean; discountPercent?: number | null }> = [
    {
      category: 'Western',
      title: "Men's Casual Denim Shirt",
      price: 70,
      oldPrice: 95,
      rating: 4.5,
      reviews: 41,
      isNew: true,
      discountPercent: 75,
      image: 'assets/img/product_24.png',
      link: 'shop-details.php',
      colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
    },
    {
      category: 'Western',
      title: "Kid's Western Party Dress",
      price: 109,
      oldPrice: null,
      rating: 4,
      reviews: 78,
      isNew: true,
      discountPercent: null,
      image: 'assets/img/product_3.png',
      link: 'shop-details.php',
      colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
    },
    {
      category: 'Western',
      title: "Women's Premium Cotton",
      price: 35,
      oldPrice: null,
      rating: 5,
      reviews: 82,
      isNew: false,
      discountPercent: null,
      image: 'assets/img/product_27.png',
      link: 'shop-details.php',
      colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
    },
    {
      category: 'Western',
      title: "Women's Western Party Dress",
      price: 40,
      oldPrice: 48,
      rating: 4,
      reviews: 35,
      isNew: false,
      discountPercent: 39,
      image: 'assets/img/product_8.png',
      link: 'shop-details.php',
      colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
    },

    // Tops
    {
      category: 'Tops',
      title: "Wedtrend Women's Short Dress",
      price: 130,
      oldPrice: 150,
      rating: 3.5,
      reviews: 9,
      isNew: true,
      discountPercent: 30,
      image: 'assets/img/product_3.png',
      link: 'shop-details.php',
      colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
    },

    // Bags
    {
      category: 'Bags',
      title: 'Premium Bag Collection',
      price: 90,
      oldPrice: 110,
      rating: 4,
      reviews: 11,
      isNew: false,
      discountPercent: 45,
      image: 'assets/img/product_3.png',
      link: 'shop-details.php',
      colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
    },

    // Shoes
    {
      category: 'Shoes',
      title: "Men's trendy casual shoes",
      price: 70,
      oldPrice: null,
      rating: 4.5,
      reviews: 88,
      isNew: true,
      discountPercent: null,
      image: 'assets/img/product_8.png',
      link: 'shop-details.php',
      colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
    },
  ];

  get filteredTrendingProducts(): ProductCardModel[] {
    return this.trendingProducts.filter((p) => p.category === this.activeTrendingTab).slice(0, 8);
  }

  // ================= Bundle =================
  bundleBanner = {
    image: 'assets/img/bundle_banner_img.jpg',
    title: 'This Spring On Apple',
    highlight: 'Up To 50K Off',
    subText: 'Limited Time Offer',
    button: 'Shop Now',
    link: 'shop-details.php',
  };

  bundleHeader = {
    subtitle: 'Shop by Category',
    title: 'Customer Favorite Style Product',
  };

  bundleProducts: Array<ProductCardModel & { isNew?: boolean; discountPercent?: number | null }> = [
    {
      title: "Men's casual denim shirt",
      price: 59,
      oldPrice: null,
      isNew: true,
      discountPercent: null,
      image: 'assets/img/product_27.png',
      link: 'shop-details.php',
    },
    {
      title: "Women's premium Cotton",
      price: 35,
      oldPrice: 40,
      isNew: false,
      discountPercent: 75,
      image: 'assets/img/product_1.png',
      link: 'shop-details.php',
    },
    {
      title: "Men's casual denim pants",
      price: 120,
      oldPrice: null,
      isNew: false,
      discountPercent: null,
      image: 'assets/img/product_27.png',
      link: 'shop-details.php',
    },
    {
      title: "Women's Premium Shirt",
      price: 139,
      oldPrice: 179,
      isNew: false,
      discountPercent: 45,
      image: 'assets/img/product_1.png',
      link: 'shop-details.php',
    },
  ];

  // ================= Brands + Multi Products =================
  brands: string[] = [
    'assets/img/brand1.png',
    'assets/img/brand2.png',
    'assets/img/brand4.png',
    'assets/img/brand1.png',
    'assets/img/brand2.png',
    'assets/img/brand4.png',
    'assets/img/brand9.png',
  ];

  featuredProducts = this.withRatingMeta([
    {
      title: "Men's Casual Denim Shirt",
      image: 'assets/img/product_24.png',
      link: 'shop-details.php',
      reviews: 41,
      price: 70,
      oldPrice: 95,
      rating: 4.5,
    },
    {
      title: "Women's Premium Cotton",
      image: 'assets/img/product_27.png',
      link: 'shop-details.php',
      reviews: 82,
      price: 35,
      oldPrice: null,
      rating: 5,
    },
    {
      title: "Men's Fashionable Hoodie",
      image: 'assets/img/product_1.png',
      link: 'shop-details.php',
      reviews: 25,
      price: 130,
      oldPrice: null,
      rating: 4,
    },
  ] satisfies ProductCardModel[]);

  weeklyProducts = this.withRatingMeta([
    {
      title: "Kid's Western Party Dress",
      image: 'assets/img/product_3.png',
      link: 'shop-details.php',
      reviews: 120,
      price: 80,
      oldPrice: null,
      rating: 4,
    },
    {
      title: "Women's Western Party Dress",
      image: 'assets/img/product_8.png',
      link: 'shop-details.php',
      reviews: 35,
      price: 40,
      oldPrice: 48,
      rating: 4,
    },
    {
      title: 'Premium Bag Collection',
      image: 'assets/img/product_3.png',
      link: 'shop-details.php',
      reviews: 11,
      price: 90,
      oldPrice: 110,
      rating: 4,
    },
  ] satisfies ProductCardModel[]);

  topRatedProducts = this.withRatingMeta([
    {
      title: "Men's trendy casual shoes",
      image: 'assets/img/product_8.png',
      link: 'shop-details.php',
      reviews: 88,
      price: 70,
      oldPrice: null,
      rating: 4.5,
    },
    {
      title: "Wedtrend Women's Short Dress",
      image: 'assets/img/product_3.png',
      link: 'shop-details.php',
      reviews: 9,
      price: 130,
      oldPrice: 150,
      rating: 3.5,
    },
  ] satisfies ProductCardModel[]);

  // ================= Banner Slider =================
  slides: Slide[] = [
    {
      subtitle: "Women's Business Fashion",
      title: 'Impressions Are Created By Fashion',
      offer: 'Limited offer',
      discount: '-29%',
      text: 'off this day',
      button: 'Shop Now',
      image: 'assets/img/banner_img.png',
    },
    {
      subtitle: 'Summer Sale',
      title: 'Discover Your Best Fitting Clothes',
      offer: 'Exclusive offer',
      discount: '-35%',
      text: 'off this week',
      button: 'Shop Now',
      image: 'assets/img/banner_img2.png',
    },
    {
      subtitle: 'New Collection',
      title: "Men's Sportswear & Joggers",
      offer: 'Exclusive offer up to',
      discount: '-70%',
      text: 'off this month',
      button: 'Shop Now',
      image: 'assets/img/banner_img3.png',
    },
  ];

  currentSlide = 0;
  animate = true;

  // ================= Category Slider =================
  @ViewChild('catTrack') catTrack?: ElementRef<HTMLElement>;

  categories: CategoryItem[] = [
    { title: 'Western Wear', items: 24, image: 'assets/img/category_img_1.png', link: 'shop.php', colorClass: 'color-1' },
    { title: 'Sport Wear', items: 34, image: 'assets/img/category_img_2.png', link: 'shop.php', colorClass: 'color-2' },
    { title: 'Footwear', items: 57, image: 'assets/img/category_img_5.png', link: 'shop.php', colorClass: 'color-3' },
    { title: 'Winter Collection', items: 24, image: 'assets/img/category_img_7.png', link: 'shop.php', colorClass: 'color-4' },
    { title: 'Fashion Jewellery', items: 9, image: 'assets/img/category_img_1.png', link: 'shop.php', colorClass: 'color-5' },
  ];

  private catScrollTimeout?: ReturnType<typeof setTimeout>;

  // ================= Flash Slider + Countdown =================
  @ViewChild('flashTrack') flashTrack?: ElementRef<HTMLElement>;
  private flashScrollTimeout?: ReturnType<typeof setTimeout>;

  flashProducts: FlashProduct[] = [
    {
      title: "Men's Casual Denim Blazer",
      image: 'assets/img/product_27.png',
      link: 'shop-details.php',
      isNew: true,
      discount: 45,
      price: 45,
      oldPrice: 55,
      reviews: 48,
      rating: 4.5,
      colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
    },
    {
      title: "Kid's Western Party Dress",
      image: 'assets/img/product_3.png',
      link: 'shop-details.php',
      isNew: false,
      discount: 0,
      price: 80,
      oldPrice: null,
      reviews: 120,
      rating: 4,
      colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
    },
  ];

  countdown = { days: '00', hours: '00', minutes: '00', seconds: '00' };
  private flashEndDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  // ================= Lifecycle =================
  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.startBannerAuto();
    this.startCategoryAutoScroll();
    this.startCountdown();
    this.startFlashAutoScroll();
  }

  ngOnDestroy(): void {
    this.timers.forEach(clearInterval);
    this.timeouts.forEach(clearTimeout);
    if (this.catScrollTimeout) clearTimeout(this.catScrollTimeout);
    if (this.flashScrollTimeout) clearTimeout(this.flashScrollTimeout);
  }

  // ================= Banner =================
  private startBannerAuto(): void {
    this.every(3000, () => this.nextSlide());
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.restartAnimation();
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.restartAnimation();
  }

  private restartAnimation(): void {
    this.animate = false;
    this.later(10, () => (this.animate = true));
  }

  // ================= Scroll Loop Helper =================
  private scrollLoop(el: HTMLElement | undefined, direction: 1 | -1, step: number): void {
    if (!el) return;

    const maxLeft = el.scrollWidth - el.clientWidth;
    const nextLeft = el.scrollLeft + direction * step;

    if (nextLeft >= maxLeft - 5) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }

    if (nextLeft <= 0) {
      el.scrollTo({ left: maxLeft, behavior: 'smooth' });
      return;
    }

    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  }

  // ================= Category =================
  private startCategoryAutoScroll(): void {
    this.later(0, () => {
      this.every(2500, () => this.scrollCategories(1, false));
    });
  }

  private restartCategoryAutoScroll(): void {
    // timers registry: easiest هو توقف/تشغيل؟ هنا خلينا بس نعمل حركة بسيطة:
    // بما إنك عايز minimal تغييرات، هنسيبها زي ما هي (الأوتو شغال) بدون restart intervals
  }

  onCategoryScroll(): void {
    if (this.catScrollTimeout) clearTimeout(this.catScrollTimeout);
    this.catScrollTimeout = setTimeout(() => this.restartCategoryAutoScroll(), 300);
  }

  scrollCategories(direction: 1 | -1, fromUser = true): void {
    this.scrollLoop(this.catTrack?.nativeElement, direction, 260);
    if (fromUser) this.restartCategoryAutoScroll();
  }

  // ================= Countdown =================
  private startCountdown(): void {
    this.updateCountdown();
    this.every(1000, () => this.updateCountdown());
  }

  private updateCountdown(): void {
    const now = Date.now();
    const diff = this.flashEndDate.getTime() - now;

    if (diff <= 0) {
      this.countdown = { days: '00', hours: '00', minutes: '00', seconds: '00' };
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    this.countdown = {
      days: this.pad2(days),
      hours: this.pad2(hours),
      minutes: this.pad2(minutes),
      seconds: this.pad2(seconds),
    };
  }

  private pad2(n: number): string {
    return n < 10 ? `0${n}` : `${n}`;
  }

  // ================= Flash =================
  private startFlashAutoScroll(): void {
    this.later(0, () => {
      this.every(2300, () => this.scrollFlash(1, false));
    });
  }

  private restartFlashAutoScroll(): void {
    // نفس فكرة الكاتيجوري: لو عايز restart حقيقي نعمل registry per slider
  }

  onFlashScroll(): void {
    if (this.flashScrollTimeout) clearTimeout(this.flashScrollTimeout);
    this.flashScrollTimeout = setTimeout(() => this.restartFlashAutoScroll(), 300);
  }

  scrollFlash(direction: 1 | -1, fromUser = true): void {
    this.scrollLoop(this.flashTrack?.nativeElement, direction, 360);
    if (fromUser) this.restartFlashAutoScroll();
  }
}

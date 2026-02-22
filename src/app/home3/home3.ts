import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';

type StarState = 'full' | 'half' | 'empty';
type SlideIcon = { icon: string; text: string };

type Slide = {
  titleSmall: string;
  title: string;
  desc: string;
  img: string;
  thumb: string;
  icons: SlideIcon[];
  ctaText: string;
  ctaLink: string;
};

type ProductBase = {
  img: string;
  title: string;
  price: number;
  oldPrice?: number | null;
  rating: number;
  reviews: number;
  isNew?: boolean;
  discountPercent?: number | null;
};

type CountdownBanner = {
  img: string;
  subtitle: string;
  title: string;
  ctaText: string;
  ctaLink: string;
};

type CountdownDeal = {
  bg: string;
  tag: string;
  title: string;
  desc: string;
  productImg: string;
  ctaText: string;
  ctaLink: string;
  endAt: string | Date;
};

type FeaturedProduct = Required<
  Pick<ProductBase, 'img' | 'title' | 'price' | 'rating' | 'reviews'>
> & {
  oldPrice: number | null;
  isNew: boolean;
  discountPercent: number | null;
};

type BestSellingProduct = FeaturedProduct;

type Category = {
  title: string;
  count: string | number;
  img: string;
  link: string;
};

type BrandItem = {
  img: string;
  link: string;
  alt?: string;
};

type InstaItem = {
  img: string;
  alt?: string;
  link?: string;
  showOverlay?: boolean;
};

type TrendingKey = 'beauty' | 'cosmetics' | 'skin' | 'body';
type TrendingTab = { label: string; key: TrendingKey };
type TrendingProduct = ProductBase & { tab: TrendingKey };

@Component({
  selector: 'app-home-3',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, RouterLink],
  templateUrl: './home3.html',
  styleUrls: ['./home3.scss'],
})
export class Home3 implements OnInit, AfterViewInit, OnDestroy {
  // ===== Countdown =====
  banner: CountdownBanner = {
    img: 'assets/img/beauty_countdown_banner.jpg',
    subtitle: 'Cosmetics Collection',
    title: 'Foundation and powder brush',
    ctaText: 'Discover More',
    ctaLink: '/shop-details',
  };

  deal: CountdownDeal = {
    bg: 'assets/img/beauty_countdown_bg.jpg',
    tag: 'Monthly Offers',
    title: 'Our Specials Products Deal Of The Day',
    desc: 'There are many variations of passages of Lorem Ipsum but majority have suffered.',
    productImg: 'assets/img/beauty_countdown_product.png',
    ctaText: 'Shop Now',
    ctaLink: '/shop-details',
    endAt: '2026-12-31T23:59:59',
  };

  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;

  private countdownTimer?: ReturnType<typeof setInterval>;

  pad(n: number): string {
    return n.toString().padStart(2, '0');
  }

  // ===== Banner Slider =====
  activeIndex = 0;
  private bannerTimer?: ReturnType<typeof setInterval>;

  // ===== Trending =====
  activeTrendingTab = 0;
  trendingTabs: TrendingTab[] = [
    { label: 'Beauty', key: 'beauty' },
    { label: 'Cosmetics', key: 'cosmetics' },
    { label: 'Skin Care', key: 'skin' },
    { label: 'Body Care', key: 'body' },
  ];

  // ===== Featured Slider =====
  featuredIndex = 0;
  trackTransform = 'translateX(0px)';
  private featuredTimer?: ReturnType<typeof setInterval>;
  private featuredPaused = false;

  @ViewChild('featuredTrackRef') featuredTrackRef?: ElementRef<HTMLDivElement>;

  // ===== Category Marquee =====
  pauseCategory = false;

  // ===== Brand Slider =====
  brandIndex = 0;
  brandTransform = 'translateX(0px)';
  linkDefault = '/shop';

  @ViewChild('brandTrackRef') brandTrackRef?: ElementRef<HTMLDivElement>;

  @Input() auto = false;
  @Input() autoMs = 2500;

  private brandTimer?: ReturnType<typeof setInterval>;
  private brandPaused = false;

  // ===== Instagram (FIXED) =====
  instaItems: InstaItem[] = [
    { img: 'assets/img/instageam_img_3.jpg' },
    { img: 'assets/img/instageam_img_5.jpg' },
    { img: 'assets/img/instageam_img_3.jpg' },
    { img: 'assets/img/instageam_img_5.jpg' },
    { img: 'assets/img/instageam_img_3.jpg' },
    { img: 'assets/img/instageam_img_5.jpg' },
    { img: 'assets/img/instageam_img_3.jpg' },
  ];

  instaDuration = 22;       // seconds
  instaPauseOnHover = true; // pause marquee on hover
  instaPaused = false;

  // ===================== Data =====================
  slides: Slide[] = [
    {
      titleSmall: 'The Pearl Glow',
      title: "Let's Introduce Skin with The Shine",
      desc: 'Contrary to popular belief, Lorem Ipsum is not simply random text piece of classical Latin literature.',
      img: 'assets/img/banner_beauty_img_1.png',
      thumb: 'assets/img/banner_beauty_img_1.png',
      icons: [
        { icon: 'assets/img/category_icon_1.png', text: 'High-end Cosmetics' },
        { icon: 'assets/img/category_icon_3.png', text: 'Vegan Product' },
        { icon: 'assets/img/category_icon_4.png', text: 'Express Make-up' },
      ],
      ctaText: 'Shop Now',
      ctaLink: '/shop-details',
    },
    {
      titleSmall: 'The Pearl Glow',
      title: "Let's Introduce Skin with The Shine",
      desc: 'Contrary to popular belief, Lorem Ipsum is not simply random text piece of classical Latin literature.',
      img: 'assets/img/banner_beauty_img_2.png',
      thumb: 'assets/img/banner_beauty_img_2.png',
      icons: [
        { icon: 'assets/img/category_icon_1.png', text: 'High-end Cosmetics' },
        { icon: 'assets/img/category_icon_3.png', text: 'Vegan Product' },
        { icon: 'assets/img/category_icon_4.png', text: 'Express Make-up' },
      ],
      ctaText: 'Shop Now',
      ctaLink: '/shop-details',
    },
    {
      titleSmall: 'The Pearl Glow',
      title: "Let's Introduce Skin with The Shine",
      desc: 'Contrary to popular belief, Lorem Ipsum is not simply random text piece of classical Latin literature.',
      img: 'assets/img/banner_beauty_img_3.png',
      thumb: 'assets/img/banner_beauty_img_3.png',
      icons: [
        { icon: 'assets/img/category_icon_1.png', text: 'High-end Cosmetics' },
        { icon: 'assets/img/category_icon_3.png', text: 'Vegan Product' },
        { icon: 'assets/img/category_icon_4.png', text: 'Express Make-up' },
      ],
      ctaText: 'Shop Now',
      ctaLink: '/shop-details',
    },
  ];

  featuredProducts: FeaturedProduct[] = [
    {
      img: 'assets/img/beauty_pro_2.png',
      price: 37,
      oldPrice: null,
      title: 'Nourishing Care Shampoo',
      rating: 4.5,
      reviews: 44,
      isNew: false,
      discountPercent: null,
    },
    {
      img: 'assets/img/beauty_pro_5.png',
      price: 54,
      oldPrice: 59,
      title: 'PlushMatte Liquid Lipstick',
      rating: 3.5,
      reviews: 74,
      isNew: false,
      discountPercent: 32,
    },
    {
      img: 'assets/img/beauty_pro_8.png',
      price: 89,
      oldPrice: 99,
      title: 'Conditioner Hairfall Rescue',
      rating: 4,
      reviews: 28,
      isNew: true,
      discountPercent: 49,
    },
    {
      img: 'assets/img/beauty_pro_1.png',
      price: 45,
      oldPrice: null,
      title: 'Pore Perfection Toner',
      rating: 5,
      reviews: 156,
      isNew: true,
      discountPercent: null,
    },
  ];

  categories: Category[] = [
    { title: 'Oil Cleansers', count: '06', img: 'assets/img/beauty_category_img_3.jpg', link: '/shop' },
    { title: 'Hair Care', count: '09', img: 'assets/img/beauty_category_img_4.jpg', link: '/shop' },
    { title: 'Beauty Care', count: '20', img: 'assets/img/beauty_category_img_5.jpg', link: '/shop' },
    { title: 'Body Care', count: '12', img: 'assets/img/beauty_category_img_3.jpg', link: '/shop' },
    { title: 'Skin Care', count: '32', img: 'assets/img/beauty_category_img_4.jpg', link: '/shop' },
    { title: 'Serum', count: '46', img: 'assets/img/beauty_category_img_5.jpg', link: '/shop' },
    { title: 'Makeup Tools', count: '06', img: 'assets/img/beauty_category_img_3.jpg', link: '/shop' },
  ];

  bestSelling: BestSellingProduct[] = [
    { img: '../assets/img/beauty_pro_1.png', title: 'Deodorant Body Spray', price: 39, oldPrice: null, rating: 5, reviews: 14, isNew: false, discountPercent: null },
    { img: '../assets/img/beauty_pro_2.png', title: 'Minimal Muse Makeup Set', price: 56, oldPrice: null, rating: 4.5, reviews: 49, isNew: true, discountPercent: null },
    { img: '../assets/img/beauty_pro_5.png', title: 'Power Nude Essentials', price: 67, oldPrice: null, rating: 4, reviews: 38, isNew: false, discountPercent: null },
    { img: '../assets/img/beauty_pro_8.png', title: 'Cream Advanced Multivitamin', price: 77, oldPrice: 85, rating: 4, reviews: 7, isNew: false, discountPercent: 22 },
    { img: '../assets/img/beauty_pro_5.png', title: 'Power Nude Essentials', price: 67, oldPrice: null, rating: 4, reviews: 38, isNew: false, discountPercent: null },
    { img: '../assets/img/beauty_pro_8.png', title: 'Cream Advanced Multivitamin', price: 77, oldPrice: 85, rating: 4, reviews: 7, isNew: false, discountPercent: 22 },
  ];

  trendingProducts: TrendingProduct[] = [
    { tab: 'beauty', img: '../assets/img/beauty_pro_1.png', price: 84, title: 'Up Sun Cream 70ml', rating: 4, reviews: 97 },
    { tab: 'beauty', img: '../assets/img/beauty_pro_5.png', price: 56, title: 'GlossGlide Lip Oil', rating: 4.5, reviews: 43, isNew: true },
    { tab: 'beauty', img: '../assets/img/beauty_pro_8.png', price: 90, oldPrice: 99, title: 'Brow Define Precision Pencil', rating: 5, reviews: 25, isNew: true, discountPercent: 42 },
    { tab: 'beauty', img: '../assets/img/beauty_pro_1.png', price: 39, title: 'Radiance Renew Cleanser', rating: 4.5, reviews: 52 },
    { tab: 'beauty', img: '../assets/img/beauty_pro_8.png', price: 90, oldPrice: 99, title: 'Brow Define Precision Pencil', rating: 5, reviews: 25, isNew: true, discountPercent: 42 },
    { tab: 'beauty', img: '../assets/img/beauty_pro_1.png', price: 39, title: 'Radiance Renew Cleanser', rating: 4.5, reviews: 52 },

    { tab: 'cosmetics', img: '../assets/img/beauty_pro_1.png', price: 83, oldPrice: 93, title: 'Extra Virgin Olive Oil', rating: 3.5, reviews: 98 },
    { tab: 'cosmetics', img: '../assets/img/beauty_pro_1.png', price: 83, oldPrice: 93, title: 'Extra Virgin Olive Oil', rating: 3.5, reviews: 98 },

    { tab: 'skin', img: '../assets/img/beauty_pro_5.png', price: 45, oldPrice: 59, title: 'Shield Conditioner', rating: 3.5, reviews: 98 },
    { tab: 'skin', img: '../assets/img/beauty_pro_5.png', price: 45, oldPrice: 59, title: 'Shield Conditioner', rating: 3.5, reviews: 98 },

    { tab: 'body', img: '../assets/img/beauty_pro_8.png', price: 77, oldPrice: 85, title: 'Cream Advanced Multivitamin', rating: 4, reviews: 7, discountPercent: 22 },
    { tab: 'body', img: '../assets/img/beauty_pro_8.png', price: 77, oldPrice: 85, title: 'Cream Advanced Multivitamin', rating: 4, reviews: 7, discountPercent: 22 },
  ];

  features = [
    { icon: 'bi-truck', title: 'Return & Refund', sub: 'Money back guarantee' },
    { icon: 'bi-headset', title: 'Quality Support', sub: 'Always online 24/7' },
    { icon: 'bi-shield-lock', title: 'Secure Payment', sub: '30% off by subscribing' },
    { icon: 'bi-tag', title: 'Daily Offers', sub: '20% off by subscribing' },
  ];

  newArrivals = [
    { img: 'assets/img/beauty_pro_5.png', title: 'AirBlur Matte Foundation', price: 50, oldPrice: null, rating: 5, reviews: 7, isNew: true, discountPercent: null },
    { img: 'assets/img/beauty_pro_8.png', title: 'Glow Revival Serum', price: 72, oldPrice: null, rating: 4.5, reviews: 17, isNew: true, discountPercent: null },
    { img: '../assets/img/beauty_pro_2.png', title: 'BareBloom Face Oil', price: 44, oldPrice: null, rating: 3.5, reviews: 66, isNew: true, discountPercent: null },
    { img: '../assets/img/beauty_pro_1.png', title: 'Pore Perfection Toner', price: 65, oldPrice: 70, rating: 5, reviews: 90, isNew: true, discountPercent: 42 },
    { img: 'assets/img/beauty_pro_8.png', title: 'Glow Revival Serum', price: 72, oldPrice: null, rating: 4.5, reviews: 17, isNew: true, discountPercent: null },
  ];

  popularProducts = [
    { img: 'assets/img/beauty_pro_1.png', title: 'Pore Perfection Toner', price: 45, oldPrice: null, rating: 4.5, reviews: 83, isNew: false, discountPercent: null },
    { img: 'assets/img/beauty_pro_5.png', title: 'Deodorant Body Spray', price: 60, oldPrice: 68, rating: 4, reviews: 70, isNew: false, discountPercent: 42 },
    { img: 'assets/img/beauty_pro_2.png', title: 'Nourishing Care Shampoo', price: 37, oldPrice: null, rating: 4, reviews: 49, isNew: true, discountPercent: null },
    { img: 'assets/img/beauty_pro_1.png', title: 'PlushMatte Liquid Lipstick', price: 52, oldPrice: null, rating: 4, reviews: 102, isNew: false, discountPercent: null },
    { img: 'assets/img/beauty_pro_1.png', title: 'PlushMatte Liquid Lipstick', price: 52, oldPrice: null, rating: 4, reviews: 102, isNew: false, discountPercent: null },
  ];

  brands: BrandItem[] = [
    { img: 'assets/img/beauty_brand_6.png', link: '/shop', alt: 'Brand 1' },
    { img: 'assets/img/beauty_brand_5.png', link: '/shop', alt: 'Brand 2' },
    { img: 'assets/img/beauty_brand_3.png', link: '/shop', alt: 'Brand 3' },
    { img: 'assets/img/beauty_brand_6.png', link: '/shop', alt: 'Brand 4' },
    { img: 'assets/img/beauty_brand_5.png', link: '/shop', alt: 'Brand 5' },
    { img: 'assets/img/beauty_brand_3.png', link: '/shop', alt: 'Brand 6' },
    { img: 'assets/img/beauty_brand_6.png', link: '/shop', alt: 'Brand 7' },
    { img: 'assets/img/beauty_brand_5.png', link: '/shop', alt: 'Brand 8' },
    { img: 'assets/img/beauty_brand_3.png', link: '/shop', alt: 'Brand 9' },
    { img: 'assets/img/beauty_brand_6.png', link: '/shop', alt: 'Brand 10' },
    { img: 'assets/img/beauty_brand_5.png', link: '/shop', alt: 'Brand 11' },
    { img: 'assets/img/beauty_brand_3.png', link: '/shop', alt: 'Brand 12' },
  ];

  // ===================== Lifecycle =====================
  ngOnInit(): void {
    this.startCountdown();

    if (typeof window === 'undefined') return;

    this.startBannerAuto();
    this.startFeaturedAuto();

    window.addEventListener('resize', this.onResize);
  }

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    queueMicrotask(() => {
      this.updateFeaturedTransform();
      this.updateBrandTransform();
    });

    if (this.auto) this.startBrandAuto();
  }

  ngOnDestroy(): void {
    this.stopCountdown();
    this.stopBannerAuto();
    this.stopFeaturedAuto();
    this.stopBrandAuto();

    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize);
    }
  }

  // ===================== Getters =====================
  get activeSlide(): Slide {
    return this.slides[this.activeIndex];
  }

  get filteredTrending(): TrendingProduct[] {
    const key = this.trendingTabs[this.activeTrendingTab]?.key;
    return this.trendingProducts.filter((p) => p.tab === key);
  }

  get visibleFeaturedCount(): number {
    if (typeof window === 'undefined') return 3;
    const w = window.innerWidth;
    if (w >= 1200) return 3;
    if (w >= 768) return 2;
    return 1;
  }

  get visibleBrandCount(): number {
    if (typeof window === 'undefined') return 6;
    const w = window.innerWidth;
    if (w >= 1200) return 6;
    if (w >= 992) return 5;
    if (w >= 768) return 4;
    if (w >= 576) return 3;
    return 2;
  }

  // ===================== UI Actions =====================
  setTrendingTab(i: number): void {
    this.activeTrendingTab = i;
  }

  next(): void {
    this.activeIndex = (this.activeIndex + 1) % this.slides.length;
  }

  prev(): void {
    this.activeIndex = (this.activeIndex - 1 + this.slides.length) % this.slides.length;
  }

  goTo(i: number): void {
    this.activeIndex = i;
    this.startBannerAuto();
  }

  // ===== Brand slider controls =====
  brandNext(): void {
    const maxIndex = Math.max(0, this.brands.length - this.visibleBrandCount);
    this.brandIndex = this.brandIndex >= maxIndex ? 0 : this.brandIndex + 1;
    this.updateBrandTransform();
  }

  brandPrev(): void {
    const maxIndex = Math.max(0, this.brands.length - this.visibleBrandCount);
    this.brandIndex = this.brandIndex <= 0 ? maxIndex : this.brandIndex - 1;
    this.updateBrandTransform();
  }

  pauseBrandAuto(): void {
    this.brandPaused = true;
  }

  resumeBrandAuto(): void {
    this.brandPaused = false;
  }

  // ===================== Banner Auto =====================
  startBannerAuto(): void {
    this.stopBannerAuto();
    this.bannerTimer = setInterval(() => this.next(), 3500);
  }

  stopBannerAuto(): void {
    if (!this.bannerTimer) return;
    clearInterval(this.bannerTimer);
    this.bannerTimer = undefined;
  }

  // ===================== Featured Slider =====================
  featuredNext(): void {
    const maxIndex = Math.max(0, this.featuredProducts.length - this.visibleFeaturedCount);
    this.featuredIndex = this.featuredIndex >= maxIndex ? 0 : this.featuredIndex + 1;
    this.updateFeaturedTransform();
  }

  featuredPrev(): void {
    const maxIndex = Math.max(0, this.featuredProducts.length - this.visibleFeaturedCount);
    this.featuredIndex = this.featuredIndex <= 0 ? maxIndex : this.featuredIndex - 1;
    this.updateFeaturedTransform();
  }

  startFeaturedAuto(): void {
    this.stopFeaturedAuto();
    this.featuredTimer = setInterval(() => {
      if (!this.featuredPaused) this.featuredNext();
    }, 2800);
  }

  stopFeaturedAuto(): void {
    if (!this.featuredTimer) return;
    clearInterval(this.featuredTimer);
    this.featuredTimer = undefined;
  }

  pauseFeaturedAuto(): void {
    this.featuredPaused = true;
  }

  resumeFeaturedAuto(): void {
    this.featuredPaused = false;
  }

  private clampFeaturedIndex(): void {
    const maxIndex = Math.max(0, this.featuredProducts.length - this.visibleFeaturedCount);
    this.featuredIndex = Math.min(Math.max(this.featuredIndex, 0), maxIndex);
  }

  private updateFeaturedTransform(): void {
    const track = this.featuredTrackRef?.nativeElement;
    const firstCard = track?.querySelector<HTMLElement>('.card_wrap');

    if (!track || !firstCard || typeof window === 'undefined') {
      this.trackTransform = 'translateX(0px)';
      return;
    }

    this.clampFeaturedIndex();

    const cardW = firstCard.getBoundingClientRect().width;
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.gap || styles.columnGap || '0');
    const step = cardW + gap;

    this.trackTransform = `translateX(-${this.featuredIndex * step}px)`;
  }

  // ===================== Brand Slider =====================
  private clampBrandIndex(): void {
    const maxIndex = Math.max(0, this.brands.length - this.visibleBrandCount);
    this.brandIndex = Math.min(Math.max(this.brandIndex, 0), maxIndex);
  }

  private updateBrandTransform(): void {
    const track = this.brandTrackRef?.nativeElement;
    const first = track?.querySelector<HTMLElement>('.brand_item');

    if (!track || !first || typeof window === 'undefined') {
      this.brandTransform = 'translateX(0px)';
      return;
    }

    this.clampBrandIndex();

    const itemW = first.getBoundingClientRect().width;
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.gap || styles.columnGap || '0');
    const step = itemW + gap;

    this.brandTransform = `translateX(-${this.brandIndex * step}px)`;
  }

  private startBrandAuto(): void {
    this.stopBrandAuto();
    this.brandTimer = setInterval(() => {
      if (!this.brandPaused) this.brandNext();
    }, this.autoMs);
  }

  private stopBrandAuto(): void {
    if (!this.brandTimer) return;
    clearInterval(this.brandTimer);
    this.brandTimer = undefined;
  }

  private onResize = (): void => {
    this.updateFeaturedTransform();
    this.updateBrandTransform();
  };

  // ===================== Countdown =====================
  private startCountdown(): void {
    this.stopCountdown();
    this.tickCountdown();
    this.countdownTimer = setInterval(() => this.tickCountdown(), 1000);
  }

  private stopCountdown(): void {
    if (!this.countdownTimer) return;
    clearInterval(this.countdownTimer);
    this.countdownTimer = undefined;
  }

  private tickCountdown(): void {
    const end = this.deal?.endAt ? new Date(this.deal.endAt) : new Date();
    const now = new Date();
    let diff = Math.max(0, end.getTime() - now.getTime());

    const totalSeconds = Math.floor(diff / 1000);
    this.days = Math.floor(totalSeconds / (3600 * 24));
    diff -= this.days * 3600 * 24 * 1000;

    this.hours = Math.floor(diff / (3600 * 1000));
    diff -= this.hours * 3600 * 1000;

    this.minutes = Math.floor(diff / (60 * 1000));
    diff -= this.minutes * 60 * 1000;

    this.seconds = Math.floor(diff / 1000);
  }

  // ===================== Helpers =====================
  getStars(rating: number): StarState[] {
    const out: StarState[] = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) out.push('full');
      else if (rating >= i - 0.5) out.push('half');
      else out.push('empty');
    }
    return out;
  }

  trackByTitle = (_: number, p: { title: string }): string => p.title;
  trackByImg(_i: number, b: BrandItem): string {
    return b.img;
  }
}
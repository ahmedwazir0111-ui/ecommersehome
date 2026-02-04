import { CurrencyPipe, DecimalPipe, NgClass, NgFor, NgIf, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { SwiperOptions } from 'swiper/types';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type ProductCategory = 'Western' | 'Tops' | 'Bags' | 'Shoes';

type TrendingProduct = {
  category: ProductCategory;
  imgSrc: string;
  isNew: boolean;
  discount: string | null;
  title: string;
  price: number;
  oldPrice: number | null;
  rating: number;
  reviews: number;
  colors: string[];
};

type ProductColor = {
  hex: string;
  active?: boolean;
};

type ProductCard = {
  id: number;
  title: string;
  img: string;
  price: number;
  oldPrice?: number;
  discountPercent?: number; // 20 => -20%
  rating: number; // 0..5
  reviews: number;
  isNew?: boolean;
  colors: ProductColor[];
  link: string;
};

type CarouselProduct = {
  imgSrc: string;
  discount: string;
  isNew: boolean;
  title: string;
  price: number;
  oldPrice: number;
  reviews: number;
};

type BestProduct = {
  id: number;
  title: string;
  img: string;
  price: number;
  oldPrice?: number;
  link: string;
};
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, RouterLink, CurrencyPipe, DecimalPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, AfterViewInit {
  @ViewChild('swiperEl') private readonly swiperEl?: ElementRef<any>;
  @ViewChild('productSwiperEl') private readonly productSwiperEl?: ElementRef<any>;
  @ViewChild('categorySwiperEl') private readonly categorySwiperEl?: ElementRef<any>;
  @ViewChild('track') private readonly track?: ElementRef<HTMLElement>;

  // Countdown
  days = 364;
  hours = 0;
  minutes = 43;
  seconds = 31;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (
      isPlatformBrowser(this.platformId) &&
      typeof customElements !== 'undefined' &&
      !customElements.get('swiper-container')
    ) {
      import('swiper/element/bundle').then(({ register }) => register());
    }
  }

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.startCountdown();
  }

  private startCountdown() {
    setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
        return;
      }

      this.seconds = 59;
      if (this.minutes > 0) {
        this.minutes--;
        return;
      }

      this.minutes = 59;
      if (this.hours > 0) {
        this.hours--;
        return;
      }

      this.hours = 23;
      if (this.days > 0) {
        this.days--;
      }
    }, 1000);
  }

  slides: Array<{
    subTitle: string;
    title: string;
    link: string;
    bg: string;
    modelImg?: string;
  }> = [
    {
      subTitle: 'Trending Of This Month',
      title: 'Make Your Fashion\nLook More Changing',
      link: '/shop',
      bg: 'assets/img/slider_1.jpg',
    },
    {
      subTitle: 'New Collection',
      title: 'Style That\nFeels Fresh',
      link: '/shop',
      bg: 'assets/img/slider_2.jpg',
    },
    {
      subTitle: 'Best Offer',
      title: 'Modern Outfit\nFor Everyone',
      link: '/shop',
      bg: 'assets/img/slider_3.jpg',
    },
    {
      subTitle: 'Best Offer',
      title: 'Modern Outfit\nFor Everyone',
      link: '/shop',
      bg: 'assets/img/slider_3.jpg',
    },
    {
      subTitle: 'Best Offer',
      title: 'Modern Outfit\nFor Everyone',
      link: '/shop',
      bg: 'assets/img/slider_3.jpg',
    },
    {
      subTitle: 'Best Offer',
      title: 'Modern Outfit\nFor Everyone',
      link: '/shop',
      bg: 'assets/img/slider_3.jpg',
    },
    {
      subTitle: 'Best Offer',
      title: 'Modern Outfit\nFor Everyone',
      link: '/shop',
      bg: 'assets/img/slider_3.jpg',
    },
    {
      subTitle: 'Best Offer',
      title: 'Modern Outfit\nFor Everyone',
      link: '/shop',
      bg: 'assets/img/slider_3.jpg',
    },
  ];

  features = [
    {
      title: 'Return & refund',
      desc: 'Money back guarantee',
      icon: 'assets/images/feature-icon_1.svg',
      class: 'feat-yellow',
    },
    {
      title: 'Quality Support',
      desc: 'Always online 24/7',
      icon: 'assets/images/feature-icon_3.svg',
      class: 'feat-blue',
    },
    {
      title: 'Secure Payment',
      desc: '30% off by subscribing',
      icon: 'assets/images/feature-icon_2.svg',
      class: 'feat-green',
    },
    {
      title: 'Daily Offers',
      desc: '20% off by subscribing',
      icon: 'assets/images/feature-icon_4.svg',
      class: 'feat-teal',
    },
  ];

  rightAd = {
    badge: 'Summer Offer',
    title: 'Make Your Fashion Story Unique Every Day',
    link: '/shop',
    bg: 'assets/img/banner_3_add_bg_1.jpg',
    modelImg: undefined as string | undefined,
  };

  swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    speed: 1000,
    loop: true,
    autoplay: { delay: 3000, disableOnInteraction: false },
    pagination: { clickable: true },
    on: {
      init: (swiper: any) => this.setActiveSlide(swiper),
      slideChangeTransitionStart: (swiper: any) => this.setActiveSlide(swiper),
    },
  };

  productSwiperConfig: SwiperOptions = {
    slidesPerView: 4,
    spaceBetween: 24,
    loop: true,
    speed: 700,
    autoplay: { delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true },
    navigation: {
      nextEl: '.slider-container .slider-arrow.next',
      prevEl: '.slider-container .slider-arrow.prev',
    },
    breakpoints: {
      0: { slidesPerView: 1.2, spaceBetween: 14 },
      576: { slidesPerView: 2, spaceBetween: 18 },
      768: { slidesPerView: 3, spaceBetween: 22 },
      1024: { slidesPerView: 4, spaceBetween: 24 },
    },
  };

  categorySwiperConfig: SwiperOptions = {
    slidesPerView: 7,
    spaceBetween: 18,
    loop: true,
    speed: 700,
    autoplay: { delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true },
    navigation: {
      nextEl: '.category-slider .cat-arrow.next',
      prevEl: '.category-slider .cat-arrow.prev',
    },
    breakpoints: {
      0: { slidesPerView: 2.2, spaceBetween: 14 },
      576: { slidesPerView: 3.5, spaceBetween: 16 },
      768: { slidesPerView: 5, spaceBetween: 18 },
      992: { slidesPerView: 6, spaceBetween: 18 },
      1200: { slidesPerView: 7, spaceBetween: 18 },
    },
  };

  // Trending tabs
  tabs: ProductCategory[] = ['Western', 'Tops', 'Bags', 'Shoes'];
  activeTab: ProductCategory = 'Western';

  trendingProducts: TrendingProduct[] = [
    {
      category: 'Western',
      imgSrc: '../assets/img/product_1.png',
      isNew: true,
      discount: null,
      title: 'Full Sleeve Hoodie Jacket',
      price: 40,
      oldPrice: 48,
      rating: 4,
      reviews: 20,
      colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
    },
    {
      category: 'Western',
      imgSrc: 'assets/img/product_3.png',
      isNew: true,
      discount: null,
      title: 'Full Sleeve Hoodie Jacket',
      price: 40,
      oldPrice: 48,
      rating: 4,
      reviews: 20,
      colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
    },
    {
      category: 'Western',
      imgSrc: 'assets/img/product_8.png',
      isNew: true,
      discount: null,
      title: 'Full Sleeve Hoodie Jacket',
      price: 40,
      oldPrice: 48,
      rating: 4,
      reviews: 20,
      colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
    },
    {
      category: 'Western',
      imgSrc: 'assets/img/product_24.png',
      isNew: true,
      discount: null,
      title: 'Full Sleeve Hoodie Jacket',
      price: 40,
      oldPrice: 48,
      rating: 4,
      reviews: 20,
      colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
    },
    {
      category: 'Western',
      imgSrc: 'assets/img/product_27.png',
      isNew: true,
      discount: null,
      title: 'Full Sleeve Hoodie Jacket',
      price: 40,
      oldPrice: 48,
      rating: 4,
      reviews: 20,
      colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
    },
    {
      category: 'Western',
      imgSrc: 'assets/img/product_30.png',
      isNew: true,
      discount: null,
      title: 'Full Sleeve Hoodie Jacket',
      price: 40,
      oldPrice: 48,
      rating: 4,
      reviews: 20,
      colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
    },
    {
      category: 'Western',
      imgSrc: 'assets/img/product_1.png',
      isNew: true,
      discount: null,
      title: 'Full Sleeve Hoodie Jacket',
      price: 40,
      oldPrice: 48,
      rating: 4,
      reviews: 20,
      colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
    },
    {
      category: 'Western',
      imgSrc: 'assets/img/product_1.png',
      isNew: true,
      discount: null,
      title: 'Full Sleeve Hoodie Jacket',
      price: 40,
      oldPrice: 48,
      rating: 4,
      reviews: 20,
      colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
    },
    {
      category: 'Western',
      imgSrc: 'assets/img/product_1.png',
      isNew: true,
      discount: null,
      title: 'Full Sleeve Hoodie Jacket',
      price: 40,
      oldPrice: 48,
      rating: 4,
      reviews: 20,
      colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
    },
    {
      category: 'Western',
      imgSrc: 'assets/img/product_24.png',
      isNew: false,
      discount: '45%',
      title: 'Denim casual blazer for men',
      price: 47,
      oldPrice: 50,
      rating: 4,
      reviews: 17,
      colors: ['#DB4437', '#638C34', '#1C58F2'],
    },
    {
      category: 'Tops',
      imgSrc: 'assets/img/product_3.png',
      isNew: false,
      discount: null,
      title: 'Half Sleeve Tops for Women',
      price: 29,
      oldPrice: null,
      rating: 4,
      reviews: 44,
      colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
    },
    {
      category: 'Bags',
      imgSrc: 'assets/img/product_8.png',
      isNew: true,
      discount: '75%',
      title: 'tops pant beautiful dress',
      price: 40,
      oldPrice: 48,
      rating: 4,
      reviews: 20,
      colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
    },
    {
      category: 'Shoes',
      imgSrc: 'assets/img/product_1.png',
      isNew: true,
      discount: '75%',
      title: "Kid's Western Party Dress",
      price: 40,
      oldPrice: 48,
      rating: 4,
      reviews: 20,
      colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
    },
    {
      category: 'Shoes',
      imgSrc: 'assets/img/product_1.png',
      isNew: true,
      discount: '75%',
      title: "Kid's Western Party Dress",
      price: 40,
      oldPrice: 48,
      rating: 4,
      reviews: 20,
      colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
    },
    {
      category: 'Shoes',
      imgSrc: 'assets/img/product_1.png',
      isNew: true,
      discount: '75%',
      title: "Kid's Western Party Dress",
      price: 40,
      oldPrice: 48,
      rating: 4,
      reviews: 20,
      colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
    },
    {
      category: 'Shoes',
      imgSrc: 'assets/img/product_1.png',
      isNew: true,
      discount: '75%',
      title: "Kid's Western Party Dress",
      price: 40,
      oldPrice: 48,
      rating: 4,
      reviews: 20,
      colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
    },
    {
      category: 'Shoes',
      imgSrc: 'assets/img/product_1.png',
      isNew: true,
      discount: '75%',
      title: "Kid's Western Party Dress",
      price: 40,
      oldPrice: 48,
      rating: 4,
      reviews: 20,
      colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
    },
  ];

  setTab(tab: ProductCategory) {
    this.activeTab = tab;
  }

  get filteredTrending() {
    return this.trendingProducts.filter((product) => product.category === this.activeTab);
  }

  carouselProducts: CarouselProduct[] = [
    {
      imgSrc: 'assets/img/product_1.png',
      discount: '75%',
      isNew: true,
      title: 'Full Sleeve Hoodie Jacket',
      price: 40.0,
      oldPrice: 48.0,
      reviews: 20,
    },
    {
      imgSrc: 'assets/img/product_24.png',
      discount: '45%',
      isNew: false,
      title: 'Denim casual blazer for men',
      price: 120.0,
      oldPrice: 99.0,
      reviews: 17,
    },
    {
      imgSrc: 'assets/img/product_3.png',
      discount: '15%',
      isNew: false,
      title: "Women's Western Party Dress",
      price: 50.0,
      oldPrice: 40.0,
      reviews: 22,
    },
    {
      imgSrc: 'assets/img/product_8.png',
      discount: '75%',
      isNew: true,
      title: 'tops pant beautiful dress',
      price: 75.0,
      oldPrice: 69.0,
      reviews: 58,
    },
    {
      imgSrc: 'assets/img/product_1.png',
      discount: '49%',
      isNew: false,
      title: "Kid's Western Party Dress",
      price: 49.0,
      oldPrice: 39.0,
      reviews: 44,
    },
    {
      imgSrc: 'assets/img/product_24.png',
      discount: '62%',
      isNew: false,
      title: "Men's premium formal shirt",
      price: 41.0,
      oldPrice: 59.0,
      reviews: 98,
    },
  ];

  categories = [
    { title: "Men's Fashion", img: 'assets/img/category_img_1.png', link: '/shop' },
    { title: "Women's Fashion", img: 'assets/img/category_img_2.png', link: '/shop' },
    { title: 'Kids Fashion', img: 'assets/img/category_img_5.png', link: '/shop' },
    { title: 'Kids Fashion', img: 'assets/img/category_img_7.png', link: '/shop' },
    { title: 'Kids Fashion', img: 'assets/img/category_img_7.png', link: '/shop' },
    { title: 'Kids Fashion', img: 'assets/img/category_img_7.png', link: '/shop' },
    { title: 'Kids Fashion', img: 'assets/img/category_img_7.png', link: '/shop' },
    { title: 'Kids Fashion', img: 'assets/img/category_img_7.png', link: '/shop' },
    { title: 'Kids Fashion', img: 'assets/img/category_img_7.png', link: '/shop' },
    { title: 'Kids Fashion', img: 'assets/img/category_img_7.png', link: '/shop' },
    { title: 'Kids Fashion', img: 'assets/img/category_img_7.png', link: '/shop' },
    { title: 'Kids Fashion', img: 'assets/img/category_img_7.png', link: '/shop' },
    { title: 'Kids Fashion', img: 'assets/img/category_img_7.png', link: '/shop' },
  ];

  specialProducts = [
    {
      title: "Men's premium formal shirt",
      img: 'assets/img/product_24.png',
      save: 20,
      price: 41,
      oldPrice: 59,
    },
    {
      title: 'Full Sleeve Hoodie Jacket',
      img: 'assets/img/product_1.png',
      save: 8,
      price: 40,
      oldPrice: 48,
    },
    {
      title: "Women's Western Party Dress",
      img: 'assets/img/product_3.png',
      save: 10,
      price: 50,
      oldPrice: 60,
    },
    {
      title: 'tops pant beautiful dress',
      img: 'assets/img/product_8.png',
      save: 18,
      price: 75,
      oldPrice: 93,
    },
    {
      title: 'tops pant beautiful dress',
      img: 'assets/img/product_8.png',
      save: 18,
      price: 75,
      oldPrice: 93,
    },
    {
      title: 'tops pant beautiful dress',
      img: 'assets/img/product_8.png',
      save: 18,
      price: 75,
      oldPrice: 93,
    },
    {
      title: 'tops pant beautiful dress',
      img: 'assets/img/product_8.png',
      save: 18,
      price: 75,
      oldPrice: 93,
    },
    {
      title: 'tops pant beautiful dress',
      img: 'assets/img/product_8.png',
      save: 18,
      price: 75,
      oldPrice: 93,
    },
  ];

  smallCards: BestProduct[] = [
    {
      id: 1,
      title: "Men's trendy casual shoes",
      img: '../assets/img/best_sell_pro_img_3.jpg',
      price: 89,
      oldPrice: 12,
      link: '/shop-details/1',
    },
    {
      id: 2,
      title: "Kid's Western Party Dress",
      img: '../assets/img/best_sell_pro_img_2.jpg',
      price: 75,
      oldPrice: 99,
      link: '/shop-details/2',
    },
    {
      id: 3,
      title: "Men's Casual Winter Jacket",
      img: '../assets/img/best_sell_pro_img_2.jpg',
      price: 60,
      oldPrice: 65,
      link: '/shop-details/3',
    },
  ];

  largeCard: BestProduct = {
    id: 4,
    title: 'Best Sales Discount And Offers',
    img: '../assets/img/best_sell_pro_img_4.jpg',
    price: 89,
    oldPrice: 12,
    link: '/shop-details/4',
  };

  arrivalProducts: ProductCard[] = [
    {
      id: 18,
      title: 'Full Sleeve Hoodie Jacket',
      img: '../assets/img/product_1.png',
      price: 88,
      rating: 5,
      reviews: 20,
      isNew: true,
      colors: [
        { hex: '#DB4437', active: true },
        { hex: '#638C34' },
        { hex: '#1C58F2' },
        { hex: '#FFA500' }
      ],
      link: '/shop-details/18'
    },
    {
      id: 19,
      title: "Men's premium formal shirt",
      img: '../assets/img/product_30.png',
      price: 46,
      rating: 4,
      reviews: 17,
      isNew: true,
      colors: [
        { hex: '#DB4437', active: true },
        { hex: '#638C34' },
        { hex: '#FFA500' }
      ],
      link: '/shop-details/19'
    },
    {
      id: 20,
      title: 'Cherry fabric western tops',
      img: '../assets/img/product_3.png',
      price: 46,
      rating: 3.5,
      reviews: 22,
      isNew: true,
      colors: [
        { hex: '#DB4437', active: true },
        { hex: '#638C34' },
        { hex: '#1C58F2' },
        { hex: '#FFA500' }
      ],
      link: '/shop-details/20'
    },
    {
      id: 4,
      title: 'Comfortable Sports Sneakers',
      img: '../assets/img/product_30.png',
      price: 75,
      rating: 5,
      reviews: 58,
      isNew: true,
      colors: [
        { hex: '#DB4437', active: true },
        { hex: '#638C34' }
      ],
      link: '/shop-details/4'
    },
    {
      id: 23,
      title: "Kid's dresses for summer",
      img: '../assets/img/product_8.png',
      price: 70,
      rating: 4,
      reviews: 44,
      isNew: true,
      colors: [
        { hex: '#DB4437', active: true },
        { hex: '#638C34' },
        { hex: '#1C58F2' },
        { hex: '#FFA500' }
      ],
      link: '/shop-details/23'
    }
  ];

  banner = {
    img: '../assets/img/favourite_pro_2_banner_img.png',
    titleLine1: 'This Spring On Apple',
    titleLine2: 'Up To 50K Off',
    subtitle: 'Limited Time Offer',
    link: '/shop-details/1'
  };

  favoriteProducts: ProductCard[] = [
    {
      id: 24,
      title: 'Women denim jacket',
      img: '../assets/img/product_3.png',
      price: 49,
      rating: 3.5,
      reviews: 44,
      colors: [],
      link: '/shop-details/24'
    },
    {
      id: 23,
      title: "Kid's Western Party Dress",
      img: '../assets/img/product_8.png',
      price: 40,
      oldPrice: 48,
      discountPercent: 20,
      rating: 3.5,
      reviews: 20,
      colors: [],
      link: '/shop-details/23'
    },
    {
      id: 25,
      title: 'Half Sleeve Jacket For Women',
      img: '../assets/img/product_8.png',
      price: 60,
      rating: 3.5,
      reviews: 57,
      colors: [],
      link: '/shop-details/25'
    },
    {
      id: 26,
      title: "Kid's Western Party Dress",
      img: '../assets/img/product_8.png',
      price: 40,
      oldPrice: 48,
      discountPercent: 58,
      rating: 3.5,
      reviews: 88,
      colors: [],
      link: '/shop-details/26'
    },
    {
      id: 26,
      title: "Kid's Western Party Dress",
      img: '../assets/img/product_8.png',
      price: 40,
      oldPrice: 48,
      discountPercent: 58,
      rating: 3.5,
      reviews: 88,
      colors: [],
      link: '/shop-details/26'
    },
    {
      id: 26,
      title: "Kid's Western Party Dress",
      img: '../assets/img/product_8.png',
      price: 40,
      oldPrice: 48,
      discountPercent: 58,
      rating: 3.5,
      reviews: 88,
      colors: [],
      link: '/shop-details/26'
    },
    {
      id: 26,
      title: "Kid's Western Party Dress",
      img: '../assets/img/product_8.png',
      price: 40,
      oldPrice: 48,
      discountPercent: 58,
      rating: 3.5,
      reviews: 88,
      colors: [],
      link: '/shop-details/26'
    }
  ];

  slide(dir: 'prev' | 'next') {
    if (!isPlatformBrowser(this.platformId)) return;
    const el = this.track?.nativeElement;
    if (!el) return;
    const card = el.querySelector('.slide') as HTMLElement | null;
    const step = card ? card.offsetWidth + 18 : 320; // gap
    el.scrollBy({ left: dir === 'next' ? step : -step, behavior: 'smooth' });
  }

  formatPrice(v: number) {
    return `$${v.toFixed(2)}`;
  }

  // لعرض نجوم (full/half/empty)
  getStars(rating: number) {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);

    return {
      full: Array(full).fill(0),
      half,
      empty: Array(empty).fill(0)
    };
  }

  async ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    if (typeof customElements === 'undefined') return;

    await customElements.whenDefined('swiper-container');

    const mainEl = this.swiperEl?.nativeElement;
    if (mainEl && typeof mainEl.initialize === 'function') {
      Object.assign(mainEl, this.swiperConfig);
      mainEl.initialize();
    }

    const productEl = this.productSwiperEl?.nativeElement;
    if (productEl && typeof productEl.initialize === 'function') {
      Object.assign(productEl, this.productSwiperConfig);
      productEl.initialize();
    }

    const categoryEl = this.categorySwiperEl?.nativeElement;
    if (categoryEl && typeof categoryEl.initialize === 'function') {
      Object.assign(categoryEl, this.categorySwiperConfig);
      categoryEl.initialize();
    }

    this.activateRightAd();
  }

  private setActiveSlide(swiper: any) {
    const slides = swiper?.slides as HTMLElement[] | undefined;
    if (!slides?.length) return;

    slides.forEach((sl) => sl.querySelector('.banner_slide')?.classList.remove('is-active'));

    const active = slides[swiper.activeIndex];
    active?.querySelector('.banner_slide')?.classList.add('is-active');
  }

  private activateRightAd() {
    if (typeof document === 'undefined') return;
    document.querySelector('.banner_2_add')?.classList.add('is-active');
  }
}

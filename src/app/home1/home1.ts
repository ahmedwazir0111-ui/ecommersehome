import { NgClass, NgFor, NgIf, isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-home1',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './home1.html',
  styleUrl: './home1.scss',
})
export class Home1 implements OnInit, OnDestroy {
  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {}

  activeTrendingTab: 'Western' | 'Tops' | 'Bags' | 'Shoes' = 'Western';

  setTrendingTab(tab: 'Western' | 'Tops' | 'Bags' | 'Shoes'): void {
    this.activeTrendingTab = tab;
  }

  trendingTabs: Array<'Western' | 'Tops' | 'Bags' | 'Shoes'> = ['Western', 'Tops', 'Bags', 'Shoes'];

trendingProducts = [
  {
    category: 'Western',
    title: "Men's Casual Denim Shirt",
    price: 70,
    oldPrice: 95,
    rating: 4.5,
    reviews: 41,
    isNew: true,
    discountPercent: 75,
    image: '../assets/img/product_24.png',
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
    image: '../assets/img/product_3.png',
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
    image: '../assets/img/product_27.png',
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
    image: '../assets/img/product_8.png',
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
    image: '../assets/img/product_3.png',
    link: 'shop-details.php',
    colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
  },
  // Bags
  {
    category: 'Bags',
    title: "Premium Bag Collection",
    price: 90,
    oldPrice: 110,
    rating: 4,
    reviews: 11,
    isNew: false,
    discountPercent: 45,
    image: '../assets/img/product_3.png',
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
    image: '../assets/img/product_8.png',
    link: 'shop-details.php',
    colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
  },
];

get filteredTrendingProducts() {
  return this.trendingProducts
    .filter(p => p.category === this.activeTrendingTab)
    .slice(0, 8); // زي القالب (8 كروت)
}

/** نجوم Bootstrap Icons */
getStars(rating: number): string[] {
  const stars: string[] = [];

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) stars.push('bi-star-fill star-full');
  if (hasHalfStar) stars.push('bi-star-half star-half');
  for (let i = 0; i < emptyStars; i++) stars.push('bi-star star-empty');

  return stars;
}



bundleBanner = {
  image: '../assets/img/bundle_banner_img.jpg',
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

bundleProducts = [
  {
    title: "Men's casual denim shirt",
    price: 59,
    oldPrice: null,
    isNew: true,
    discountPercent: null,
    image: '../assets/img/product_27.png',
    link: 'shop-details.php',
  },
  {
    title: "Women's premium Cotton",
    price: 35,
    oldPrice: 40,
    isNew: false,
    discountPercent: 75,
    image: '../assets/img/product_1.png',
    link: 'shop-details.php',
  },
  {
    title: "Men's casual denim pants",
    price: 120,
    oldPrice: null,
    isNew: false,
    discountPercent: null,
    image: '../assets/img/product_27.png',
    link: 'shop-details.php',
  },
  {
    title: "Women's Premium Shirt",
    price: 139,
    oldPrice: 179,
    isNew: false,
    discountPercent: 45,
    image: '../assets/img/product_1.png',
    link: 'shop-details.php',
  },
  {
    title: "Men's premium formal shirt",
    price: 132,
    oldPrice: null,
    isNew: false,
    discountPercent: null,
    image: '../assets/img/product_1.png',
    link: 'shop-details.php',
  },
  {
    title: "Women's premium Cotton",
    price: 89,
    oldPrice: null,
    isNew: true,
    discountPercent: null,
    image: '../assets/img/product_27.png',
    link: 'shop-details.php',
  },
  {
    title: "Men's T-shirt combo",
    price: 130,
    oldPrice: 150,
    isNew: true,
    discountPercent: 75,
    image: '../assets/img/product_27.png',
    link: 'shop-details.php',
  },
  {
    title: "Kid's Western Party Dress",
    price: 75,
    oldPrice: null,
    isNew: false,
    discountPercent: null,
    image: '../assets/img/product_27.png',
    link: 'shop-details.php',
  },
];


brands = [
  '../assets/img/brand1.png',
  '../assets/img/brand2.png',
  '../assets/img/brand4.png',
  '../assets/img/brand1.png',
  '../assets/img/brand2.png',
  '../assets/img/brand4.png',
  '../assets/img/brand9.png',
];

featuredProducts = [
  {
    title: "Men's Casual Denim Shirt",
    image: '../assets/img/product_24.png',
    link: 'shop-details.php',
    reviews: 41,
    price: 70,
    oldPrice: 95,
    starsFull: 4,
    hasHalf: true,
    starsEmpty: 0,
  },
  {
    title: "Women's Premium Cotton",
    image: '../assets/img/product_27.png',
    link: 'shop-details.php',
    reviews: 82,
    price: 35,
    oldPrice: null,
    starsFull: 5,
    hasHalf: false,
    starsEmpty: 0,
  },
  {
    title: "Men's Fashionable Hoodie",
    image: '../assets/img/product_1.png',
    link: 'shop-details.php',
    reviews: 25,
    price: 130,
    oldPrice: null,
    starsFull: 4,
    hasHalf: false,
    starsEmpty: 1,
  },
];

weeklyProducts = [
  {
    title: "Kid's Western Party Dress",
    image: '../assets/img/product_3.png',
    link: 'shop-details.php',
    reviews: 120,
    price: 80,
    oldPrice: null,
    starsFull: 4,
    hasHalf: false,
    starsEmpty: 1,
  },
  {
    title: "Women's Western Party Dress",
    image: '../assets/img/product_8.png',
    link: 'shop-details.php',
    reviews: 35,
    price: 40,
    oldPrice: 48,
    starsFull: 4,
    hasHalf: false,
    starsEmpty: 1,
  },
  {
    title: "Premium Bag Collection",
    image: '../assets/img/product_3.png',
    link: 'shop-details.php',
    reviews: 11,
    price: 90,
    oldPrice: 110,
    starsFull: 4,
    hasHalf: false,
    starsEmpty: 1,
  },
];

topRatedProducts = [
  {
    title: "Men's trendy casual shoes",
    image: '../assets/img/product_8.png',
    link: 'shop-details.php',
    reviews: 88,
    price: 70,
    oldPrice: null,
    starsFull: 4,
    hasHalf: true,
    starsEmpty: 0,
  },
  {
    title: "Wedtrend Women's Short Dress",
    image: '../assets/img/product_3.png',
    link: 'shop-details.php',
    reviews: 9,
    price: 130,
    oldPrice: 150,
    starsFull: 3,
    hasHalf: true,
    starsEmpty: 1,
  },
  {
    title: "Men's Casual Denim Blazer",
    image: '../assets/img/product_27.png',
    link: 'shop-details.php',
    reviews: 48,
    price: 45,
    oldPrice: 55,
    starsFull: 4,
    hasHalf: true,
    starsEmpty: 0,
  },
];

   // ===================== Banner Slider =====================
  slides = [
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
  private bannerIntervalId: ReturnType<typeof setInterval> | undefined;

  // ===================== Category Slider =====================
  @ViewChild('catTrack') catTrack?: ElementRef<HTMLElement>;

  categories = [
    { title: 'Western Wear', items: 24, image: '../assets/img/category_img_1.png', link: 'shop.php', colorClass: 'color-1' },
    { title: 'Sport Wear', items: 34, image: '../assets/img/category_img_2.png', link: 'shop.php', colorClass: 'color-2' },
    { title: 'Footwear', items: 57, image: '../assets/img/category_img_5.png', link: 'shop.php', colorClass: 'color-3' },
    { title: 'Winter Collection', items: 24, image: '../assets/img/category_img_7.png', link: 'shop.php', colorClass: 'color-4' },
    { title: 'Fashion Jewellery', items: 9, image: '../assets/img/category_img_1.png', link: 'shop.php', colorClass: 'color-5' },
    { title: "Men's Fashion", items: 47, image: '../assets/img/category_img_2.png', link: 'shop.php', colorClass: 'color-6' },
    { title: "Denim Collection", items: 32, image: '../assets/img/category_img_5.png', link: 'shop.php', colorClass: 'color-7' },
    { title: "Kids Fashion", items: 53, image: '../assets/img/category_img_7.png', link: 'shop.php', colorClass: 'color-8' },
    { title: "Women's Fashion", items: 69, image: '../assets/img/category_img_1.png', link: 'shop.php', colorClass: 'color-9' },
    { title: 'Accessories', items: 18, image: '../assets/img/category_img_5.png', link: 'shop.php', colorClass: 'color-10' },
  ];

  private catIntervalId: ReturnType<typeof setInterval> | undefined;
  private catScrollTimeout: any;

  @ViewChild('flashTrack') flashTrack?: ElementRef<HTMLElement>;

flashProducts = [
  {
    title: "Men's Casual Denim Blazer",
    image: '../assets/img/product_27.png',
    isNew: true,
    discount: 45,
    price: 45,
    oldPrice: 55,
    reviews: 48,
    rating: 4.5,
    colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
    link: 'shop-details.php',
  },
  {
    title: "Kid's Western Party Dress",
    image: '../assets/img/product_3.png',
    isNew: false,
    discount: 0,
    price: 80,
    oldPrice: null,
    reviews: 120,
    rating: 4,
    colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
    link: 'shop-details.php',
  },
  {
    title: "Men's Fashionable Hoodie",
    image: '../assets/img/product_1.png',
    isNew: true,
    discount: 0,
    price: 130,
    oldPrice: null,
    reviews: 25,
    rating: 4,
    colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
    link: 'shop-details.php',
  },
  {
    title: 'Kids Premium Cotton Combo',
    image: '../assets/img/product_3.png',
    isNew: true,
    discount: 45,
    price: 40,
    oldPrice: 50,
    reviews: 79,
    rating: 4.5,
    colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
    link: 'shop-details.php',
  },
  {
    title: 'Kids Premium Cotton Combo',
    image: '../assets/img/product_3.png',
    isNew: true,
    discount: 45,
    price: 40,
    oldPrice: 50,
    reviews: 79,
    rating: 4.5,
    colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
    link: 'shop-details.php',
  },
  {
    title: 'Kids Premium Cotton Combo',
    image: '../assets/img/product_3.png',
    isNew: true,
    discount: 45,
    price: 40,
    oldPrice: 50,
    reviews: 79,
    rating: 4.5,
    colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
    link: 'shop-details.php',
  },
  {
    title: 'Kids Premium Cotton Combo',
    image: '../assets/img/product_3.png',
    isNew: true,
    discount: 45,
    price: 40,
    oldPrice: 50,
    reviews: 79,
    rating: 4.5,
    colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
    link: 'shop-details.php',
  },
  {
    title: 'Kids Premium Cotton Combo',
    image: '../assets/img/product_3.png',
    isNew: true,
    discount: 45,
    price: 40,
    oldPrice: 50,
    reviews: 79,
    rating: 4.5,
    colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
    link: 'shop-details.php',
  },
  {
    title: 'Kids Premium Cotton Combo',
    image: '../assets/img/product_3.png',
    isNew: true,
    discount: 45,
    price: 40,
    oldPrice: 50,
    reviews: 79,
    rating: 4.5,
    colors: ['#DB4437', '#638C34', '#1C58F2', '#ffa500'],
    link: 'shop-details.php',
  },
];

 
  // ===================== Flash Sell Countdown =====================
  countdown = {
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  };

  private countdownIntervalId: ReturnType<typeof setInterval> | undefined;

  // ✅ حدد نهاية الفلاش سيل (غيّر التاريخ/المدة براحتك)
  // مثال: بعد 7 أيام من الآن
  private flashEndDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  // ===================== Lifecycle =====================
  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Banner auto
    this.startBannerAuto();

    // Category auto
    this.startCategoryAutoScroll();

    // Flash sell countdown
    this.startCountdown();

    // Flash products auto scroll
    this.startFlashAutoScroll();
  }

  ngOnDestroy(): void {
    if (this.bannerIntervalId) clearInterval(this.bannerIntervalId);
    if (this.catIntervalId) clearInterval(this.catIntervalId);
    if (this.countdownIntervalId) clearInterval(this.countdownIntervalId);
    if (this.catScrollTimeout) clearTimeout(this.catScrollTimeout);
    if (this.flashIntervalId) clearInterval(this.flashIntervalId);
    if (this.flashScrollTimeout) clearTimeout(this.flashScrollTimeout);
  }

  // ===================== Banner Methods =====================
  private startBannerAuto(): void {
    this.bannerIntervalId = setInterval(() => this.nextSlide(), 3000);
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
    setTimeout(() => (this.animate = true), 10);
  }

  // ===================== Category Methods =====================
  private startCategoryAutoScroll(): void {
    // نضمن إن الـ ViewChild اتجهّز
    setTimeout(() => {
      if (this.catIntervalId) clearInterval(this.catIntervalId);

      this.catIntervalId = setInterval(() => {
        this.scrollCategories(1, false); // auto scroll
      }, 2500);
    }, 0);
  }

  private restartCategoryAutoScroll(): void {
    if (this.catIntervalId) clearInterval(this.catIntervalId);
    this.startCategoryAutoScroll();
  }

  onCategoryScroll(): void {
    // لو المستخدم سحب بإيده، نرجّع الأوتو بعد ما يخلص سحب
    clearTimeout(this.catScrollTimeout);
    this.catScrollTimeout = setTimeout(() => {
      this.restartCategoryAutoScroll();
    }, 300);
  }

  scrollCategories(direction: 1 | -1, fromUser: boolean = true): void {
    const el = this.catTrack?.nativeElement;
    if (!el) return;

    const step = 260;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    const nextLeft = el.scrollLeft + direction * step;

    // ✅ Loop
    if (nextLeft >= maxScrollLeft - 5) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (nextLeft <= 0) {
      el.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: direction * step, behavior: 'smooth' });
    }

    // ✅ لو المستخدم ضغط، نعمل restart للأوتو
    if (fromUser) this.restartCategoryAutoScroll();
  }

  // ===================== Countdown Methods =====================
  private startCountdown(): void {
    this.updateCountdown();
    this.countdownIntervalId = setInterval(() => this.updateCountdown(), 1000);
  }

  private updateCountdown(): void {
    const now = Date.now();
    const diff = this.flashEndDate.getTime() - now;

    if (diff <= 0) {
      this.countdown = { days: '00', hours: '00', minutes: '00', seconds: '00' };
      if (this.countdownIntervalId) clearInterval(this.countdownIntervalId);
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    this.countdown = {
      days: this.pad2(days),     // لو الأيام كبيرة هتظهر عادي (مثلاً 364)
      hours: this.pad2(hours),
      minutes: this.pad2(minutes),
      seconds: this.pad2(seconds),
    };
  }

  getStars2(rating: number): string[] {
  const stars: string[] = [];

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  // ⭐ نجوم كاملة
  for (let i = 0; i < fullStars; i++) {
    stars.push('bi-star-fill star-full');
  }

  // ⭐ نص نجمة
  if (hasHalfStar) {
    stars.push('bi-star-half star-half');
  }

  // ⭐ نجوم فاضية
  for (let i = 0; i < emptyStars; i++) {
    stars.push('bi-star star-empty');
  }

  return stars;
}

  private pad2(n: number): string {
    return n < 10 ? `0${n}` : `${n}`;
  }
private flashIntervalId: ReturnType<typeof setInterval> | undefined;
private flashScrollTimeout: any;

private startFlashAutoScroll(): void {
  setTimeout(() => {
    if (this.flashIntervalId) clearInterval(this.flashIntervalId);

    this.flashIntervalId = setInterval(() => {
      this.scrollFlash(1, false);
    }, 2300);
  }, 0);
}

private restartFlashAutoScroll(): void {
  if (this.flashIntervalId) clearInterval(this.flashIntervalId);
  this.startFlashAutoScroll();
}

onFlashScroll(): void {
  clearTimeout(this.flashScrollTimeout);
  this.flashScrollTimeout = setTimeout(() => {
    this.restartFlashAutoScroll();
  }, 300);
}

scrollFlash(direction: 1 | -1, fromUser: boolean = true): void {
  const el = this.flashTrack?.nativeElement;
  if (!el) return;

  const step = 360; // كارت المنتج أعرض من الكاتيجوري
  const maxScrollLeft = el.scrollWidth - el.clientWidth;
  const nextLeft = el.scrollLeft + direction * step;

  // Loop
  if (nextLeft >= maxScrollLeft - 5) {
    el.scrollTo({ left: 0, behavior: 'smooth' });
  } else if (nextLeft <= 0) {
    el.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
  } else {
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  }

  if (fromUser) this.restartFlashAutoScroll();
}
}

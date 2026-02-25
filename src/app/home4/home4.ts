import { Component, OnDestroy, OnInit ,ViewChild, ElementRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home4',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home4.html',
  styleUrls: ['./home4.scss'],
})
export class Home4 implements OnInit, OnDestroy {
  currentIndex = 0;
  private intervalId?: ReturnType<typeof setInterval>;
  private countdownInterval?: ReturnType<typeof setInterval>;
 @ViewChild('brandTrack', { static: false }) brandTrack!: ElementRef<HTMLDivElement>;



  slides = [
    {
      badge: 'New arrivals of 2025',
      title: 'Where Fashion Meets\nIndividuality',
      offerText: 'Exclusive offer',
      offerValue: '-50%',
      offerSuffix: 'off this week',
      ctaText: 'Shop Now',
      ctaLink: '/shop-details',
      imageUrl: 'assets/img/gadget_middle_banner_img_1.jpg',
    },
    {
      badge: 'Summer Collection',
      title: 'Premium Sound\nExperience',
      offerText: 'Limited time',
      offerValue: '-30%',
      offerSuffix: 'discount',
      ctaText: 'Discover',
      ctaLink: '/shop-details',
      imageUrl: 'assets/img/gadget_middle_banner_img_2.jpg',
    },
    {
      badge: 'Smart Watch',
      title: 'Style Meets\nTechnology',
      offerText: 'Hot Deal',
      offerValue: '-40%',
      offerSuffix: 'today only',
      ctaText: 'Buy Now',
      ctaLink: '/shop-details',
      imageUrl: 'assets/img/gadget_banner_bg_1.png',
    },
    {
      badge: 'Wireless Headset',
      title: 'Crystal Clear\nSound',
      offerText: 'Special Offer',
      offerValue: '-35%',
      offerSuffix: 'limited stock',
      ctaText: 'Shop Today',
      ctaLink: '/shop-details',
      imageUrl: 'assets/img/gadget_banner_bg_2.png',
    },
    {
      badge: 'Gaming Gear',
      title: 'Next Level\nPerformance',
      offerText: 'Weekend Deal',
      offerValue: '-25%',
      offerSuffix: 'only this week',
      ctaText: 'Explore',
      ctaLink: '/shop-details',
      imageUrl: 'assets/img/gadget_banner_bg_3.png',
    },
  ];

  featureProducts = [
    {
      title: 'Rapoo MT760L Bluetooth Dual Mode Mouse',
      price: '$75.00',
      link: '/shop-details',
      image: 'assets/img/gadget_feature_img_1.jpg',
      alt: 'Gadget Product',
    },
    {
      title: 'Rapoo MT760L Bluetooth Dual Mode Mouse',
      price: '$75.00',
      link: '/shop-details',
      image: 'assets/img/gadget_feature_img_3.jpg',
      alt: 'Gadget Product',
    },
    {
      title: 'Rapoo MT760L Bluetooth Dual Mode Mouse',
      price: '$75.00',
      link: '/shop-details',
      image: 'assets/img/gadget_feature_img_2.jpg',
      alt: 'Gadget Product',
    },
  ];

  features = [
    {
      title: 'Return & refund',
      desc: 'Money back guarantee',
      icon: 'bi-arrow-repeat',
      theme: 'purple',
    },
    {
      title: 'Quality Support',
      desc: 'Always online 24/7',
      icon: 'bi-headset',
      theme: 'green',
    },
    {
      title: 'Secure Payment',
      desc: '30% off by subscribing',
      icon: 'bi-shield-check',
      theme: 'orange',
    },
    {
      title: 'Daily Offers',
      desc: '20% off by subscribing',
      icon: 'bi-tag',
      theme: 'teal',
    },
  ];

  trendingBanner = {
    offText: '20% off',
    note: 'Limited offer',
    category: 'DSLR Camera',
    title: 'Canon EOS R50 V (RF-S14-30mm f/4-6.3 IS STM PZ)',
    link: '/shop-details',
    price: 40,
    oldPrice: 48,
    rating: 5,
    reviewsText: '(reviews)',
    available: 17,
    sold: 274,
    progressPercent: 75,
    image: 'assets/img/gadget_trending_product_banner_img.png',
    endsAt: new Date(new Date().getTime() + 364 * 24 * 60 * 60 * 1000),
  };

  countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };

  tabs = [
    { id: 'tv', label: 'TV & Video' },
    { id: 'phone', label: 'Smartphones' },
    { id: 'cam', label: 'Cameras' },
    { id: 'acc', label: 'Accessories' },
  ];

  activeTab = 'tv';

  tabProducts: Record<string, any[]> = {
    tv: [
      { title: 'Cheerlux C9 2800 Lumens Mini Projector with Built-in TV Card', img: 'assets/img/gadget_product_1.png', price: 40, oldPrice: 45, rating: 5, reviews: 17 },
      { title: 'CCanon RF 24-105mm f/4-7.1 IS STM Camera Lens', img: 'assets/img/gadget_product_13.png', price: 380, oldPrice: null, rating: 3.5, reviews: 20 },
      { title: 'Cheerlux C9 2800 Lumens Wi-Fi Mini LED Projector', img: 'assets/img/gadget_product_3.png', price: 199, oldPrice: 220, rating: 4.5, reviews: 72 },
      { title: 'Dahua HAC-B1A21P 2MP HDCVI IR Bullet Camera', img: 'assets/img/gadget_product_23.png', price: 40, oldPrice: null, rating: 3, reviews: 54 },
      { title: 'LG 43UR7550 43 Inch 4K UHD Smart LED TV', img: 'assets/img/gadget_product_24.png', price: 240, oldPrice: null, rating: 3.5, reviews: 72 },
      { title: 'A4TECH Bloody GP30 USB Gaming Controller', img: 'assets/img/gadget_product_6.png', price: 499, oldPrice: 525, rating: 5, reviews: 20 },
      { title: 'Awei P37K 10000mAh Fast Charging Power Bank', img: 'assets/img/gadget_product_9.png', price: 215, oldPrice: null, rating: 5, reviews: 17 },
      { title: 'Canon EOS 4000D 18MP DSLR Camera', img: 'assets/img/gadget_product_8.png', price: 40, oldPrice: 48, rating: 3, reviews: 20 },
    ],
    phone: [
      { title: 'Canon EOS 4000D 18MP DSLR Camera', img: 'assets/img/gadget_product_8.png', price: 40, oldPrice: 48, rating: 3, reviews: 20 },
      { title: 'Awei P37K 10000mAh Fast Charging Power Bank', img: 'assets/img/gadget_product_9.png', price: 215, oldPrice: null, rating: 5, reviews: 17 },
      { title: 'A4TECH Bloody GP30 USB Gaming Controller', img: 'assets/img/gadget_product_6.png', price: 499, oldPrice: 525, rating: 5, reviews: 20 },
      { title: 'LG 43UR7550 43 Inch 4K UHD Smart LED TV', img: 'assets/img/gadget_product_24.png', price: 240, oldPrice: null, rating: 3.5, reviews: 72 },
    ],
    cam: [
      { title: 'Cheerlux C9', img: 'assets/img/gadget_product_1.png', price: 40, oldPrice: 45, rating: 5, reviews: 17 },
      { title: 'CCanon RF 24-105mm f/4-7.1 IS STM Camera Lens', img: 'assets/img/gadget_product_13.png', price: 380, oldPrice: null, rating: 3.5, reviews: 20 },
    ],
    acc: [
      { title: 'A4TECH Bloody GP30 USB Gaming Controller', img: 'assets/img/gadget_product_6.png', price: 499, oldPrice: 525, rating: 5, reviews: 20 },
      { title: 'Awei P37K 10000mAh Fast Charging Power Bank', img: 'assets/img/gadget_product_9.png', price: 215, oldPrice: null, rating: 5, reviews: 17 },
    ],
  };

  largeBanner = {
    link: '/shop-details',
    bg: 'assets/img/gadget_large_banner_bg.jpg',
    img: 'assets/img/gadget_large_banner_img.png',
    tag: 'Headphones',
    title: 'Sony WH-1000XM5 Wireless Headphones Auto Noise\nCanceling',
    discount: '-70%',
  };

  newArrivalsHeading = {
    title: 'New Arrivals',
    link: '/shop',
    btnText: 'View All',
  };

  newArrivals = [
    {
      title: 'Dock Station (Type-C Female to Multiport Connection)',
      img: 'assets/img/gadget_product_23.png',
      price: 60,
      oldPrice: null,
      rating: 3.5,
      reviews: 143,
      link: '/shop-details',
    },
    {
      title: 'Havit H628BT Black Over-Ear Bluetooth Headphone',
      img: 'assets/img/gadget_product_24.png',
      price: 90,
      oldPrice: 105,
      rating: 5,
      reviews: 56,
      link: '/shop-details',
    },
    {
      title: 'CMicrolab BP21 Black Mini Portable Bluetooth Speaker',
      img: 'assets/img/gadget_product_25.png',
      price: 85,
      oldPrice: null,
      rating: 3.5,
      reviews: 20,
      link: '/shop-details',
    },
    {
      title: 'Apple iMac (Late 2023, 4 Port) Apple M3 Chip 8GB RAM, 256GB SSD 24 Inch',
      img: 'assets/img/gadget_product_13.png',
      price: 459,
      oldPrice: 500,
      rating: 5,
      reviews: 4,
      link: '/shop-details',
    },
    {
      title: 'CMicrolab BP21 Black Mini Portable Bluetooth Speaker',
      img: 'assets/img/gadget_product_25.png',
      price: 85,
      oldPrice: null,
      rating: 3.5,
      reviews: 20,
      link: '/shop-details',
    },
  ];



brands = [
  { img: 'assets/img/gadget_brand_6.png', link: '/shop' },
  { img: 'assets/img/gadget_brand_2.png', link: '/shop' },
  { img: 'assets/img/gadget_brand_6.png', link: '/shop' },
  { img: 'assets/img/gadget_brand_4.png', link: '/shop' },
  { img: 'assets/img/gadget_brand_2.png', link: '/shop' },
  { img: 'assets/img/gadget_brand_4.png', link: '/shop' },
  { img: 'assets/img/gadget_brand_6.png', link: '/shop' }
];


multiProductColumns = [
  {
    title: 'Trending Products',
    items: [
      {
        title: 'BL GO 3 Blue-Pink Portable Bluetooth Speaker #JBLGO3BLUP',
        img: 'assets/img/gadget_product_1.png',
        rating: 5,
        reviews: 88,
        price: 25,
        oldPrice: 32,
        link: '/shop-details'
      },
      {
        title: 'Deepcool WIND PAL MINI Black 15.6 inch Laptop Cooler',
        img: 'assets/img/gadget_product_3.png',
        rating: 4.5,
        reviews: 42,
        price: 28,
        oldPrice: null,
        link: '/shop-details'
      },
      {
        title: 'Gree GP-12NLF 1 Ton Portable Air Conditioner',
        img: 'assets/img/gadget_product_6.png',
        rating: 3.5,
        reviews: 48,
        price: 90,
        oldPrice: 110,
        link: '/shop-details'
      }
    ]
  },
  {
    title: 'Featured Products',
    items: [
      {
        title: 'Wiwu Wi-SE007 3-Axis Gray Smartphone Handheld Gimbal Stabilizer',
        img: 'assets/img/gadget_product_8.png',
        rating: 5,
        reviews: 57,
        price: 89,
        oldPrice: 100,
        link: '/shop-details'
      },
      {
        title: 'JBL Charge 5 Black Portable Bluetooth Speaker with Built-in Powerbank',
        img: 'assets/img/gadget_product_9.png',
        rating: 4.5,
        reviews: 42,
        price: 59,
        oldPrice: null,
        link: '/shop-details'
      },
      {
        title: 'Apple iMac (Late 2023, 4 Port) Apple M3 Chip 8GB RAM, 256GB SSD 24 Inch',
        img: 'assets/img/gadget_product_13.png',
        rating: 3.5,
        reviews: 48,
        price: 459,
        oldPrice: 500,
        link: '/shop-details'
      }
    ]
  },
  {
    title: 'Weekly Best Products',
    items: [
      {
        title: 'Xiaomi Solove F3 Mini White Rechargeable Clip Fan (4W, 2000mAh)',
        img: 'assets/img/gadget_product_23.png',
        rating: 3.5,
        reviews: 8,
        price: 39,
        oldPrice: null,
        link: '/shop-details'
      },
      {
        title: 'Royal Kludge RK R87 RGB Wired Hot Swap White Mechanical Gaming Keyboard',
        img: 'assets/img/gadget_product_24.png',
        rating: 5,
        reviews: 9,
        price: 130,
        oldPrice: 150,
        link: '/shop-details'
      },
      {
        title: 'Yuanxin X-2328 USB Male to Quad USB Female Black Hub # X-2328',
        img: 'assets/img/gadget_product_25.png',
        rating: 4.5,
        reviews: 27,
        price: 69,
        oldPrice: null,
        link: '/shop-details'
      }
    ]
  },
  {
    title: 'Top Rated Products',
    items: [
      {
        title: 'Dock Station (Type-C Female to Multiport Connection)',
        img: 'assets/img/gadget_product_1.png',
        rating: 5,
        reviews: 40,
        price: 125,
        oldPrice: 145,
        link: '/shop-details'
      },
      {
        title: 'Micropack WCP-10 PD Air Wave Wireless Black Charger',
        img: 'assets/img/gadget_product_3.png',
        rating: 3.5,
        reviews: 70,
        price: 85,
        oldPrice: null,
        link: '/shop-details'
      },
      {
        title: 'META Quest 3s Qualcomm Snapdragon XR2 Gen 2',
        img: 'assets/img/gadget_product_24.png',
        rating: 5,
        reviews: 82,
        price: 140,
        oldPrice: 155,
        link: '/shop-details'
      }
    ]
  }
];

adBanners = [
  {
    tag: 'Black Friday Offer',
    title: 'Wiwu Smartwatch\nUp To 50% Off',
    link: '/shop-details',
    bg: 'assets/img/gadget_middle_banner_img_2.jpg',
    btnClass: '' // زرار أصفر
  },
  {
    tag: 'Daily Offer',
    title: 'Micropack MHP-01\nUp To 70% Off',
    link: '/shop-details',
    bg: 'assets/img/gadget_middle_banner_img_1.jpg',
    btnClass: 'bg_blck' // زرار أبيض/أسود زي الصورة
  }
];

bestSellingHeading = {
  title: 'Best Selling Products',
  link: '/shop',
  btnText: 'View All'
};


// المنتجات (مثال زي الصورة)
bestSellingProducts = [
  {
    title: 'Micropack MWB-16 1MP HD Stream Webcam',
    img: 'assets/img/gadget_product_9.png',
    link: '/shop-details',
    rating: 5,
    reviews: 20,
    price: 215,
    oldPrice: 225
  },
  {
    title: 'DJI Neo Fly More Combo Drone with DJI RC-N3 Remote Controller',
    img: 'assets/img/gadget_product_24.png',
    link: '/shop-details',
    rating: 4.5,
    reviews: 72,
    price: 355
  },
  {
    title: 'DSmartX SX-578 WiFi Fingerprint Smart Door Lock',
    img: 'assets/img/gadget_product_8.png',
    link: '/shop-details',
    rating: 3,
    reviews: 54,
    price: 79
  },
  {
    title: 'GoPro HERO12 27MP 5.3K Black Action Camera with Max Lens Mod 2.0',
    img: 'assets/img/gadget_product_13.png',
    link: '/shop-details',
    rating: 4.5,
    reviews: 46,
    price: 129,
    oldPrice: 140
  },
  {
    title: 'A4TECH G3-200/200N Black & Blue Wireless Mouse',
    img: 'assets/img/gadget_product_1.png',
    link: '/shop-details',
    rating: 3.5,
    reviews: 133,
    price: 10
  }
];

// لو انت مستخدم نفس الدوال عندك للنجوم خلاص سيبها
// getFullStars / hasHalfStar / getEmptyStars

  private brandInterval?: ReturnType<typeof setInterval>;


  setTab(id: string): void {
    this.activeTab = id;
  }

  getFullStars(rating: number): number {
    return Math.floor(rating);
  }

  hasHalfStar(rating: number): boolean {
    return rating % 1 >= 0.5;
  }

  getEmptyStars(rating: number): number {
    return 5 - Math.ceil(rating);
  }

  ngOnInit(): void {
    this.intervalId = setInterval(() => this.nextSlide(), 4000);
    this.updateCountdown();
    this.countdownInterval = setInterval(() => this.updateCountdown(), 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    if (this.brandInterval) {
      clearInterval(this.brandInterval);
    }
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }
  ngAfterViewInit(): void {
  // auto scroll
  this.brandInterval = setInterval(() => this.scrollBrands('next'), 2500);
}

scrollBrands(dir: 'prev' | 'next'): void {
  if (!this.brandTrack) return;
  const el = this.brandTrack.nativeElement;

  const step = 220; // نفس عرض الكارت تقريباً
  const go = dir === 'next' ? step : -step;

  el.scrollBy({ left: go, behavior: 'smooth' });

  // loop لما يوصل للآخر
  if (dir === 'next') {
    const nearEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
    if (nearEnd) {
      setTimeout(() => el.scrollTo({ left: 0, behavior: 'smooth' }), 400);
    }
  } else {
    if (el.scrollLeft <= 0) {
      setTimeout(() => el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' }), 400);
    }
  }
}

  private updateCountdown(): void {
    const now = new Date().getTime();
    const end = new Date(this.trendingBanner.endsAt).getTime();
    const diff = Math.max(0, end - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    this.countdown = { days, hours, minutes, seconds };
  }
}

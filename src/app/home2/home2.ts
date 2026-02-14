import { DecimalPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

type GroceryCategory = 'vegetables' | 'nuts' | 'drinks' | 'root' | 'fruits';

type AdBanner = {
  title: string;
  heading: string;
  bg: string;
  btnText: string;
  link: string;
  btnVariant?: 'green' | 'black';
};

type ProductTab = { key: GroceryCategory; label: string };

type GroceryProduct = {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  img: string;
  category: GroceryCategory;
  link?: string;
};

type BestProduct = {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  img: string;
};

type SpecialBanner = {
  title: string;
  heading: string;
  desc: string;
  bg: string;
  btnText: string;
  link: string;
};

type SpecialProduct = {
  id: number;
  title: string;
  img: string;
  price: number;
  oldPrice?: number;
  save?: number;
  rating?: number;
  link?: string;
};

@Component({
  selector: 'app-home2',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, RouterLink, DecimalPipe],
  templateUrl: './home2.html',
  styleUrls: ['./home2.scss'],
})
export class Home2 implements AfterViewInit, OnDestroy {
  @ViewChild('catTrack', { static: true }) catTrack!: ElementRef<HTMLDivElement>;
  @ViewChild('bestSellTrack', { static: true }) bestSellTrack!: ElementRef<HTMLDivElement>;
  @ViewChild('partnersTrack', { static: true }) partnersTrack!: ElementRef<HTMLDivElement>;
  @ViewChild('testiTrack', { static: true }) testiTrack!: ElementRef<HTMLDivElement>;
  @ViewChild('blogTrack', { static: true }) blogTrack!: ElementRef<HTMLDivElement>;

  bannerBg = 'assets/img/grocery_banner_bg.jpg';
  countdownBg = 'assets/img/grocery_countdown_bg.jpg';
  dealEndsAt = new Date('2027-02-10T00:00:00');

  activeTab: GroceryCategory = 'vegetables';
  countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };

  testiPage = 0;
  pagesArray: number[] = [];
  blogPage = 0;
  blogPages: number[] = [];

  private autoSlideInterval?: ReturnType<typeof setInterval>;
  private countdownTimer?: ReturnType<typeof setInterval>;
  private maxPerPage = 3;
  private testiPerPage = 1;
  private testiGap = 20;
  private rafLock = false;
  private blogGap = 24;
  private blogMaxPerPage = 3;
  private blogPerPage = 1;
  private blogRafLock = false;

  private calcTestiPagingBound = () => this.calcTestiPaging();
  private calcBlogPagingBound = () => this.calcBlogPaging();

  categorySlides = [
    { title: 'Apple', img: 'assets/img/category_icon_1.png', colorClass: 'color_6', link: '/shop' },
    { title: 'Cabbage', img: 'assets/img/category_icon_3.png', colorClass: 'color_3', link: '/shop' },
    { title: 'Blueberry', img: 'assets/img/category_icon_4.png', colorClass: 'color_1', link: '/shop' },
    { title: 'Strawberry', img: 'assets/img/category_icon_6.png', colorClass: 'color_2', link: '/shop' },
    { title: 'Cabbage', img: 'assets/img/category_icon_3.png', colorClass: 'color_3', link: '/shop' },
    { title: 'Blueberry', img: 'assets/img/category_icon_1.png', colorClass: 'color_1', link: '/shop' },
    { title: 'Strawberry', img: 'assets/img/category_icon_4.png', colorClass: 'color_2', link: '/shop' },
    { title: 'Cabbage', img: 'assets/img/category_icon_3.png', colorClass: 'color_3', link: '/shop' },
    { title: 'Blueberry', img: 'assets/img/category_icon_1.png', colorClass: 'color_1', link: '/shop' },
    { title: 'Strawberry', img: 'assets/img/category_icon_6.png', colorClass: 'color_2', link: '/shop' },
    { title: 'Eggplant', img: 'assets/img/category_icon_4.png', colorClass: 'color_4', link: '/shop' },
  ];

  adBanners: AdBanner[] = [
    {
      title: 'Black Friday Offer',
      heading: 'Organic Foods\nUp To 45% Off',
      bg: 'assets/img/grocerry_add_bg_1.jpg',
      btnText: 'Shop Now',
      link: '/shop-details',
      btnVariant: 'green',
    },
    {
      title: 'Daily Offer',
      heading: 'Vegetables Up\nTo 65% Off',
      bg: 'assets/img/grocerry_add_bg_2.jpg',
      btnText: 'Shop Now',
      link: '/shop-details',
      btnVariant: 'black',
    },
  ];

  productTabs: ProductTab[] = [
    { key: 'vegetables', label: 'Vegetables' },
    { key: 'nuts', label: 'Nuts' },
    { key: 'drinks', label: 'Drinks' },
    { key: 'root', label: 'Root' },
    { key: 'fruits', label: 'Fruits' },
  ];

  products: GroceryProduct[] = [
    { id: 1, title: 'Lemon Meat Bone', price: 20, oldPrice: 25, img: 'assets/img/grocery_product_img_1.jpg', category: 'vegetables', link: '/shop-details' },
    { id: 2, title: 'Fresh Red Seedless', price: 12, oldPrice: 10, img: 'assets/img/grocery_product_img_2.jpg', category: 'vegetables', link: '/shop-details' },
    { id: 3, title: 'Carrot Vegetables', price: 33, oldPrice: 28, img: 'assets/img/grocery_product_img_6.jpg', category: 'vegetables', link: '/shop-details' },
    { id: 4, title: 'Bengal Beef Bone', price: 12, oldPrice: 10, img: 'assets/img/grocery_product_img_8.jpg', category: 'vegetables', link: '/shop-details' },
    { id: 2, title: 'Fresh Red Seedless', price: 12, oldPrice: 10, img: 'assets/img/grocery_product_img_2.jpg', category: 'vegetables', link: '/shop-details' },
    { id: 3, title: 'Carrot Vegetables', price: 33, oldPrice: 28, img: 'assets/img/grocery_product_img_1.jpg', category: 'vegetables', link: '/shop-details' },
    { id: 3, title: 'Carrot Vegetables', price: 33, oldPrice: 28, img: 'assets/img/grocery_product_img_6.jpg', category: 'vegetables', link: '/shop-details' },
    { id: 4, title: 'Bengal Beef Bone', price: 12, oldPrice: 10, img: 'assets/img/grocery_product_img_8.jpg', category: 'vegetables', link: '/shop-details' },
    { id: 5, title: 'Almond Mix', price: 30, oldPrice: 34, img: 'assets/img/grocery_product_img_1.jpg', category: 'nuts', link: '/shop-details' },
    { id: 6, title: 'Orange Slice Mix', price: 29, oldPrice: 35, img: 'assets/img/grocery_product_img_6.jpg', category: 'nuts', link: '/shop-details' },
    { id: 5, title: 'Almond Mix', price: 30, oldPrice: 34, img: 'assets/img/grocery_product_img_6.jpg', category: 'nuts', link: '/shop-details' },
    { id: 6, title: 'Orange Slice Mix', price: 29, oldPrice: 35, img: 'assets/img/grocery_product_img_8.jpg', category: 'nuts', link: '/shop-details' },
    { id: 7, title: 'Fresh Juice', price: 18, oldPrice: 22, img: 'assets/img/grocery_product_img_8.jpg', category: 'drinks', link: '/shop-details' },
    { id: 7, title: 'Fresh Juice', price: 18, oldPrice: 22, img: 'assets/img/grocery_product_img_2.jpg', category: 'drinks', link: '/shop-details' },
    { id: 7, title: 'Fresh Juice', price: 18, oldPrice: 22, img: 'assets/img/grocery_product_img_6.jpg', category: 'drinks', link: '/shop-details' },
    { id: 7, title: 'Fresh Juice', price: 18, oldPrice: 22, img: 'assets/img/grocery_product_img_1.jpg', category: 'drinks', link: '/shop-details' },
    { id: 8, title: 'Root Veg Pack', price: 22, oldPrice: 26, img: 'assets/img/grocery_product_img_1.jpg', category: 'root', link: '/shop-details' },
    { id: 8, title: 'Root Veg Pack', price: 22, oldPrice: 26, img: 'assets/img/grocery_product_img_2.jpg', category: 'root', link: '/shop-details' },
    { id: 8, title: 'Root Veg Pack', price: 22, oldPrice: 26, img: 'assets/img/grocery_product_img_6.jpg', category: 'root', link: '/shop-details' },
    { id: 8, title: 'Root Veg Pack', price: 22, oldPrice: 26, img: 'assets/img/grocery_product_img_8.jpg', category: 'root', link: '/shop-details' },
    { id: 9, title: 'Fresh Mango Fruits', price: 22, oldPrice: 26, img: 'assets/img/grocery_product_img_1.jpg', category: 'fruits', link: '/shop-details' },
    { id: 9, title: 'Fresh Mango Fruits', price: 22, oldPrice: 26, img: 'assets/img/grocery_product_img_2.jpg', category: 'fruits', link: '/shop-details' },
    { id: 9, title: 'Fresh Mango Fruits', price: 22, oldPrice: 26, img: 'assets/img/grocery_product_img_6.jpg', category: 'fruits', link: '/shop-details' },
    { id: 9, title: 'Fresh Mango Fruits', price: 22, oldPrice: 26, img: 'assets/img/grocery_product_img_8.jpg', category: 'fruits', link: '/shop-details' },
  ];

  bestProducts: BestProduct[] = [
    { id: 1, title: 'Carrot Vegetables', price: 45, oldPrice: 50, img: 'assets/img/grocery_product_img_1.jpg' },
    { id: 2, title: 'Orange Slice Mix', price: 29, oldPrice: 35, img: 'assets/img/grocery_product_img_2.jpg' },
    { id: 3, title: 'Beef Butter Cake', price: 30, oldPrice: 34, img: 'assets/img/grocery_product_img_6.jpg' },
    { id: 4, title: 'Bengal Beef Bone', price: 12, oldPrice: 10, img: 'assets/img/grocery_product_img_8.jpg' },
    { id: 2, title: 'Orange Slice Mix', price: 29, oldPrice: 35, img: 'assets/img/grocery_product_img_2.jpg' },
    { id: 3, title: 'Beef Butter Cake', price: 30, oldPrice: 34, img: 'assets/img/grocery_product_img_6.jpg' },
    { id: 4, title: 'Bengal Beef Bone', price: 12, oldPrice: 10, img: 'assets/img/grocery_product_img_8.jpg' },
    { id: 2, title: 'Orange Slice Mix', price: 29, oldPrice: 35, img: 'assets/img/grocery_product_img_2.jpg' },
    { id: 3, title: 'Beef Butter Cake', price: 30, oldPrice: 34, img: 'assets/img/grocery_product_img_6.jpg' },
    { id: 4, title: 'Bengal Beef Bone', price: 12, oldPrice: 10, img: 'assets/img/grocery_product_img_8.jpg' },
    { id: 5, title: 'Fresh Mango Fruits', price: 22, oldPrice: 26, img: 'assets/img/grocery_product_img_1.jpg' },
  ];

  partners = [
    { name: 'Farm 1', logo: 'assets/img/partner_1.png' },
    { name: 'Farm 2', logo: 'assets/img/partner_2.png' },
    { name: 'Farm 3', logo: 'assets/img/partner_3.png' },
    { name: 'Farm 4', logo: 'assets/img/partner_4.png' },
    { name: 'Farm 5', logo: 'assets/img/partner_5.png' },
    { name: 'Farm 6', logo: 'assets/img/partner_6.png' },
  ];

  brands = [
    { name: 'Brand 1', logo: 'assets/img/grocery_brand_3.png', link: '/shop' },
    { name: 'Brand 2', logo: 'assets/img/grocery_brand_4.png', link: '/shop' },
    { name: 'Brand 3', logo: 'assets/img/grocery_brand_3.png', link: '/shop' },
    { name: 'Brand 4', logo: 'assets/img/grocery_brand_4.png', link: '/shop' },
    { name: 'Brand 5', logo: 'assets/img/grocery_brand_5.png', link: '/shop' },
    { name: 'Brand 6', logo: 'assets/img/grocery_brand_6.png', link: '/shop' },
  ];

  specialBanner: SpecialBanner = {
    title: 'Weekly Discounts on',
    heading: 'Fruits And Vegetables',
    desc: 'It is a long established fact that a reader acted by the readable content.',
    bg: 'assets/img/grocery_special_pro_banner_img.jpg',
    btnText: 'Shop Now',
    link: '/shop-details',
  };

  specialProducts: SpecialProduct[] = [
    { id: 1, title: 'Butter Garlic Crab', img: 'assets/img/grocery_product_img_1.jpg', price: 10, oldPrice: 12, save: 70, rating: 4.5, link: '/shop-details' },
    { id: 2, title: 'Bengal Meat Bone', img: 'assets/img/grocery_product_img_2.jpg', price: 13, oldPrice: 15, rating: 4.5, link: '/shop-details' },
    { id: 3, title: 'Three Carrot', img: 'assets/img/grocery_product_img_2.jpg', price: 17, oldPrice: 20, save: 40, rating: 4.5, link: '/shop-details' },
    { id: 4, title: 'Lemon Meat Bone', img: 'assets/img/grocery_product_img_1.jpg', price: 29, oldPrice: 32, save: 50, rating: 4.5, link: '/shop-details' },
    { id: 5, title: 'Orange Slice Mix', img: 'assets/img/grocery_product_img_6.jpg', price: 20, oldPrice: 22, rating: 4.5, link: '/shop-details' },
    { id: 6, title: 'Carrot Vegetables', img: 'assets/img/grocery_product_img_6.jpg', price: 16, oldPrice: 18, save: 30, rating: 4.5, link: '/shop-details' },
    { id: 7, title: 'Butter Garlic Crab', img: 'assets/img/grocery_product_img_1.jpg', price: 10, oldPrice: 12, save: 70, rating: 4.5, link: '/shop-details' },
    { id: 8, title: 'Bengal Meat Bone', img: 'assets/img/grocery_product_img_2.jpg', price: 13, oldPrice: 15, rating: 4.5, link: '/shop-details' },
  ];

  farmingBg = 'assets/img/grocery_farming_bg.jpg';

  farming = {
    title: 'New Tech Farming',
    heading: 'Watch Our Farming And Cultivations',
    desc:
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which slightly believable.',
    btnText: 'Read More',
    link: '/shop-details',
    videoUrl: 'https://youtu.be/nqye02H_H6I?si=Yq79QYJhfIT_wkC_',
  };

  farmingImages = [
    { img: 'assets/img/grocery_farming_img_1.jpg' },
    { img: 'assets/img/grocery_farming_img_2.jpg' },
    { img: 'assets/img/grocery_farming_img_3.jpg' },
    { img: '../assets/img/grocery_farming_img_4.jpg' },
  ];

  downloadSection = {
    title: 'Download This App',
    heading: 'Simple Way To Order Your Food Faster',
    desc:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout The point.',
    image: 'assets/img/grocery_download_img.png',
    appleLink: '#',
    playLink: '#',
  };

  blogs = [
    {
      id: 1,
      img: 'assets/img/grocery_blog_img_1.jpg',
      author: 'Admin',
      date: '12 Jan 2025',
      title: 'Freshly Served Exploring The World Of Fresh',
      excerpt: 'It is a long established fact that a reader will be distract ed by the readable content...',
      comments: 15,
      link: '/blogs-details',
    },
    {
      id: 2,
      img: 'assets/img/grocery_blog_img_2.jpg',
      author: 'Admin',
      date: '12 Jan 2025',
      title: 'The Fresh Connection Exploring The Link Between',
      excerpt: 'It is a long established fact that a reader will be distract ed by the readable content...',
      comments: 42,
      link: '/blogs-details',
    },
    {
      id: 3,
      img: 'assets/img/grocery_blog_img_3.jpg',
      author: 'Admin',
      date: '12 Jan 2025',
      title: 'Common Engine Oil Problems And Solutions',
      excerpt: 'It is a long established fact that a reader will be distract ed by the readable content...',
      comments: 36,
      link: '/blogs-details',
    },
    {
      id: 4,
      img: 'assets/img/grocery_blog_img_1.jpg',
      author: 'Admin',
      date: '14 Jan 2025',
      title: 'How To Keep Vegetables Fresh Longer',
      excerpt: 'It is a long established fact that a reader will be distract ed by the readable content...',
      comments: 18,
      link: '/blogs-details',
    },
    {
      id: 5,
      img: 'assets/img/grocery_blog_img_2.jpg',
      author: 'Admin',
      date: '15 Jan 2025',
      title: 'Organic Farming Tips For Beginners',
      excerpt: 'It is a long established fact that a reader will be distract ed by the readable content...',
      comments: 21,
      link: '/blogs-details',
    },
    {
      id: 6,
      img: 'assets/img/grocery_blog_img_3.jpg',
      author: 'Admin',
      date: '16 Jan 2025',
      title: 'Seasonal Fruits You Should Try',
      excerpt: 'It is a long established fact that a reader will be distract ed by the readable content...',
      comments: 9,
      link: '/blogs-details',
    },
    {
      id: 7,
      img: 'assets/img/grocery_blog_img_1.jpg',
      author: 'Admin',
      date: '18 Jan 2025',
      title: 'Healthy Recipes With Fresh Greens',
      excerpt: 'It is a long established fact that a reader will be distract ed by the readable content...',
      comments: 14,
      link: '/blogs-details',
    },
    {
      id: 8,
      img: 'assets/img/grocery_blog_img_2.jpg',
      author: 'Admin',
      date: '20 Jan 2025',
      title: 'Benefits Of Buying From Local Farms',
      excerpt: 'It is a long established fact that a reader will be distract ed by the readable content...',
      comments: 33,
      link: '/blogs-details',
    },
    {
      id: 9,
      img: 'assets/img/grocery_blog_img_3.jpg',
      author: 'Admin',
      date: '22 Jan 2025',
      title: 'Top 10 Foods For A Strong Immunity',
      excerpt: 'It is a long established fact that a reader will be distract ed by the readable content...',
      comments: 27,
      link: '/blogs-details',
    },
  ];

  testimonials = [
    { id: 1, rating: 5.0, text: 'lorem1 hiudwcudw dslihc lidhcoiece kidcvew lksdnlicew ldnhcden dlknvc dlncldbvclbdevc dlncidnbvcdn dlnclidoivodevdv;n ;ld nvphfd pivfd vfdnvd;jvpodv ', name: 'Bartholomew', role: 'Customer', img: 'assets/img/testimonial_img_1.jpg' },
    { id: 2, rating: 4.5, text: 'lorem1 hiudwcudw dslihc lidhcoiece kidcvew lksdnlicew ldnhcden dlknvc dlncldbvclbdevc dlncidnbvcdn dlnclidoivodevdv;n ;ld nvphfd pivfd vfdnvd;jvpodv', name: 'Nigel Nigel', role: 'Customer', img: 'assets/img/testimonial_img_2.jpg' },
    { id: 3, rating: 3.5, text: 'lorem1 hiudwcudw dslihc lidhcoiece kidcvew lksdnlicew ldnhcden dlknvc dlncldbvclbdevc dlncidnbvcdn dlnclidoivodevdv;n ;ld nvphfd pivfd vfdnvd;jvpodv', name: 'Robert Deni', role: 'Customer', img: 'assets/img/testimonial_img_1.jpg' },
    { id: 4, rating: 4.8, text: 'lorem1 hiudwcudw dslihc lidhcoiece kidcvew lksdnlicew ldnhcden dlknvc dlncldbvclbdevc dlncidnbvcdn dlnclidoivodevdv;n ;ld nvphfd pivfd vfdnvd;jvpodv', name: 'Mona', role: 'Customer', img: 'assets/img/testimonial_img_2.jpg' },
    { id: 5, rating: 4.2, text: 'lorem1 hiudwcudw dslihc lidhcoiece kidcvew lksdnlicew ldnhcden dlknvc dlncldbvclbdevc dlncidnbvcdn dlnclidoivodevdv;n ;ld nvphfd pivfd vfdnvd;jvpodv', name: 'Ahmed', role: 'Customer', img: 'assets/img/testimonial_img_1.jpg' },
    { id: 6, rating: 4.0, text: 'lorem1 hiudwcudw dslihc lidhcoiece kidcvew lksdnlicew ldnhcden dlknvc dlncldbvclbdevc dlncidnbvcdn dlnclidoivodevdv;n ;ld nvphfd pivfd vfdnvd;jvpodv', name: 'Sara', role: 'Customer', img: 'assets/img/testimonial_img_2.jpg' },
    { id: 7, rating: 5.0, text: 'lorem1 hiudwcudw dslihc lidhcoiece kidcvew lksdnlicew ldnhcden dlknvc dlncldbvclbdevc dlncidnbvcdn dlnclidoivodevdv;n ;ld nvphfd pivfd vfdnvd;jvpodv', name: 'Youssef', role: 'Customer', img: 'assets/img/testimonial_img_1.jpg' },
    { id: 8, rating: 4.6, text: 'lorem1 hiudwcudw dslihc lidhcoiece kidcvew lksdnlicew ldnhcden dlknvc dlncldbvclbdevc dlncidnbvcdn dlnclidoivodevdv;n ;ld nvphfd pivfd vfdnvd;jvpodv', name: 'Hany', role: 'Customer', img: 'assets/img/testimonial_img_2.jpg' },
    { id: 9, rating: 3.9, text: 'lorem1 hiudwcudw dslihc lidhcoiece kidcvew lksdnlicew ldnhcden dlknvc dlncldbvclbdevc dlncidnbvcdndlnclidoivodevdv;n ;ld nvphfd pivfd vfdnvd;jvpodv', name: 'Nour', role: 'Customer', img: 'assets/img/testimonial_img_1.jpg' },
  ];

  get filteredProducts(): GroceryProduct[] {
    return this.products.filter((p) => p.category === this.activeTab);
  }

  ngAfterViewInit(): void {
    this.startAutoSlide();
    this.startCountdown();
    this.calcTestiPaging();
    this.calcBlogPaging();

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.calcTestiPagingBound);
      window.addEventListener('resize', this.calcBlogPagingBound);
      this.testiTrack?.nativeElement.addEventListener('scroll', this.onTestiScroll, { passive: true });
      this.blogTrack?.nativeElement.addEventListener('scroll', this.onBlogScroll, { passive: true });
    }
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();

    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }

    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.calcTestiPagingBound);
      window.removeEventListener('resize', this.calcBlogPagingBound);
      this.testiTrack?.nativeElement.removeEventListener('scroll', this.onTestiScroll);
      this.blogTrack?.nativeElement.removeEventListener('scroll', this.onBlogScroll);
    }
  }

  openVideo(url: string): void {
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  }

  addToCart2(p: GroceryProduct): void {
    console.log('Add to cart', p);
  }

  toggleWish(p: GroceryProduct): void {
    console.log('Wish', p);
  }

  compare(p: GroceryProduct): void {
    console.log('Compare', p);
  }

  trackByProdId(_: number, item: GroceryProduct): number {
    return item.id;
  }

  trackByIndex(i: number): number {
    return i;
  }

  setActiveTab(key: GroceryCategory): void {
    this.activeTab = key;
  }

  startAutoSlide(): void {
    this.stopAutoSlide();
    this.autoSlideInterval = setInterval(() => this.catNext(true), 2500);
  }

  stopAutoSlide(): void {
    if (!this.autoSlideInterval) return;
    clearInterval(this.autoSlideInterval);
    this.autoSlideInterval = undefined;
  }

  catNext(loop = false): void {
    this.scrollCats(1, loop);
  }

  catPrev(): void {
    this.scrollCats(-1);
  }

  bestPrev(): void {
    this.scrollBestSell(-1);
  }

  bestNext(): void {
    this.scrollBestSell(1);
  }

  partnerNext(): void {
    this.scrollPartners(1);
  }

  partnerPrev(): void {
    this.scrollPartners(-1);
  }

  testiNext(): void {
    const last = this.pagesArray.length - 1;
    this.testiPage = this.testiPage >= last ? 0 : this.testiPage + 1;
    this.goToTestiPage(this.testiPage);
  }

  testiPrev(): void {
    const last = this.pagesArray.length - 1;
    this.testiPage = this.testiPage <= 0 ? last : this.testiPage - 1;
    this.goToTestiPage(this.testiPage);
  }

  goToTestiPage(page: number, smooth = true): void {
    this.testiPage = page;

    const el = this.testiTrack?.nativeElement;
    if (!el) return;

    const card = el.querySelector<HTMLElement>('.testi_item');
    const cardWidth = card?.offsetWidth ?? 360;
    const firstIndex = page * this.testiPerPage;
    const left = (cardWidth + this.testiGap) * firstIndex;
    const scrollTarget = el as HTMLDivElement & {
      scrollTo?: (options: ScrollToOptions) => void;
    };

    if (typeof scrollTarget.scrollTo === 'function') {
      scrollTarget.scrollTo({ left, behavior: smooth ? 'smooth' : 'auto' });
      return;
    }

    scrollTarget.scrollLeft = left;
  }

  private calcTestiPaging(): void {
    const el = this.testiTrack?.nativeElement;
    if (!el) return;

    const card = el.querySelector<HTMLElement>('.testi_item');
    const cardWidth = card?.offsetWidth ?? 360;
    const fit = Math.max(1, Math.floor(el.clientWidth / (cardWidth + this.testiGap)));
    const perPage = Math.min(this.maxPerPage, fit);

    this.testiPerPage = perPage;
    const totalPages = Math.ceil(this.testimonials.length / perPage);
    this.pagesArray = Array.from({ length: totalPages }, (_, i) => i);

    if (this.testiPage > totalPages - 1) this.testiPage = totalPages - 1;
    if (this.testiPage < 0) this.testiPage = 0;

    this.goToTestiPage(this.testiPage, false);
  }

  private onTestiScroll = () => {
    if (this.rafLock || typeof requestAnimationFrame !== 'function') return;
    this.rafLock = true;

    requestAnimationFrame(() => {
      const el = this.testiTrack?.nativeElement;
      if (!el) {
        this.rafLock = false;
        return;
      }

      const card = el.querySelector<HTMLElement>('.testi_item');
      const cardWidth = card?.offsetWidth ?? 360;
      const index = Math.round(el.scrollLeft / (cardWidth + this.testiGap));
      const page = Math.floor(index / this.testiPerPage);

      if (page !== this.testiPage) this.testiPage = page;
      this.rafLock = false;
    });
  };

  blogNext(): void {
    const last = this.blogPages.length - 1;
    this.blogPage = this.blogPage >= last ? 0 : this.blogPage + 1;
    this.goToBlogPage(this.blogPage);
  }

  blogPrev(): void {
    const last = this.blogPages.length - 1;
    this.blogPage = this.blogPage <= 0 ? last : this.blogPage - 1;
    this.goToBlogPage(this.blogPage);
  }

  goToBlogPage(page: number, smooth = true): void {
    this.blogPage = page;

    const el = this.blogTrack?.nativeElement;
    if (!el) return;

    const card = el.querySelector<HTMLElement>('.blog_item_wrap');
    const cardWidth = card?.offsetWidth ?? 360;
    const firstIndex = page * this.blogPerPage;
    const left = (cardWidth + this.blogGap) * firstIndex;
    const scrollTarget = el as HTMLDivElement & {
      scrollTo?: (options: ScrollToOptions) => void;
    };

    if (typeof scrollTarget.scrollTo === 'function') {
      scrollTarget.scrollTo({ left, behavior: smooth ? 'smooth' : 'auto' });
      return;
    }

    scrollTarget.scrollLeft = left;
  }

  private calcBlogPaging(): void {
    const el = this.blogTrack?.nativeElement;
    if (!el) return;

    const card = el.querySelector<HTMLElement>('.blog_item_wrap');
    const cardWidth = card?.offsetWidth ?? 360;
    const fit = Math.max(1, Math.floor(el.clientWidth / (cardWidth + this.blogGap)));
    const perPage = Math.min(this.blogMaxPerPage, fit);

    this.blogPerPage = perPage;
    const totalPages = Math.ceil(this.blogs.length / perPage);
    this.blogPages = Array.from({ length: totalPages }, (_, i) => i);

    if (this.blogPage > totalPages - 1) this.blogPage = totalPages - 1;
    if (this.blogPage < 0) this.blogPage = 0;

    this.goToBlogPage(this.blogPage, false);
  }

  private onBlogScroll = () => {
    if (this.blogRafLock || typeof requestAnimationFrame !== 'function') return;
    this.blogRafLock = true;

    requestAnimationFrame(() => {
      const el = this.blogTrack?.nativeElement;
      if (!el) {
        this.blogRafLock = false;
        return;
      }

      const card = el.querySelector<HTMLElement>('.blog_item_wrap');
      const cardWidth = card?.offsetWidth ?? 360;
      const index = Math.round(el.scrollLeft / (cardWidth + this.blogGap));
      const page = Math.floor(index / this.blogPerPage);

      if (page !== this.blogPage) this.blogPage = page;
      this.blogRafLock = false;
    });
  };

  private scrollPartners(count: number): void {
    const el = this.partnersTrack?.nativeElement;
    if (!el) return;

    const card = el.querySelector<HTMLElement>('.partner_item');
    const cardWidth = card?.offsetWidth ?? 180;
    const gap = 20;

    el.scrollBy({
      left: (cardWidth + gap) * count,
      behavior: 'smooth',
    });
  }

  private scrollBestSell(count: number): void {
    const el = this.bestSellTrack?.nativeElement;
    if (!el) return;

    const card = el.querySelector<HTMLElement>('.best_card_item');
    const cardWidth = card?.offsetWidth ?? 260;
    const gap = 18;
    el.scrollBy({ left: (cardWidth + gap) * count, behavior: 'smooth' });
  }

  private startCountdown(): void {
    this.updateCountdown();
    this.countdownTimer = setInterval(() => this.updateCountdown(), 1000);
  }

  private updateCountdown(): void {
    const now = Date.now();
    const end = this.dealEndsAt.getTime();
    const diff = Math.max(0, end - now);

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    this.countdown = { days, hours, minutes, seconds };
  }

  private scrollCats(count: number, loop = false): void {
    const el = this.catTrack.nativeElement;
    const card = el.querySelector<HTMLElement>('.category_item');
    const cardWidth = card?.offsetWidth ?? 160;
    const gap = 18;

    el.scrollBy({
      left: (cardWidth + gap) * count,
      behavior: 'smooth',
    });

    if (loop && el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
      setTimeout(() => {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      }, 500);
    }
  }
}

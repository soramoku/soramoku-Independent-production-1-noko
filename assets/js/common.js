// overlay-script.js
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-overlay');
    const nav = document.querySelector('.nav-overlay');

        // ハンバーガーをクリックしたら開閉
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');

            const isOpen = hamburger.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isOpen);
            nav.setAttribute('aria-hidden', !isOpen);
            

        // メニュー内のリンククリックで閉じる処理
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                hamburger.setAttribute('aria-expanded', false);
                nav.setAttribute('aria-hidden', true);
                document.body.style.overflow = ''; // 背景スクロール復活
            });
        });

        // メニューオープン時に背景スクロールを防止
        document.body.style.overflow = isOpen ? 'hidden' : '';
        });

    // メニュー内のリンクをクリックしたら閉じる
    document.querySelectorAll('.nav-overlay__list li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            hamburger.setAttribute('aria-expanded', false);
            nav.setAttribute('aria-hidden', true);
            document.body.style.overflow = '';
        });
    });


    // ESCキーでメニューを閉じる
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            hamburger.setAttribute('aria-expanded', false);
            nav.setAttribute('aria-hidden', true);
            document.body.style.overflow = '';
        }
    });
});





// PC用ナビゲーションのスムーススクロール
const pcNavLinks = document.querySelectorAll('.gnav-pc a[href^="#"]');
    pcNavLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ウィンドウリサイズ時の処理
    window.addEventListener('resize', function() {
        if (window.innerWidth > 820) {
            // PCサイズになったらスマホメニューを閉じる
            if (menuButton && spMenu && menuOverlay) {
                menuButton.classList.remove('active');
                spMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // ===========================================
    // 背景画像スライドショー
    // ===========================================
const slides = document.querySelectorAll('.bg-slide');
const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length > 0 && indicators.length > 0) {
        let currentSlide = 0;

        // 次のスライドに移動
        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            indicators[currentSlide].classList.remove('active');
            
            currentSlide = (currentSlide + 1) % slides.length;
            
            slides[currentSlide].classList.add('active');
            indicators[currentSlide].classList.add('active');
        }

        // 自動スライドショー（8秒間隔でより穏やか）
        setInterval(nextSlide, 8000);

        // インジケータークリックで手動切り替え
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                slides[currentSlide].classList.remove('active');
                indicators[currentSlide].classList.remove('active');
                
                currentSlide = index;
                
                slides[currentSlide].classList.add('active');
                indicators[currentSlide].classList.add('active');
            });
        });
    }

    

    // ===========================================
    // スライドイン アニメーション
    // ===========================================
const slideInElements = document.querySelectorAll('.slide-in');
    
    if (slideInElements.length > 0) {
        const observer = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
        rootMargin: '0px',
        threshold: 0.2
        });

        slideInElements.forEach(element => {
            observer.observe(element);
        });
    }

// ===========================================
// メニューモーダル
// ===========================================
const menuData = {
    coffee: {
        title: "柑橘香るブレンド",
        description: "季節に合わせた柑橘ピールと浅煎り豆のブレンド。朝の静けさに、やわらかく目覚める一杯。上質なアラビカ種を使用し、シトラスの爽やかな香りが特徴です。",
        image: "assets/images/menu-image1.jpg",
        price: "¥550"
    },
    gin: {
        title: "ハーブ香るクラフトジン",
        description: "ボタニカルな香りに包まれて。ジン初心者にも飲みやすい、やさしい味わい。厳選されたハーブとスパイスが織りなす複雑で上品な風味をお楽しみください。",
        image: "assets/images/menu-image2.jpg",
        price: "¥680"
    },
    cheesecake: {
        title: "ナッツと黒胡椒のチーズケーキ",
        description: "コーヒーにもジンにも合う、大人のための甘やかさ。香りのペアリングを楽しむ一皿。クリームチーズの濃厚さに、ナッツの香ばしさと黒胡椒のアクセントが絶妙にマッチします。",
        image: "assets/images/menu-image3.jpg",
        price: "¥880"
    }
};

    const modal = document.getElementById('menuModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalPrice = document.getElementById('modalPrice');
    const closeBtn = document.querySelector('.modal-close');
    const menuCards = document.querySelectorAll('.menu-card');

if (modal && menuCards.length > 0) {
    // メニューカードクリック時の処理
    menuCards.forEach(card => {
        card.addEventListener('click', () => {
            const menuType = card.getAttribute('data-menu');
            const menuInfo = menuData[menuType];
            
            if (menuInfo) {
                modalImage.src = menuInfo.image;
                modalImage.alt = menuInfo.title;
                modalTitle.textContent = menuInfo.title;
                modalDescription.textContent = menuInfo.description;
                modalPrice.textContent = menuInfo.price;
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // モーダルを閉じる処理
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // カードのアニメーション効果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    menuCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });
}


// ===========================================
// jQueryが読み込まれた後に実行
// ===========================================
$(document).ready(function() {
    // Slickスライダー
    if ($('.single-item').length > 0) {
        $('.single-item').slick({
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            dots: true
        });
    }
});

// ===========================================
// ScrollReveal（ライブラリが読み込まれた後に実行）
// ===========================================
// ふわっと表示
if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal().reveal('#concept .fadein', {
        duration: 700,
        viewFactor: 0.5,
        reset: false,
        distance: '10px',
        scale: 1,
        delay: 50,
        interval: 100,
        opacity: 0,
        origin: 'bottom',
        mobile: true
    });

    ScrollReveal().reveal('#cta-main .fadein', {
        duration: 700,
        viewFactor: 1,
        reset: false,
        distance: '10px',
        scale: 1,
        delay: 50,
        interval: 100,
        opacity: 0,
        origin: 'bottom',
        mobile: true
    });

    ScrollReveal().reveal('.menu-item', {
        duration: 1000,
        interval: 200,
        distance: '50px',
        origin: 'bottom'
    });
}
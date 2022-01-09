// "use strict";

// document.addEventListener('DOMContentLoaded', () => {
//     const tabsParent = document.querySelector('.tabheader__items');
//     const tabsChildren = document.querySelectorAll('.tabheader__item');
//     const tabsContent = document.querySelectorAll('.tabcontent');

//     function hideTabContent() {
//         tabsContent.forEach( (tab) => {
//             tab.style.display = 'none';
//         });
//         tabsChildren.forEach(tab => {
//             tab.classList.remove('tabheader__item_active');
//         });
//     }

//     function showTabContent(i = 0) {
//         tabsContent[i].style.display = 'block';
//         tabsChildren[i].classList.add('tabheader__item_active');
//     }

//     tabsParent.addEventListener('click', (e) => {
//         if(e.target && e.target.classList.contains('tabheader__item')) {
//             tabsChildren.forEach((tab, i) => {
//                 if(tab == e.target) {
//                     hideTabContent();
//                     showTabContent(i); 
//                 }
//             });
//         }
//     });

//     hideTabContent();
//     showTabContent();
// });


document.addEventListener('DOMContentLoaded', () => {
    /* ================Tabs================ */
    const tabsParent = document.querySelector('.tabheader__items');
    const tabsChild = document.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');

    function hideTabContent() {
        tabsContent.forEach(tab => {
            tab.classList.remove('show', 'fade');
            tab.classList.add('hide');
        });
        tabsChild.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');
        tabsChild[i].classList.add('tabheader__item_active');
    }

    tabsParent.addEventListener('click', e => {
        if (e.target && e.target.classList.contains('tabheader__item')) {
            tabsChild.forEach((item, i) => {
                if (item == e.target) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    hideTabContent();
    showTabContent();
    /* ============================================= */

    /* ===============Timer================ */

    const deadLine = '2022-01-14';
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date());
        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const seconds = Math.floor((t / 1000) % 60);

        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };

    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');
        const timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }

    }
    setClock('.timer', deadLine);
    /* =========================================== */
    /* ===================Modal===================== */
    const modalOpen = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');
    const modalClose = document.querySelectorAll('[data-close]');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimeOut);
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalOpen.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    modalClose.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimeOut = setTimeout(openModal, 30000);
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);


    /* ============================================= */

    /* используем классы============================= */
    class MenuItem {
        constructor(title, alt, src, description, price, parentSelector) {
            this.title = title;
            this.alt = alt;
            this.src = src;
            this.description = description;
            this.price = price;
            this.transfer = 27.4;
            this.parent = document.querySelector('.menu .container');
        }

        changeToUAH() {
            return this.price = Math.round(this.transfer * this.price);
        }

        render() {
            const cardMenu = document.createElement('div');
            cardMenu.innerHTML = 
            `<div class="menu__item">
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">Меню ${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.changeToUAH()}</span> грн/день</div>
                </div>
            </div>`;
            this.parent.append(cardMenu);
        }
    }

    

    new MenuItem(
        '"Фитнес"',
        'vegy',
        "img/tabs/vegy.jpg",
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        19,
        '.menu .container'
    ).render();

    new MenuItem(
        '“Премиум”',
        "elite",
        "img/tabs/elite.jpg",
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        20,
        '.menu .container'
    ).render();

    new MenuItem(
        '"Постное"',
        "post",
        "img/tabs/post.jpg",
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
        18,
        '.menu .container'
    ).render();
    /* ============================================== */
});




























































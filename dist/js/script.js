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

    const deadLine = '2022-03-14';
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
    // const modalClose = document.querySelectorAll('[data-close]');

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

    /*  modalClose.forEach(btn => {
         btn.addEventListener('click', closeModal);
     }); */

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimeOut = setTimeout(openModal, 50000);
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
        constructor(title, alt, src, description, price, parentSelector, ...classes) {
            this.title = title;
            this.alt = alt;
            this.src = src;
            this.description = description;
            this.price = price;
            this.transfer = 27.4;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
        }

        changeToUAH() {
            return this.price = Math.round(this.transfer * this.price);
        }

        render() {
            const cardMenu = document.createElement('div');
            if (this.classes.length === 0) {
                this.cardMenu = 'menu__item';
                cardMenu.classList.add(this.cardMenu);
            } else {
                this.classes.forEach(classname => cardMenu.classList.add(classname));
            }

            cardMenu.innerHTML =
                ` <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.changeToUAH()}</span> грн/день</div>
                </div> 
            `;
            this.parent.append(cardMenu);
        }
    }


    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    // получение данных карточек из db.json. 1 вариант с использование класса
    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({ title, altimg, img, descr, price }) => {
                new MenuItem(title, altimg, img, descr, price, '.menu .container').render();
            });
        });



    // получение данных карточек из db.json. 2 вариант(без использования класа,формируем карточки "на лету")
    /* getResource('http://localhost:3000/menu')
        .then(data => createCard(data));

    function createCard(data) {
        data.forEach(({ title, altimg, img, descr, price }) => {
            const card = document.createElement('div');
            card.classList.add('menu__item');
            card.innerHTML = `
                    <img src=${img} alt=${altimg}>
                    <h3 class="menu__item-subtitle">${title}</h3>
                    <div class="menu__item-descr">${descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${price}</span> грн/день</div>
                    </div> 
                    `;

            document.querySelector('.menu .container').append(card);
        });
    } */


    /*     new MenuItem(
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
            '.menu .container',
            'menu__item'
        ).render();
    
        new MenuItem(
            '"Постное"',
            "post",
            "img/tabs/post.jpg",
            'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
            18,
            '.menu .container',
            'menu__item'
        ).render(); */
    /* ============================================== */


    /* =========================Forms===================== */
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/spinner/054_spinner.svg',
        success: 'успех',
        failure: 'о нет,что-то пошло не так',
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    // реализация отправки данных на сервер через функцию.
    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: data,
        });

        return await res.json();
    };


    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            // реализация отправки запроса на сервер чeрез fetch API(json-формат)
            const formData = new FormData(form);
            // 1 вариант реализации преобразования данных формы FormData в формат JSON
            /* const object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            }); */

            // 2 вариант реализации преобразования данных формы FormData в формат JSON(более новый способ)
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });

            // отправа данных из формы на сервер,без функции
            /*  fetch('server.php', {
                 method: 'POST',
                 headers: {
                     'content-type': 'application/json'
                 },
                 body: JSON.stringify(object),
             })
                 .then(data => data.text())
                 .then(data => {
                     console.log(data);
                     showThanksModal(message.success);
                     statusMessage.remove();
                 }).catch(() => {
                     showThanksModal(message.failure);
                 }).finally(() => {
                     form.reset();
                 }); */

            /* // реализация отправки запроса на сервер чeрез ajax (json-формат)
                        const request = new XMLHttpRequest();
                        request.open('POST', 'server.php');
                        request.setRequestHeader('Content-type', 'application/json');
                        const formData = new FormData(form);
                        const object = {};
                        formData.forEach(function (value, key) {
                            object[key] = value;
                        });
                        const json = JSON.stringify(object);
                        request.send(json);
            
                        request.addEventListener('load', () => {
                            if (request.status === 200) {
                                showThanksModal(message.success);
                                form.reset();
                                statusMessage.remove();
            
                                console.log(request.response);
                            } else {
                                showThanksModal(message.failure);
                                form.reset();
                                statusMessage.remove();
                            }
                        }); */
        });
    }


    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
            prevModalDialog.classList.add('show');
            closeModal();
        }, 2000);
    }

    /* -============================================== */



    // =========================slider==============================

    const sliderItems = document.querySelectorAll('.offer__slide');
    const sliderPrev = document.querySelector('.offer__slider-prev');
    const sliderNext = document.querySelector('.offer__slider-next');
    const total = document.querySelector('#total');
    const current = document.querySelector('#current');
    const slidesWrapper = document.querySelector('.offer__slider-wrapper');
    const slidesField = document.querySelector('.offer__slider-inner');
    const width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1; //установили индекс на единицу для удобства,отсчет текущего слайда будет начинатся с единицы,а не нуля.Это точка отсчета
    let offset = 0; //точка отсчета,необходимая для расчета растояния в пикселях,на сколько нужно смещать изображение влево или вправо,что-бы оно отображалось в окошке слайдера которое мы видим

    // 2 вариант(сложный слайдер)
    // .Добавляем ноль,если кол-во. слайдов ниже 10.Для общего кол-ва слайдов и номреа по порядку текущего слайда 
    if (sliderItems.length < 10) {
        total.textContent = `0${sliderItems.length}`;
        current.textContent = `0${slideIndex}`;
    }
    else {
        total.textContent = `${sliderItems.length}`;
        current.textContent = `${slideIndex}`;
    }

    // устанавл. инлайн стили что-бы все слайди изображения были одинаковой ширины,анимацию,скрываем все изобр вне контейнера.Первоначально ширина в 650px установлена для контейнера (.offer__slider).slidesField займет длинну в 400% от 650px,по числу слайдов
    slidesField.style.width = 100 * sliderItems.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    sliderItems.forEach(slide => {
        slide.style.width = width;
    });

    sliderNext.addEventListener('click', () => {
        // если offset равна ширине умноженной на кол-во слайдов -1 то установ offset на ноль.При достижении последнего слайда карусель слайдов переместится на первый слайд
        if (offset == parseInt(width) * (sliderItems.length - 1)) {
            offset = 0;
        } else {
            offset += parseInt(width);
        }

        // задаем смещение карусели слайдов по оси х влево
        slidesField.style.transform = `translateX(-${offset}px`;

        // как только индекс дойдет до последнего слайда он перейдет на первый слайд.по кругу
        if (slideIndex == sliderItems.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        // меняем текущее значение счетчика индекса при перелистывании слайдов вперед
        if (sliderItems.length < 10) {
            current.textContent = `0${slideIndex}`;
        }
        else {
            current.textContent = `${slideIndex}`;
        }
    });

    sliderPrev.addEventListener('click', () => {
        if (offset == 0) {
            offset = parseInt(width) * (sliderItems.length - 1);
        } else {
            offset -= parseInt(width);
        }

        // задаем смещение карусели слайдов по оси х вправо
        slidesField.style.transform = `translateX(-${offset}px`;

        // как только индекс дойдет до первого слайда он перейдет на последний слайд.по кругу
        if (slideIndex == 1) {
            slideIndex = sliderItems.length;
        } else {
            slideIndex--;
        }

        // меняем текущее значение счетчика индекса при перелистывании слайдов назад
        if (sliderItems.length < 10) {
            current.textContent = `0${slideIndex}`;
        }
        else {
            current.textContent = `${slideIndex}`;
        }
    });


    // 1 вариант(простой слайдер)
    /*     showSlides(slideIndex);
    
        if (sliderItems.length < 10) {
            total.textContent = `0${sliderItems.length}`;
        }
        else {
            total.textContent = `${sliderItems.length}`;
        }
    
        function showSlides(n) {
    
            if (n > sliderItems.length) {
                slideIndex = 1;
            }
            if (n < 1) {
                slideIndex = sliderItems.length;
            }
    
            sliderItems.forEach(slide => {
                slide.classList.add('hide');
    
            });
    
            sliderItems[slideIndex - 1].classList.remove('hide');
            sliderItems[slideIndex - 1].classList.add('flip-vertical-right');
            sliderItems[slideIndex - 1].classList.add('show');
    
            if (sliderItems.length < 10) {
                current.textContent = `0${slideIndex}`;
            }
            else {
                current.textContent = `${slideIndex}`;
            }
        }
        //плюсуем индексы слайдов,при клике на след. слайд передаем 1 пример(1+1=2),приклике на предидущий слайд передаем -1 пример(2+-1=1)
        function plusSlides(n) {
            showSlides(slideIndex += n);
        }
    
        sliderNext.addEventListener('click', () => {
            plusSlides(1);
        });
    
        sliderPrev.addEventListener('click', () => {
            plusSlides(-1);
        }); */


    


    // =============================================================

});




























































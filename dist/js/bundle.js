/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./dist/js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dist/js/modules/calculator.js":
/*!***************************************!*\
  !*** ./dist/js/modules/calculator.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function calculator() {
      // калькулятор=================================================

      const rezult = document.querySelector('.calculating__result span');
      let sex;
      let height;
      let weight;
      let age;
      let ratio;
  
      // если в local storage есть запись с ключем sex,то получаем его значение и присваиваем переменной sex,если нет присваиваем значение по умолчанию female и делаем запись в local storage.То же делаем и для переменной ratio.
      if (localStorage.getItem('sex')) {
          sex = localStorage.getItem('sex');
      } else {
          sex = 'female';
          localStorage.setItem('sex', 'female');
      }
  
      if (localStorage.getItem('ratio')) {
          ratio = localStorage.getItem('ratio');
      } else {
          ratio = 1.375;
          localStorage.setItem('ratio', 1.375);
      }
  
      // доб.класс активности для блока(женщина-мужчина) и для блока(физическая активность).Два вызова этой функции с разными аргументами для каждого блока.Получаем  список всех элементов в блоке,для каждого элемента удаляем класс активности если он есть,потом если у отдельного элемента блока совпадает значение атрибута со значением записи в local storage то этому элементу присвоим  класс активности(если значение id-тэга равно male и значение ключа sex равно male,то присвоить этому элементу класс активности).Тоже условие и для блока физическая активность
      function initLocalSettings(selector, activeClass) {
          const elements = document.querySelectorAll(selector);
          elements.forEach(item => {
              item.classList.remove(activeClass);
  
              if (item.getAttribute('id') === localStorage.getItem('sex')) {
                  item.classList.add(activeClass);
              }
              if (item.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                  item.classList.add(activeClass);
              }
          });
      }
  
      initLocalSettings('#gender div', 'calculating__choose-item_active');
      initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
  
      //подсчет калорий и проверка условий(если не введено хоть одно значение-результата не будет)результат вычислений не сохраняем в переменную,а сразу выводим в span
      function calcTotal() {
          if (!sex || !height || !weight || !age || !ratio) {
              rezult.textContent = '______';
              return;
          }
          if (sex === 'female') {
              rezult.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
          } else {
              rezult.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
          }
      }
      
      calcTotal();
  
      // собираем данные с блока (женщина-мужчина(здесь нужно получить значение id)) и блока(физическая активность(здесь нужно получить значение data-ratio)).Два вызова этой функции с разными аргументами для каждого блока.Получаем коллекцию элементов,на каждый элемент навешиваем обработчик событий с условием если клик произошел на обьекте события укоторого есть атрибут data-ratio то переменной ratio присваиваем значение этого атрибута и записываем новые данные в local storage,в ином случае обращаемся к id,его значению и записываем  в хранилище
      function getStaticInfo(selector, activeClass) {
          const elements = document.querySelectorAll(selector);
  
          elements.forEach(item => {
              item.addEventListener('click', (e) => {
                  if (e.target.getAttribute('data-ratio')) {
                      ratio = +e.target.getAttribute('data-ratio');
                      localStorage.setItem('ratio', ratio);
                  } else {
                      sex = e.target.getAttribute('id');
                      localStorage.setItem('sex', sex);
                  }
  
                  // для каждого элемента удаляем класс активности если он есть,обьекту события клика присаиваем класс активности,вызываем calcTotal(); чтобы после каждого изменения данных автоматически пересчитывалась формула
                  elements.forEach(item => {
                      item.classList.remove(activeClass);
                  });
                  e.target.classList.add(activeClass);
  
                  calcTotal();
              });
          });
      }
  
      getStaticInfo('#gender div', 'calculating__choose-item_active');
      getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');
  
      // получение данных с блока (конституция(здесь-inputы,а значить используем input.value))Вызовем функцию три раза по одному на каждый input.Получаем элемент,навешиваем обработчик событий для input,при условии если введены не цифры-меняем цвет границы на красный,если нет-удаляем границу.
      function getDynamicInfo(selector) {
          const input = document.querySelector(selector);
  
          input.addEventListener('input', () => {
              if (input.value.match(/\D/g)) {
                  input.style.border = '2px solid red';
              } else {
                  input.style.border = 'none';
              }
  
              // если у input в который мы ввели данные значение атрибута  тэга id равно height,то переменной height присв. значение введеное  вэтот input.Также и для остальных
              switch (input.getAttribute('id')) {
                  case 'height':
                      height = +input.value;
                      break;
                  case 'weight':
                      weight = +input.value;
                      break;
                  case 'age':
                      age = +input.value;
                      break;
              }
  
              // вызываем calcTotal(); чтобы после каждого изменения данных автоматически пересчитывалась формула
              calcTotal();
          });
      }
  
      getDynamicInfo('#height');
      getDynamicInfo('#weight');
      getDynamicInfo('#age');
  
      // ============================================================
}

/* harmony default export */ __webpack_exports__["default"] = (calculator);

/***/ }),

/***/ "./dist/js/modules/cards.js":
/*!**********************************!*\
  !*** ./dist/js/modules/cards.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./dist/js/services/services.js");


function cards() {
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

    // получение данных карточек из db.json. 1 вариант с использование класса
    Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getResource"])('http://localhost:3000/menu')
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

    /* ============================================== */
}

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./dist/js/modules/forms.js":
/*!**********************************!*\
  !*** ./dist/js/modules/forms.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./dist/js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./dist/js/services/services.js");



function forms(formSelector, modalTimeOut) {
        /* =========================Forms===================== */
        const forms = document.querySelectorAll(formSelector);

        const message = {
            loading: 'img/spinner/054_spinner.svg',
            success: 'успех',
            failure: 'о нет,что-то пошло не так',
        };
    
        forms.forEach(item => {
            bindPostData(item);
        });
    
        
    
    
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
    
                Object(_services_services__WEBPACK_IMPORTED_MODULE_1__["postData"])('http://localhost:3000/requests', json)
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
            Object(_modal__WEBPACK_IMPORTED_MODULE_0__["openModal"])('.modal', modalTimeOut);
    
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
                Object(_modal__WEBPACK_IMPORTED_MODULE_0__["closeModal"])('.modal');
            }, 2000);
        }
    
        /* -============================================== */
}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./dist/js/modules/modal.js":
/*!**********************************!*\
  !*** ./dist/js/modules/modal.js ***!
  \**********************************/
/*! exports provided: default, closeModal, openModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeModal", function() { return closeModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openModal", function() { return openModal; });
function openModal(modalSelector, modalTimeOut) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if(modalTimeOut) {
        clearInterval(modalTimeOut);
    }
    
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimeOut) {
       /* ===================Modal===================== */
       //для независимой работы модулей жестко закрепленые части(кнопки на странице,формы и тд.) переводим в аргументы функции,а эти селекторы передаем в виде аргументов при вызове этой функции в файле script.js 
       const modalOpen = document.querySelectorAll(triggerSelector);
       const modal = document.querySelector(modalSelector);
       
   
      
   
       modalOpen.forEach(btn => {
           //колбэк функцию openModal,нельзя сразу вызывать с ()(дужками)так как она вызовется сразу при построении страницы.Для того чтобы она вызывалась только по клику и для того чтобы мы могли передать аргумент в колбэк функцию,оборачиваем ее в стрелочную функцию
           btn.addEventListener('click', () => openModal(modalSelector, modalTimeOut));
       });
   
       
   
       modal.addEventListener('click', (e) => {
           if (e.target === modal || e.target.getAttribute('data-close') == '') {
               closeModal(modalSelector);
           }
       });
   
       document.addEventListener('keydown', (e) => {
           if (e.code === 'Escape' && modal.classList.contains('show')) {
               closeModal(modalSelector);
           }
       });
   
       

       function showModalByScroll() {
           if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
               openModal(modalSelector, modalTimeOut);
               window.removeEventListener('scroll', showModalByScroll);
           }
       }
       window.addEventListener('scroll', showModalByScroll);
   
   
       /* ============================================= */
}

/* harmony default export */ __webpack_exports__["default"] = (modal);



/***/ }),

/***/ "./dist/js/modules/slider.js":
/*!***********************************!*\
  !*** ./dist/js/modules/slider.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//в аргументах функции используем деструктуризацию обьекта,в вызывающей функции slider() в script.js в аргументы передаем обьект с селекторами,при этом их можно передавать в произвольном порядке(не втом порядке как они указаны здесь в функции)
function slider({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {
    // =========================slider==============================

    const slider = document.querySelector(container);
    const sliderItems = document.querySelectorAll(slide);
    const sliderPrev = document.querySelector(prevArrow);
    const sliderNext = document.querySelector(nextArrow);
    const total = document.querySelector(totalCounter);
    const current = document.querySelector(currentCounter);
    const slidesWrapper = document.querySelector(wrapper);
    const slidesField = document.querySelector(field);
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

    // устанавл. position relative. для родительского контейнера,чтобы абсолютно спозиционировать точки управления слайдами
    slider.style.position = 'relative';

    //создаем обертку для точек и стилизуем ее
    const indicators = document.createElement('ol');
    const dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    // создаем точки,стилизуем,вставляем в обертку indicators.Также добавлем точки  в массив dots(нужно для перебора массива точек в обработчиках событий)
    for (let i = 0; i < sliderItems.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }


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

        // Активные точки.Сперва для всех точек уст.непрозрачность 0,5,а потом к текущей точке(текущему слайду) уст. непрозрачность 1. 
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
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

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    // Доб. функциональность точкам. 
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');//получаем значение атрибута точки на которую был клик(на третей точке значение атрибута data-slide-to будет равно 3)

            slideIndex = slideTo;//меняем индекс
            offset = parseInt(width) * (slideTo - 1); //задаем смещение

            slidesField.style.transform = `translateX(-${offset}px`;//смещаем карусель

            //меняем индексы общего кол-ва слайдов и номер текущего слайда
            if (sliderItems.length < 10) {
                current.textContent = `0${slideIndex}`;
            }
            else {
                current.textContent = `${slideIndex}`;
            }

            //задаем класс активности,активная кнопка будет непрозрачной
            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;
        });
    });

    // =============================================================
}

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./dist/js/modules/tabs.js":
/*!*********************************!*\
  !*** ./dist/js/modules/tabs.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
        /* ================Tabs================ */
        const tabsParent = document.querySelector(tabsParentSelector);
        const tabsChild = document.querySelectorAll(tabsSelector);
        const tabsContent = document.querySelectorAll(tabsContentSelector);
    
        function hideTabContent() {
            tabsContent.forEach(tab => {
                tab.classList.remove('show', 'fade');
                tab.classList.add('hide');
            });
            tabsChild.forEach(tab => {
                tab.classList.remove(activeClass);
            });
        }
    
        function showTabContent(i = 0) {
            tabsContent[i].classList.remove('hide');
            tabsContent[i].classList.add('show', 'fade');
            tabsChild[i].classList.add(activeClass);
        }
    
        tabsParent.addEventListener('click', e => {
            //так как в функцию tabs() в качестве аргументов передаются селекторы querySelector(с точками),а в classList  без точек то чтобы селекторы нормально работали-берем селектор-аргумент и вырезаем у него точку вначале(tabsSelector.slice(1))
            if (e.target && e.target.classList.contains(tabsSelector.slice(1))) {
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
}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./dist/js/modules/timer.js":
/*!**********************************!*\
  !*** ./dist/js/modules/timer.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function timer(id, deadLine) {
       /* ===============Timer================ */

       
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
       setClock(id, deadLine);
       /* =========================================== */
}

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./dist/js/script.js":
/*!***************************!*\
  !*** ./dist/js/script.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./dist/js/modules/tabs.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calculator */ "./dist/js/modules/calculator.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./dist/js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./dist/js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/modal */ "./dist/js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./dist/js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./dist/js/modules/timer.js");









document.addEventListener('DOMContentLoaded', () => {

    const modalTimeOut = setTimeout(() => Object(_modules_modal__WEBPACK_IMPORTED_MODULE_4__["openModal"])('.modal', modalTimeOut), 50000);

    Object(_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    Object(_modules_calculator__WEBPACK_IMPORTED_MODULE_1__["default"])();
    Object(_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])();
    Object(_modules_forms__WEBPACK_IMPORTED_MODULE_3__["default"])('form', modalTimeOut);
    Object(_modules_modal__WEBPACK_IMPORTED_MODULE_4__["default"])('[data-modal]', '.modal', modalTimeOut);
    Object(_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
    });
    Object(_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2022-05-01');
});





























































/***/ }),

/***/ "./dist/js/services/services.js":
/*!**************************************!*\
  !*** ./dist/js/services/services.js ***!
  \**************************************/
/*! exports provided: postData, getResource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postData", function() { return postData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResource", function() { return getResource; });
//функции получения данных с сервера и отправки данных на сервер являются сервисными функциями и их функционал переведен в отдельный файл
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

// получение данных для построения карточек с  товарами из db.json
async function getResource(url) {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
}




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map
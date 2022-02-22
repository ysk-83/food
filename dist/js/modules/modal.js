// функции openModal и closeModal вынесены вне фнукции modal потому-что используются также в forms.js(нужно для импорта этих функций в другой файл)
// функция показ. модальное окно.Присваивваем классы отвечающие за скрытие и показ окна.Первый аргумент-.modal,второй-вызов функции закрытия мод. окна по прошествии 
function openModal(modalSelector, modalTimeOut) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; //это свойство запрещает прокрутку всего окна,пока открыто модальное окно

    // если модальное окно открывалось,то очистить таймер вызова модального окна(функция таймера открытия модального окна в script.js)
    if (modalTimeOut) {
        clearInterval(modalTimeOut);
    }

}

// закрываем мод.окно.Передаем селектор '.modal',присваиваем нужные классы
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = ''; //при закрытии мод.окна снимаем ограничение прокрутки окна
}

function modal(triggerSelector, modalSelector, modalTimeOut) {
    /* ===================Modal===================== */
    //для независимой работы модулей жестко закрепленые части(кнопки на странице,формы и тд.) переводим в аргументы функции,а эти селекторы передаем в виде аргументов при вызове этой функции в файле script.js

    const modalOpen = document.querySelectorAll(triggerSelector); //получаем псевдомассив-список кнопок с атрибутом [data-modal] по клику на которые будет открыватся мод.окно
    const modal = document.querySelector(modalSelector); //из вызывающей функции в script.js получаем селектор модального окна .modal

    modalOpen.forEach(btn => {
        //колбэк функцию openModal,нельзя сразу вызывать с ()(дужками)так как она вызовется сразу при построении страницы.Для того чтобы она вызывалась только по клику и для того чтобы мы могли передать аргумент в колбэк функцию,оборачиваем ее в стрелочную функцию
        //    на каждую кнопку навеш. обработчик событий,по клику запустить функцию показа окна
        btn.addEventListener('click', () => openModal(modalSelector, modalTimeOut));
    });

    //    по клику на подложку мод.окна или на "крестик"(которому присвоен атрибут data-close) - закрыть окно.Место клика отслеживется через обьект event.target.Атрибут data-close также будет закрывать окошко showThanksModal(именно для этого и используем делегирование событий)
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    // отслеживаем нажатые кнопки клавиатуры,если была нажата клавиша escape и у модального окна присвоен в данный момент класс show(то есть оно сейчас открыто) тогда закрываем мод.окно
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    // функция показа модального окна при достижении к концу страницы   
    function showModalByScroll() {
        //    если кол-во пикселей прокрученных от верха страницы плюс высота окна браузера(видимая часть рабочего окна) больше или равна высоте прокрученой страницы,то открыть мод.окно и удалить обработчик события скролла
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimeOut);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    /* ============================================= */
}

export default modal;
export { closeModal };//экспортируем эти функии в другой файл
export { openModal };
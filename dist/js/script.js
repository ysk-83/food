import tabs from './modules/tabs';
import calculator from './modules/calculator';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import timer from './modules/timer';
import { openModal } from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {

    // устанавливает таймер отсчета-по прошествию 50000 мс открыть модальное окно(используется в modal.js)
    const modalTimeOut = setTimeout(() => openModal('.modal', modalTimeOut), 50000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    calculator();
    cards();
    forms('form', modalTimeOut);
    modal('[data-modal]', '.modal', modalTimeOut);
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
    });
    timer('.timer', '2022-05-01');
});




























































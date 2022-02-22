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

export default slider;
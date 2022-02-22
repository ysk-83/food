import { getResource } from '../services/services';

function cards() {
    /* используем классы============================= */
    //создаем класс со свойствами необходимыми для построения карточек товаров,такими как заголовок,путь к изображению,текстт описания,родительский элемент в который будут вставлятся карточки(parentSelector) и т.д.Последним аргументом идет rest-оператор для передачи класса или классов(не обязательно)
    class MenuItem {
        constructor(title, alt, src, description, price, parentSelector, ...classes) {
            // порядок свойств не имеет значения
            this.title = title;
            this.alt = alt;
            this.src = src;
            this.description = description;
            this.price = price;
            this.transfer = 27.4;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes; //rest-оператор создает массив,работа с массивом
        }

        // метод для конвертации долларов в гривны
        changeToUAH() {
            return this.price = Math.round(this.transfer * this.price);
        }

        // метод для построения структуры карточки.Создаем элемент div,условие если длинна массива,созданого rest-оператором,равна нулю(то есть не передан ни один класс в вызове new MenuItem() при создании новых карточек) то карточке буден присвоен класс по умолчанию) в ином случае присвоить карточке переданные классы(один или несколько).Это нужно для возможности присвоить карточке нескольких классов
        render() {
            // cardMenu это элемент который станет карточкой
            const cardMenu = document.createElement('div');
            if (this.classes.length === 0) {
                this.cardMenu = 'menu__item';
                cardMenu.classList.add(this.cardMenu);
            } else {
                // проходим по масиву классов и назначаем каждый класс кадой карточке(сколько классов в массиве столько и будет назнчено каждой карточке)
                this.classes.forEach(classname => cardMenu.classList.add(classname));
            }

            // заполняем html-структуру карточки,где в значения атрибутов записываем свойства класса которые будут разными для разных карточек
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
            // вставляем созданную карточку в родительский элемент(контейнер),переданный в аргументах
            this.parent.append(cardMenu);
        }
    }

    // получение данных карточек из db.json. 1 вариант с использованием класса.Вызываем функцию получения данных с сервера,в аргументах-аддресс базы данных.При помощи fetch получаем массив(в db.json содержится масив в котором каждый елемент массива является обьектом)Потом для каждого обьекта,используя деструктуризацию(из обьекта вытаскиваем свойства этого обьекта и используем их  в качестве переменных).Далее вызываем конструктор класса и создаем новые обьекты с аргументами-свойствами из обьекта  из базы данных.Потом отрисовываем сами крточки(создастся столько карточек сколько обьектов втутри массива db.json)Для кждого элемента массива будет вызван конструктор и метод render()
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

    /* ============================================== */
}

export default cards;
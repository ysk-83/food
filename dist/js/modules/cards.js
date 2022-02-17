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

    /* ============================================== */
}

module.exports = cards;
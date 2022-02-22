import { closeModal, openModal } from './modal'; //импортируем функции из других файлов указыая откуда
import { postData } from '../services/services';

function forms(formSelector, modalTimeOut) {
    /* =========================Forms===================== */
    const forms = document.querySelectorAll(formSelector); //получаем все формы на странице(3 штуки)

    const message = {
        loading: 'img/spinner/054_spinner.svg',
        success: 'успех',
        failure: 'о нет,что-то пошло не так',
    };

    //ко всем формам навешиваем функции с обработчиками событий
    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        // обработчик события отправки формы
        form.addEventListener('submit', (e) => {
            e.preventDefault();//предотвращаем поведение по-умолчанию(при отправке формы страница не будет перезагружатся)

            // создаем спиннер во время отправки данных на сервер.Создаем новый элемент-картинку,указываем источник картинки(путь к картинке в папке прописан в обьекте с сообщениями).Применяем инлайн стили к спинеру(выравниваем его по центру,показываем его)
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                    display: block;
                    margin: 0 auto;
                `;
                // для того что-бы спинер был по центру во всех формах,вствляем его этим способом именно после формы(но как бы в ней)
            form.insertAdjacentElement('afterend', statusMessage);

            // реализация отправки запроса на сервер чeрез fetch API(json-формат)
            // создаем переменную и присваиваем ей созданный обьект с данными формы(здесь будут данные введеные в полях формы)
            const formData = new FormData(form);

            // преобразовываем данные формы FormData в формат JSON(более новый способ)
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // вызываем функцию отправки данных формы на сервер(определение функции в services.js),в аргументах указываем адресс сервера куда отправляем данные формы,переменную содержащую данные которые мы ввели в форму(уже преобразованные в json формат).Отправ. запрос,потом печатаем результат в консоли,показываем окно с описанием результата(успех) и удаляем его(окно).Если что-то пошло не так,catch обрабатывает ошибку-показывая окно с ообщением об ошибке.В конце по умолчанию при любом исходе очищаем форму
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
        });
    }

    // показываем окно с результатом отправки данных на сервер,в аргументе передаем сообщение(при успехе одно сообщ.,пр ошибке другое)
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');//берем уже существующее модальное окно,присваиваем его в новую переменную,скрываем его и показыаем обычное изначальное мод.окно
        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimeOut);

        // создаем новый блок,присваиваем класс '.modal__dialog',наполняем его нужной структурой
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        //
        thanksModal.innerHTML = `
                <div class="modal__content">
                    <div data-close class="modal__close">&times;</div>
                    <div class="modal__title">${message}</div>
                </div>
            `;
            // вставляем thanksModal в мод.окно 
        document.querySelector('.modal').append(thanksModal);

        // через время thanksModal удаляем,присаиваем класс показа окна,удаляем класс скрытия окна и чтобы модальное окно не мешало-закрываем его сразу.Эти действия нужны для того что-бы при след.вызове мод.окна оно открылось правильно
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
            prevModalDialog.classList.add('show');
            closeModal('.modal');
        }, 2000);
    }

    /* -============================================== */
}

export default forms;
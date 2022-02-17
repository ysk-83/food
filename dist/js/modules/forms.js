function forms() {
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
}

module.exports = forms;
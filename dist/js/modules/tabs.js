function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
        /* ================Tabs================ */
        const tabsParent = document.querySelector(tabsParentSelector);
        const tabsChild = document.querySelectorAll(tabsSelector);
        const tabsContent = document.querySelectorAll(tabsContentSelector);
    
        // скрываем все табы.Каждый таб-это элемент массива tabsContent,перебирая массив у каждого таба удаляем класс который отвечает за его показ и добавляем класс удаляющий его,также удаляем класс активности у списка вкладок tabsChild
        function hideTabContent() {
            tabsContent.forEach(tab => {
                tab.classList.remove('show', 'fade');
                tab.classList.add('hide');
            });
            tabsChild.forEach(tab => {
                tab.classList.remove(activeClass);
            });
        }
    
        // функция отвечающая за показ таба.По умолчанию будет показан элемент массива i(в аргументе функции i = 0),ему будет присвоен класс show,удален класс hide,также элементу списка добавлен класс активности
        function showTabContent(i = 0) {
            tabsContent[i].classList.remove('hide');
            tabsContent[i].classList.add('show', 'fade');
            tabsChild[i].classList.add(activeClass);
        }
    
        // назначаем обработчик событий с делегированием(потому-что не известно сколько табов будет окончательно или они потом будут добавлятся)
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
    
        // Скрываем все табы на странице и сразу же показываем первый таб по-умолчанию
        hideTabContent();
        showTabContent();
        /* ============================================= */
}

export default tabs;
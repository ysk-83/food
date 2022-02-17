function tabs() {
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
}

module.exports = tabs;
// "use strict";

// document.addEventListener('DOMContentLoaded', () => {
//     const tabsParent = document.querySelector('.tabheader__items');
//     const tabsChildren = document.querySelectorAll('.tabheader__item');
//     const tabsContent = document.querySelectorAll('.tabcontent');

//     function hideTabContent() {
//         tabsContent.forEach( (tab) => {
//             tab.style.display = 'none';
//         });
//         tabsChildren.forEach(tab => {
//             tab.classList.remove('tabheader__item_active');
//         });
//     }

//     function showTabContent(i = 0) {
//         tabsContent[i].style.display = 'block';
//         tabsChildren[i].classList.add('tabheader__item_active');
//     }

//     tabsParent.addEventListener('click', (e) => {
//         if(e.target && e.target.classList.contains('tabheader__item')) {
//             tabsChildren.forEach((tab, i) => {
//                 if(tab == e.target) {
//                     hideTabContent();
//                     showTabContent(i); 
//                 }
//             });
//         }
//     });

//     hideTabContent();
//     showTabContent();
// });


document.addEventListener('DOMContentLoaded', () => {
    const tabsParent = document.querySelector('.tabheader__items');
    const tabsChild = document.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');

    console.log(tabsContent);
    console.log(tabsChild);

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
        tabsContent[i].classList.add('show','fade');
        tabsChild[i].classList.add('tabheader__item_active');
    }

    tabsParent.addEventListener('click', e => {
        if (e.target && e.target.classList.contains('tabheader__item')) {
            tabsChild.forEach((item, i) => {
                if (item == e.target) {
                    hideTabContent();
                    showTabContent(i);
                    /* tabsContent[i].classList.remove('hide');
                    tabsContent[i].classList.add('show');
                    tabsChild[i].classList.add('tabheader__item_active'); */
                } /* else {
                    tabsContent[i].classList.remove('show');
                    tabsContent[i].classList.add('hide');
                    tabsChild[i].classList.remove('tabheader__item_active');
                } */
            });
        }
    });

    hideTabContent();
    showTabContent();
});
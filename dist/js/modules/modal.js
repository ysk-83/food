function modal() {
       /* ===================Modal===================== */
       const modalOpen = document.querySelectorAll('[data-modal]');
       const modal = document.querySelector('.modal');
       // const modalClose = document.querySelectorAll('[data-close]');
   
       function openModal() {
           modal.classList.add('show');
           modal.classList.remove('hide');
           document.body.style.overflow = 'hidden';
           clearInterval(modalTimeOut);
       }
   
       function closeModal() {
           modal.classList.add('hide');
           modal.classList.remove('show');
           document.body.style.overflow = '';
       }
   
       modalOpen.forEach(btn => {
           btn.addEventListener('click', openModal);
       });
   
       /*  modalClose.forEach(btn => {
            btn.addEventListener('click', closeModal);
        }); */
   
       modal.addEventListener('click', (e) => {
           if (e.target === modal || e.target.getAttribute('data-close') == '') {
               closeModal();
           }
       });
   
       document.addEventListener('keydown', (e) => {
           if (e.code === 'Escape' && modal.classList.contains('show')) {
               closeModal();
           }
       });
   
       const modalTimeOut = setTimeout(openModal, 50000);
       function showModalByScroll() {
           if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
               openModal();
               window.removeEventListener('scroll', showModalByScroll);
           }
       }
       window.addEventListener('scroll', showModalByScroll);
   
   
       /* ============================================= */
}

module.exports = modal;
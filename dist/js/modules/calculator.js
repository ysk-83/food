function calculator() {
      // калькулятор=================================================

      const rezult = document.querySelector('.calculating__result span');
      let sex;
      let height;
      let weight;
      let age;
      let ratio;
  
      // если в local storage есть запись с ключем sex,то получаем его значение и присваиваем переменной sex,если нет присваиваем значение по умолчанию female и делаем запись в local storage.То же делаем и для переменной ratio.
      if (localStorage.getItem('sex')) {
          sex = localStorage.getItem('sex');
      } else {
          sex = 'female';
          localStorage.setItem('sex', 'female');
      }
  
      if (localStorage.getItem('ratio')) {
          ratio = localStorage.getItem('ratio');
      } else {
          ratio = 1.375;
          localStorage.setItem('ratio', 1.375);
      }
  
      // доб.класс активности для блока(женщина-мужчина) и для блока(физическая активность).Два вызова этой функции с разными аргументами для каждого блока.Получаем  список всех элементов в блоке,для каждого элемента удаляем класс активности если он есть,потом если у отдельного элемента блока совпадает значение атрибута со значением записи в local storage то этому элементу присвоим  класс активности(если значение id-тэга равно male и значение ключа sex равно male,то присвоить этому элементу класс активности).Тоже условие и для блока физическая активность
      function initLocalSettings(selector, activeClass) {
          const elements = document.querySelectorAll(selector);
          elements.forEach(item => {
              item.classList.remove(activeClass);
  
              if (item.getAttribute('id') === localStorage.getItem('sex')) {
                  item.classList.add(activeClass);
              }
              if (item.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                  item.classList.add(activeClass);
              }
          });
      }
  
      initLocalSettings('#gender div', 'calculating__choose-item_active');
      initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
  
      //подсчет калорий и проверка условий(если не введено хоть одно значение-результата не будет)результат вычислений не сохраняем в переменную,а сразу выводим в span
      function calcTotal() {
          if (!sex || !height || !weight || !age || !ratio) {
              rezult.textContent = '______';
              return;
          }
          if (sex === 'female') {
              rezult.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
          } else {
              rezult.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
          }
      }
      
      calcTotal();
  
      // собираем данные с блока (женщина-мужчина(здесь нужно получить значение id)) и блока(физическая активность(здесь нужно получить значение data-ratio)).Два вызова этой функции с разными аргументами для каждого блока.Получаем коллекцию элементов,на каждый элемент навешиваем обработчик событий с условием если клик произошел на обьекте события укоторого есть атрибут data-ratio то переменной ratio присваиваем значение этого атрибута и записываем новые данные в local storage,в ином случае обращаемся к id,его значению и записываем  в хранилище
      function getStaticInfo(selector, activeClass) {
          const elements = document.querySelectorAll(selector);
  
          elements.forEach(item => {
              item.addEventListener('click', (e) => {
                  if (e.target.getAttribute('data-ratio')) {
                      ratio = +e.target.getAttribute('data-ratio');
                      localStorage.setItem('ratio', ratio);
                  } else {
                      sex = e.target.getAttribute('id');
                      localStorage.setItem('sex', sex);
                  }
  
                  // для каждого элемента удаляем класс активности если он есть,обьекту события клика присаиваем класс активности,вызываем calcTotal(); чтобы после каждого изменения данных автоматически пересчитывалась формула
                  elements.forEach(item => {
                      item.classList.remove(activeClass);
                  });
                  e.target.classList.add(activeClass);
  
                  calcTotal();
              });
          });
      }
  
      getStaticInfo('#gender div', 'calculating__choose-item_active');
      getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');
  
      // получение данных с блока (конституция(здесь-inputы,а значить используем input.value))Вызовем функцию три раза по одному на каждый input.Получаем элемент,навешиваем обработчик событий для input,при условии если введены не цифры-меняем цвет границы на красный,если нет-удаляем границу.
      function getDynamicInfo(selector) {
          const input = document.querySelector(selector);
  
          input.addEventListener('input', () => {
              if (input.value.match(/\D/g)) {
                  input.style.border = '2px solid red';
              } else {
                  input.style.border = 'none';
              }
  
              // если у input в который мы ввели данные значение атрибута  тэга id равно height,то переменной height присв. значение введеное  вэтот input.Также и для остальных
              switch (input.getAttribute('id')) {
                  case 'height':
                      height = +input.value;
                      break;
                  case 'weight':
                      weight = +input.value;
                      break;
                  case 'age':
                      age = +input.value;
                      break;
              }
  
              // вызываем calcTotal(); чтобы после каждого изменения данных автоматически пересчитывалась формула
              calcTotal();
          });
      }
  
      getDynamicInfo('#height');
      getDynamicInfo('#weight');
      getDynamicInfo('#age');
  
      // ============================================================
}

export default calculator;
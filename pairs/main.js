
(() => {

  const TIME_STOP = 900; // время задержки
  const section = document.createElement('section');
  const container = document.getElementById('pairs-app'); //  игровое поле
  document.body.append(section);
  section.append(container);

  section.style.background = 'url(./images/bg.webp)';
  section.style.minHeight = '720px'

  //зададим положение контейнера
  container.style.margin = '0 auto 0 0';
  container.style.maxWidth = '450px';
  container.style.padding = '20px';


  let countCart = 4; //количество цифр в картах
  
  let cards = []; // массив с карточками
  let openCards = []; // массив открытых карточек в ходе игры (максимум 2)
  let arrPair = []; // массив с перемешанными карточками
  let countOpenCards = 0; //сколько всего открытых карт
  
  menu();

  function menu() {
    container.innerHTML = '';
    const casee = document.createElement('div');
    const btn = document.createElement('button');

    const form = document.createElement('form');
		const input = document.createElement('input');
		const buttonWrapper = document.createElement('div');

		form.classList.add('input-group', 'mb-3'); //добавили класс Bootstrap
		//mb-3 - отступ после формы
		input.classList.add('form-control');
		//form-control - для правильного отображения поля для ввода
		buttonWrapper.classList.add('input-group-append');
		//input-group-append - позиционирование элемента справа от поля для ввода
		btn.classList.add('btn', 'btn-primary');
		//btn - сттили для кнопки
		//btn-primary - нарисует кнопку синим цветом
    casee.style.minWidth = '550px'

		input.placeholder = 'Количество карточек по вертикали/горизонтали';
		btn.textContent = 'Начать игру';

    container.append(casee);
    buttonWrapper.append(btn);//добавили кнопку в контейнер
		form.append(input);
		form.append(buttonWrapper);
    casee.append(form);

    //деактивируем кнопку, если пользователь ничего не ввел
    btn.disabled = true;
		input.addEventListener('input', () => {
			if (input.value !== "") {
				btn.disabled = false;
			} else {
				btn.disabled = true;
			};
		});

    btn.addEventListener('click', () => {
      if (input.value % 2 == 0 && input.value <= 10 && input.value >= 2) {//проверка на корректность значения
        countCart = input.value;
        startGame();
      } else {
        alert('В поле можно ввести чётное число от 2 до 10.')
      }
    })

		return {
			form,
			input,
			btn,
      countCart
		};


  }

  //функция, генерирующуя массив парных чисел 
  function createArr(len){
    let arr = [];
    for (let i = 0; i < len; i++){
      arr.push(i+1, i+1);
    }

    return arr
  }

  //алгоритм Фишера — Йетса для перемешивания массива
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
  
      // поменять элементы местами
      // то же самое можно записать как:
      // let t = array[i]; array[i] = array[j]; array[j] = t
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }
  
  //массив из объектов, где каждый объект - это карточка с руюашкой и лицевой стороной
  function createArrObj(array) {
    let newArray = [];
    
    for (let i = 0; i < array.length; i++){
      let cart = {
        id: i,
        back: '',
        front: array[i]
      }

      newArray.push(cart);
    }
    return newArray;
  }

  //создание карточки
  function createCart(value){
    const card = document.createElement('button');

    card.style.margin = '10px';
    card.style.padding = '20px';
    card.style.width = '80px';
    card.style.height = '80px';
    card.style.backgroundColor = '#B9EB90'

    card.addEventListener('click', () => {
      cartClick(card, value);
    })

    return card;

  }

  //отработка нажатия на карточку
  function cartClick(card, value) {
    if (card.textContent === value.front || openCards.length === 2){
      return; //если карточка уже открыта или открыто 2
    }

    card.textContent = value.front; // показываем карточку
    card.style.backgroundColor = '#ffb27c';

    openCards.push(card); //добавляем в массив открытых
    if (openCards.length === 2){ // ждем когда кликнут на 2 карточки
      examCart(value); // вызываем проверку на совпадение
    }
  }

  //проверка на совпадение
  function examCart(value){
    const [card1, card2] = openCards;

    if (card1.textContent === card2.textContent) {
      countOpenCards++; //увеличиваем счетчик карт
      openCards = []; // обнуляем массив с открытыми картами
      if (countCart == countOpenCards) {
        endGame(); // проверяем не открыты ли уже все карты
      }
    } else {
      setTimeout(() => {//даем запомнить карту и переворачиваем
        card1.textContent = value.back;
        card2.textContent = value.back;
        card1.style.backgroundColor = '#b9eb90';
        card2.style.backgroundColor = '#b9eb90';
        openCards = [];
      }, TIME_STOP)
    }
  }

  //завершение
  function endGame(){
    alert('Это победа!');
    menu();
  }

  //запуск игры
  function startGame() {
    //  выыполним сброс
    cards = [];
    container.innerHTML = '';
    countOpenCards = 0;

    //перемешаем карточки
    arrPair = createArrObj(shuffle(createArr(countCart)))

    //создаем карточки на игровом поле
    arrPair.forEach((value, index) => {
      const cart = createCart(value);
      container.append(cart);
      cards.push(cart);
    })
  }; 
})();
//Цели задачи
/*
Самостоятельно получить опыт работы с событиями и изменением существующего кода.
Научиться создавать веб-приложения на примере приложения TODO.
*/

// Этап 1
/*
//1) Напишите код приложения TODO, повторяя за спикером из видео.
//Проверьте его работоспособность.
//2) Изучите написанный код.
//Рекомендуем каждую строку кода дополнить комментарием с описанием назначения команды.
// 3) Измените функцию создания дела,
// чтобы она принимала и корректно обрабатывала объект { name, done }, а не просто название.
// Это пригодится для преобразования объекта дела в DOM-элемент.
*/

//Этап 2
/*
//Сделайте так, чтобы у кнопки в форме устанавливался атрибут disabled,
// когда поле ввода пустое. Не забудьте, что disabled должен устанавливаться и при загрузке приложения,
// так как изначально поле тоже пустое.
*/


//Этап 3
/*
//Каждое созданное дело должно храниться в массиве дел в виде объекта.
//При создании нового дела в массив должен добавляться новый объект с тремя параметрами:
//name — название дела, done — статус дела, который может принимать значения true или false,
//и id — уникальный числовой параметр.

Чтобы сгенерировать id, вы можете выбрать один из двух способов:

1) Для каждого нового объекта (дела) можно генерировать id с произвольным, рандомным числом.

2) Написать функцию, которая будет искать максимальный id в массиве дел и прибавлять к максимальному id число 1.
Пример массива с объектами дел
[

	{id: 1, name: ‘Купить хлеб', done: false},

	{id: 2, name: ‘Покормить кота’, done: true},

	{id: 3, name: ‘Сделать задание по JS’, done: true}

]


*/

//Этап 4
/*
// Сделайте так, чтобы при нажатии на кнопку «Удалить»
// удалялся не только DOM-элемент li из DOM-дерева,
// но и объект в массиве дел.

Для решения этой задачи при клике на кнопку «Удалить»
необходимо найти в массиве дел объект с таким же id и удалить его.
Искать элементы в массиве вы уже умеете.

// Так же поступите и с кнопкой изменения статуса.
// При клике на неё найдите в массиве объектов нужный объект
// и измените параметр done на противоположный.

*/

//Этап 5
/*
Создайте функцию сохранения массива дел в LocalStorage.
Вызывайте функцию сохранения каждый раз, когда изменяете список дел,
а именно: добавляете новое дело, удаляете дело или изменяете его статус.

Учтите, что список дел разный для каждой страницы,
поэтому нужно использовать разные ключи в LocalStorage.
Ключ можно передавать отдельным параметром в createTodoApp.

Что нужно сделать
// 1) Создайте новую функцию, объединяющую dataToJson и setCartData.
// Используйте созданную функцию для записи списка дел в LocalStorage.
// Новая функция будет принимать два параметра:
// 	название (ключ), по которому будет происходить сохранение в LocalStorage;
// 	данные для сохранения.

// 2) Создайте новую функцию, объединяющую jsonToData и getCartData.
// Используйте созданную функцию для чтения списка дел из LocalStorage.
// Новая функция будет принимать один параметр:
// 	ключ для чтения данных — данные должны возвращаться из метода с помощью return.

// 3) Используйте методы для создания, 
// редактирования и 
// удаления дел в списке.
// 4) Добавьте в функцию createTodoApp() третий параметр listName,
// который поможет вам создать собственный список для каждого пользователя.

Пример запуска приложения на странице пользователя:

document.addEventListener('DOMContentLoaded', function(){

	createTodoApp(document.getElementById('todo-app'), 'Мои дела', 'my');

});

*/

// //Этап 6
// /*
// Сейчас ваше приложение может сохранять список дел.
// На данном этапе нужно сделать так, чтобы при запуске приложения в функции createTodoApp()
// была выполнена проверка на наличие данных в localStorage.
// Если в localStorage есть данные, то их нужно расшифровать и
// полученный массив отрисовать на экране в виде DOM-элементов списка.
// */

//решение

(function () {

	let todoArr = [];
	let key = '';
	//создаем  и возвращаем заголовок приложения
	function createApptitle(title) {
		let appTitle = document.createElement('h2'); //создаем тег
		appTitle.innerHTML = title; //заполняем тег
		return appTitle; //возвращаем заполненный тег
	}

	//создаем  и возвращаем форму для создания тела
	function createTodoItemForm() {
		let form = document.createElement('form');
		let input = document.createElement('input');
		let buttonWrapper = document.createElement('div');
		let button = document.createElement('button');

		form.classList.add('input-group', 'mb-3'); //добавили класс Bootstrap
		//input-group - содержит в себе группу элементов формы
		//mb-3 - отступ после формы
		input.classList.add('form-control');
		//form-control - для правильного отображения поля для ввода
		buttonWrapper.classList.add('input-group-append');
		//input-group-append - позиционирование элемента справа от поля для ввода
		button.classList.add('btn', 'btn-primary');
		//btn - сттили для кнопки
		//btn-primary - нарисует кнопку синим цветом

		input.placeholder = 'Введите название нового дела';
		button.textContent = 'Добавить дело';

		buttonWrapper.append(button);//добавили кнопку в контейнер
		form.append(input);
		form.append(buttonWrapper);

		input.addEventListener('input', function () {
			if (input.value !== "") {
				button.disabled = false;
			} else {
				button.disabled = true;
			};
		});

		return {
			form,
			input,
			button,
		};
	}

	//создаем  и возвращаем список элементов
	function createTodoList() {
		let list = document.createElement('ul');
		list.classList.add('list-group');
		//list-group - 
		return list;
	}

	function createTodoItem(obj) {
		let item = document.createElement('li');
		//кнопки помещаем в элемент, который красиво покажет их в одной группе
		let buttonGroup = document.createElement('div');
		let doneButton = document.createElement('button'); // сделанное
		let deleteButton = document.createElement('button'); // удалить

		//устанавливаем стили для элемента списка, 
		//а также для размещения кнопок в его правой части с помощью flex

		item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
		item.textContent = obj.name;

		buttonGroup.classList.add('btn-group', 'btn-group-sm');
		doneButton.classList.add('btn', 'btn-success');
		doneButton.textContent = 'Готово';
		deleteButton.classList.add('btn', 'btn-danger');
		deleteButton.textContent = 'Удалить';

		doneButton.addEventListener('click', function () {
			item.classList.toggle('list-group-item-success');
			doneTodo(todoArr, obj)

			//todoArr.push(obj);
			setCartData(key, todoArr);
		});
		deleteButton.addEventListener('click', function () {
			if (confirm('Вы уверены?')) {
				item.remove();
				delTodoId(obj, todoArr);
				remofeFromCart(obj.id, key);

				setCartData(key, todoArr)
			}
		});

		//складываем кнопки в отдельный блок
		buttonGroup.append(doneButton);
		buttonGroup.append(deleteButton);
		item.append(buttonGroup);

		//приложению нужен доступ к самому элементу и кнопкам для обработки события нажатия
		return {
			item,
			doneButton,
			deleteButton,
		};
	}

	//генерация порядкового id
	function getId(array) {
		let max = 0;
		for (let i = 0; i < array.length; i++) {
			if (array[i].id > max) {
				max = array[i].id;
			}
		}
		return id = max + 1;
	}

	//удаление дела из массива
	function delTodoId(element, array) {
		let x = -10;
		for (let i = 0; i < array.length; i++) {
			if (array[i].id == element.id) {
				x = i;
				break
			}
		};
		if (x != -10) {
			array.splice(x, 1);
		} else {
			return;
		}
	};

	//вернет данные из LocalStorage
	function getCartData(key) {
		return JSON.parse(localStorage.getItem(key))
	};

	//запишет данные в LocalStorage
	function setCartData(key, data) {
		return localStorage.setItem(key, JSON.stringify(data))
	};

	//удаляет из корзины
	function remofeFromCart(id, key) {
		//получим текущее состояние корзины и преобразуем в данные
		let cart = getCartData(key)

		//новый список корзины, в который переносим все, кроме удаленного 
		let newCart = [];
		for (let i = 0; i < cart.length; i++) {
			if (cart[i].id !== id) {
				newCart.push(cart[i]);
			}
		}

		setCartData(key, newCart)
	}

	//редактирование статуса
	function doneTodo(array, element) {
		let x = -10;
		for (let i = 0; i < array.length; i++) {
			if (array[i].id == element.id) {
				x = i;
				break
			}
		};
		if (x != -10) {
			if (array[x].done == true) { //проверяем статус дела
				array[x].done = false
			} else {
				array[x].done = true
			}
		} else {
			return;
		}
	}

	function createTodoApp(container, title = 'Список дел', listName) {
		let todoAppTitle = createApptitle(title);
		let todoitemForm = createTodoItemForm();
		let todoList = createTodoList();

		key = listName;

		container.append(todoAppTitle);
		container.append(todoitemForm.form);
		container.append(todoList);

		//делаем кнопку нефункциональной, если поле ввода пустое
		todoitemForm.button.disabled = true;
		todoitemForm.form.addEventListener('input', function () {
			if (todoitemForm.input.value) {
				todoitemForm.button.disabled = false;
			} else {
				todoitemForm.button.disabled = true;
			}
		});

		//массив дел
		todoArr = getCartData(key);
		//проверка на случай null
		todoArr = todoArr ? todoArr : [];

		for (const itemList of todoArr) {
			let todoItem = createTodoItem(itemList);
			todoList.append(todoItem.item)
		}

		//браузер создает событие submit на форме по нажатию на Enter или на кнопку создания дела
		todoitemForm.form.addEventListener('submit', function (e) {
			//Эта строчка необходима, чтобы предотвратить стандартные действия браузера
			//в данном случае мы не хотим, чтобы страница перегружалась при отправке формы
			e.preventDefault();

			todoitemForm.button.disabled = true;

			//игнорируем создание элемента, если пользователь ничего не  ввел в поле
			if (!todoitemForm.input.value) {
				return;
			}

			let obj = {
				name: todoitemForm.input.value,
				done: false,
				id: getId(todoArr)
			};

			let todoItem = createTodoItem(obj);

			todoArr.push(obj);//добавляем дело в массив
			setCartData(key, todoArr);

			//создаем и добавляем в список новое дело с название из поля для ввода
			todoList.append(todoItem.item);
			//обнуляем значение в поле, чтобы не пришлось стирать его вручную
			todoitemForm.input.value = '';

		});
	}

	window.createTodoApp = createTodoApp;

})();


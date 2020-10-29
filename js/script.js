'use strict';

const translateDivElement = document.querySelector('.translate');

const btnTranslateElement = document.querySelector('.btn-translate');

btnTranslateElement.addEventListener('click', translateText);

function translateText() {

  const wordForTranslate = document.querySelector('.text-input').value;

  const sourceLanguage = document.querySelector('.source-language').value;

  const finalLanguage = document.querySelector('.final-language').value;

  translateDivElement.innerHTML = '';

  if (wordForTranslate == '') {
    alert('Вы ничего не ввели!');
    return;
  }

  // Создаем объект XMLHttpRequest, при помощи которого будем отправлять запрос
  const req = new XMLHttpRequest();

  // Сохраняем ключ API, полученный со страницы https://tech.yandex.ru/keys/get/?service=trnsl
  const API_KEY = 'trnsl.1.1.20200412T140059Z.838999b422e35733.45964305d18acc16acd955ab7951efbdf353ea0e';

  // Сохраняем адрес API
  let url = 'https://translate.yandex.net/api/v1.5/tr.json/translate';

  // Формируем полный адрес запроса:
  url += '?key=' + API_KEY; // добавляем к запросу ключ API
  url += '&text=' + wordForTranslate; // текст для перевода
  url += '&lang=' + sourceLanguage + '-' + finalLanguage; // направление перевода: с русского на английский

  // Таким образом формируется строка вида:
  // https://translate.yandex.net/api/v1.5/tr.json/translate?key=example_api_key&text=кролики&lang=ru-en
  
  // Назначаем обработчик события load
  req.addEventListener('load', function () {
    console.log(req.response); // отображаем в консоли текст ответа сервера
    const response = JSON.parse(req.response); // парсим его из JSON-строки в JavaScript-объект

    // Проверяем статус-код, который прислал сервер
    // 200 — это ОК, остальные — ошибка или что-то другое
    if (response.code !== 200) {
      translateDivElement.innerHTML += 'Произошла ошибка при получении ответа от сервера:\n\n' + response.message;
      return;
    }

    // Проверяем, найден ли перевод для данного слова
    if (response.text.length === 0) {
      translateDivElement.innerHTML += 'К сожалению, перевод для данного слова не найден';
      return;
    }

    // Если все в порядке, то отображаем перевод на странице
     translateDivElement.innerHTML = '<p class="result">Результат перевода: ' + response.text.join('<br>') + '</p>'; // вставляем его на страницу
  });

  // Обработчик готов, можно отправлять запрос
  // Открываем соединение и отправляем
  req.open('get', url);
  req.send();

}


# Отель TOXIN

Стажировка MetaLamp. Верстка основных страниц для практики frontend-developing.

Вместо шрифта Quicksand использовался Open Sans. Причиной замены является отсутствие кириллического начертания.

## Доступные страницы:

* ### [Главная](https://van4e3wt.github.io/TOXIN/)
* ### [Войти](https://van4e3wt.github.io/TOXIN/login.html)
* ### [Регистрация](https://van4e3wt.github.io/TOXIN/registration.html)
* ### [Поиск номеров](https://van4e3wt.github.io/TOXIN/search-room.html)
* ### [Номер отеля](https://van4e3wt.github.io/TOXIN/room.html)
* ### [UI-kit](https://van4e3wt.github.io/TOXIN/uikit.html)

## Навигация

* [Загрузка репозитория](#загрузка-репозитория)
* [Инструкция по развертыванию](#инструкция-по-развертыванию-и-сборке)
* [Плагины](#используемые-плагины)


## Загрузка репозитория

Существует два основных способа загрузки содержимого: 

Клонирование репозитория (необходим установленный Git)
```
git clone https://github.com/Van4e3WT/TOXIN.git
```

Скачивание в формате ZIP-архива через интерфейс GitHub: `Code -> Download ZIP`

## Инструкция по развертыванию и сборке

### Установка
После скачивания проекта необходимо установить пакеты проекта (для этого необходима среда [node.js](https://nodejs.org/) с содержащейся в ней менеджером пакетов npm).

```
npm install
```

### Сборка проекта

Собрать проект можно в двух форматах.

Первый, предоставляющий сборку в минимизированном формате
```
npm run build
```

Второй, производящий отладочную сборку, где сохраняются пробельные символы и комментарии

```
npm run dev
```

### Запуск Dev Server'a

Дополнительный способ запуска проекта с использованием Dev Server'a и обновлением в реальном времени

```
npm run start
```

## Используемые плагины
**[jQuery](https://github.com/jquery/jquery)**

**[air-datepicker](https://github.com/t1m0n/air-datepicker)**

**[multislider-v43](https://github.com/Van4e3WT/Mutilslider_V43)**


[^ В начало ^](#навигация)
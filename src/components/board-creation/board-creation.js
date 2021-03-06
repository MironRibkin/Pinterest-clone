const modalCreateBoard = document.getElementById("modal-window-creat"); //div затемнения для popup
const btn = document.getElementById("btn-board-create"); //кнопка открыть popup
const closed = document.getElementById("board-create__close"); //кнопка Закрыть в popup
const btnCreate = document.getElementById("board-create__next");  //кнопка Создать в popup
const inputNameBoard = document.getElementById("inputCreateBoard-name"); // инпут Название доски в popup
const inputNameСoauthor = document.getElementById("inputCreateBoard-coauthor");  // инпут соавтор в popup
const popupCreate = document.querySelector('.board-create'); // div самого popup
const popupCreateCompleted = document.querySelector('.board-completed'); // div второго popup "completed"
const popupImgLogo = document.querySelector('.board-create__img'); //div картинки

// !!!!!!!!!!!!!!!!!!!!!!!!!!! НАДО ДОБАВИТЬ НА ГЛАВНУЮ СТРАНИЦУ!!!!!!!!!!!!!!!!!!!!!!!!!
let data = [];  // массив досок
//добавляем картинку из API при загружке страницы и создаем доску по умолчанию "ПРОФИЛЬ"
fetch("https://picsum.photos/300/500").then(response => {
    popupImgLogo.style.background = `url("${response.url}")`;
}).then(() => {
    const board = {}; //создание переменной типа объект
    const imageLogo = popupImgLogo.style.background;  // забираем стиль background(url) в переменную
    board.id = 1;
    board.name = 'Доска 1';
    board.img = [];
    board.imageLogo = imageLogo;  // Добавление ссылки на лого
    data.push(board); // добавляем объект в массив
// ===================добавляем массив в localStorage===============
    const stringified = JSON.stringify(data);
    localStorage.setItem('board', stringified);
// ================================================================
});

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!!!!!!!!


export function ButtonClickCreateBoard() {
    modalCreateBoard.style.display = "block";
    popupCreate.style.display = "flex";
    checkNameBoard();
    //добавляем картинку из API при вызове окна
    fetch("https://picsum.photos/300/500").then(response => {
        popupImgLogo.style.background = `url("${response.url}")`;
        return response.url
    });

}

btn.addEventListener('click', ButtonClickCreateBoard);

closed.onclick = function () {
    modalCreateBoard.style.display = "none";
    clearInputCreateBoard();


}


window.addEventListener('click', (event) => {

    if (event.target === modalCreateBoard) {

        modalCreateBoard.style.display = "none";
        clearInputCreateBoard();
    }
});

// Проверка на название доски для активации кнопки
inputNameBoard.addEventListener('input', () => {
    checkNameBoard();
})
// Сама функция Проверка на название доски для активации кнопки
let checkNameBoard = () => {
    if (inputNameBoard.value.length > 0) {
        btnCreate.classList.add('board-create__next');
        btnCreate.classList.remove('disabled');
    } else {
        btnCreate.classList.add('disabled');
        btnCreate.classList.remove('board-create__next');
    }
}


// Создаем объект доска в массиве
btnCreate.addEventListener('click', () => {
    const board = {};
    const imageLogo = popupImgLogo.style.background;
// ===================достаем массив из localStorage===============
    const result = localStorage.getItem('board');
    data = JSON.parse(result);
    board.id = data.length + 1;
// ================================================================
// Проверка на символы в инпутах, для добавления в массив
    if (inputNameСoauthor.value.length > 0 && inputNameBoard.value.length > 0) {
        board.name = inputNameBoard.value;  // Добавление имени доски
        board.coauthor = inputNameСoauthor.value; // Добавление имени соавтора
        board.imageLogo = imageLogo;  // Добавление ссылки на лого
        board.img = []; // создание массива для картинок
        data.push(board);
        showFormCompleted();

    } else if (inputNameBoard.value.length > 0) {
        board.name = inputNameBoard.value;  // Добавление имени доски
        board.imageLogo = imageLogo;  // Добавление ссылки на лого
        board.img = []; // создание массива для картинок
        data.push(board);
        showFormCompleted();
    }
// ===================добавляем массив в localStorage===============
    const stringified = JSON.stringify(data);
    localStorage.setItem('board', stringified);
// ================================================================

});

// Плавное закртие после создания
const showFormCompleted = () => {

    setTimeout(() => {
        popupCreate.style.display = "none";
        popupCreateCompleted.style.display = "flex";
    }, 300);

    setTimeout(() => {
        clearInputCreateBoard();
        popupCreateCompleted.style.display = "none";
        modalCreateBoard.style.display = "none";
    }, 2500)
    popupCreate.style.display = "flex";
};


// Очистка инпутов после работы с доской
const clearInputCreateBoard = () => {
    inputNameBoard.value = '';
    inputNameСoauthor.value = '';
}


let getArrayBoard = () => {
    const result = localStorage.getItem('board');
    data = JSON.parse(result);
    return data;
}

export const getIdBoard = (event, img) => {
    let id = event.target.dataset.id;
    id = id - 1;
    let data = getArrayBoard(); // выгружаем массив из localStorage
    let findImg = data[id].img.includes(img)  // ищем URL картинки в массиве
    // Если не нашли, добавляем в массив и кидаем в localStorage
    if (findImg === false) {

        data[id].img.push(img);
        // ===================добавляем массив в localStorage===============
        const stringified = JSON.stringify(data);
        localStorage.setItem('board', stringified);
        // ================================================================
    }

}

let getData = getArrayBoard(); //забираем массив из localStorage
export const initList = (item) => {
    let boards = document.createElement("div")
    boards.classList.add("dropdown-content")
    boards.classList.add("toggle-drop")
    boards.classList.add("show")

    getData.forEach(element => {
        const divWrapper = document.createElement('div');
        const divBoard = document.createElement('div');
        const imgBoard = document.createElement('div');
        imgBoard.classList.add('board-img');
        divWrapper.setAttribute('data-id', element.id);
        divWrapper.classList.add('board-wrapper')
        divBoard.setAttribute('data-id', element.id);
        imgBoard.style.background = element.imageLogo;
        divBoard.append(element.name);
        divWrapper.append(imgBoard);
        divWrapper.append(divBoard);
        divWrapper.addEventListener('click', () => {

        })
        boards.append(divWrapper);
        item.append(boards);
    });

}





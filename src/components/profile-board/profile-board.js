let data = [];

const boardList = document.querySelector(".drop-btn");
const divMyDropdown = document.querySelector('.dropdown-content2');
let divWrapperHead = document.querySelector('.popup-profile__wrapper-head')
let divWrapperPopup = document.querySelector('.popup-profile__wrapper')
const divRename = document.querySelector('.board-rename');
let popupProfile = document.querySelector('.popup-profile');


// рисую выподающий список исходя из количества элементов
const initList = () => {

    data.forEach(element => {
        const divWrapper = document.createElement('div');
        const divBoard = document.createElement('div');
        const imgBoard = document.createElement('div');
        imgBoard.classList.add('board-img');

        divWrapper.setAttribute('data-id', element.id);
        divWrapper.classList.add('board-wrapper')
        divBoard.setAttribute('data-id', element.id);
        popupProfile.setAttribute('data-id', element.id);
        // imgBoard.classList.setAttribute('data-id', element.id);
        // const img1 = element.imgLogo;
        imgBoard.style.background = element.imageLogo;
        divBoard.append(element.name);
        divWrapper.append(imgBoard);
        divWrapper.append(divBoard);
        divMyDropdown.append(divWrapper);
    });
}


// ФУНКЦИЯ Доставания массива
export let getArrayBoard = () => {
    // ===================достаем массив из localStorage===============
    const result = localStorage.getItem('board');
    data = JSON.parse(result);
// ================================================================
    return data;
}

// КЛИК По клику на кнопку рисуем список из массива
boardList.addEventListener('click', () => {
    divMyDropdown.innerHTML = '';
    data = getArrayBoard(); // достаем массив
    initList(); // вызов функции отрисовки объектов в выподающем списке
});


// ФУНКЦИЯ========= Забираю ID по таргету========
const getIdBoard = (event) => {
    let id = event.target.dataset.id;
    showBoardProfile(id);
    // return id;
}


// КЛИК========= РИСУЕМ ДОСКУ ПРИ КЛИКЕ========
divMyDropdown.addEventListener('click', (event) => {
    getIdBoard(event);
});
// ========================================


//ФУНКЦИЯ При клике на доску из списка передаётся объект доски
const showBoardProfile = (boardId) => {
    let id = boardId - 1;
    boardProfile(data[id]); // Передача нужного элемента из массива для рисования модального окна
    ButtonClickProfile() // функция вызова модального окна
    // showNameBoardInput(data[id]);

}


//ФУНКЦИЯ Рисую доску по ID в popup
let boardProfile = (profileId) => {
    divWrapperHead.innerHTML = '';

    const imgLogoPopup = document.createElement('div'); // лого
    const titlePopup = document.createElement('div'); // Заголовок
    // const imgWrapper = document.createElement('div'); // обвертка для коллекции картинок
    imgLogoPopup.classList.add('board-img-popup');
    imgLogoPopup.style.backgroundImage = profileId.imageLogo;
    titlePopup.classList.add('popup-profile__title');
    // imgWrapper.classList.add('imgWrapper');
    titlePopup.append(profileId.name);
    titlePopup.append(btnRename);
    divWrapperHead.prepend(titlePopup);  //!!!!!!!!!!!!!
    divWrapperHead.append(divWrapperPopup);
    divWrapperPopup.append(imgLogoPopup);
    const imgWrapper = document.querySelector('.imgWrapper')
    imgWrapper.innerHTML = '';

    // popupProfile.append(imgWrapper);
    console.log(btnRename);


    // отрисовка ПИНОВ
    const declination = ['пин', 'пина', 'пинов']

    function getDeclination(number, txt) {
        let cases = [2, 0, 1, 1, 1, 2];
        return txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }


    const numberPin = document.querySelector('.number-pin')
    numberPin.innerHTML = '';
    const pin = getDeclination(profileId.img.length, declination)
    console.log(numberPin);
    const nubmer = profileId.img.length
    numberPin.append(nubmer, ' ', pin);
    console.log(profileId.img.length);
    profileId.img.forEach(element => {

        const imgCard = document.createElement('div');
        imgCard.classList.add('imgCard');
        imgCard.style.background = element;
        // imgCard.append(element);
        imgWrapper.append(imgCard);

        let height = Math.round(Math.random() * (400 - 320) + 320);
        imgCard.style.height = height + 'px';

    });

}
// ==================================================


// ===================ВЫЗОВ МОДАЛЬНОГО ОКНА=========================
const modalProfile = document.getElementById("modal-window-profile");
const closedProfile = document.getElementById("popup-profile__close");

function ButtonClickProfile() {
    modalProfile.style.display = "block";

    document.querySelector("body").style.overflow = "hidden";

}


closedProfile.onclick = function () {
    modalProfile.style.display = "none";

    document.querySelector("body").style.overflow = "auto";
    divWrapperPopup.innerHTML = '';
}


window.addEventListener('click', (event) => {

    if (event.target === modalProfile) {
        modalProfile.style.display = "none";
        divRename.style.display = "none";
        modalProfile.style.cursor = "zoom-out"
        document.querySelector("body").style.overflow = "auto";
        divWrapperPopup.innerHTML = '';
    }
});
// ===================КОНЕЦ ВЫЗОВ МОДАЛЬНОГО ОКНА=========================


// ======================Редкатирование ДОСКИ из модального окна===================================


const btnRename = document.querySelector('.popup-profile__rename');
// let renameInput = document.getElementsByClassName('.board-rename__input'); // инпут переименования доски


let [renameInput] = modalProfile.getElementsByTagName('input'); // инпут переименования доски


// получение ID по элементу доска и передача номер элемента массива
const getElementArray = () => {
    let id = popupProfile.dataset.id;
    id = id - 1;
    return id;
}

btnRename.addEventListener('click', () => {

    const id = getElementArray();
    // popupProfile.style.display = "none";
    divRename.style.display = "flex";

    renameInput.value = data[id].name; // прорисовка в инпуте "Доска 1" для редактирования


})


// Окно редактирования
const renameBtnClose = modalProfile.querySelector('.board-rename__close');
const renameBtnOK = modalProfile.querySelector('.board-rename__ok');

renameBtnClose.addEventListener('click', () => {

    divRename.style.display = "none";
    // document.querySelector("body").style.overflow = "auto";

});

// КЛИК Изменение имени Доски
renameBtnOK.addEventListener('click', () => {
    const id = getElementArray(); // получаю порядкой номер элемента
    data[id].name = renameInput.value; // Прописываю имя доски в окне редактирования
    let titlePopup = document.querySelector('.popup-profile__title'); // Заголовок

// ===================добавляем массив в localStorage===============
    const stringified = JSON.stringify(data);
    localStorage.setItem('board', stringified);
// ================================================================

    setTimeout(() => {
        titlePopup.innerHTML = data[id].name;  // присваиваю новое имя
        divRename.style.display = "none";
        document.querySelector("body").style.overflow = "auto";
    }, 200);
})
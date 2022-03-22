import {ButtonClick} from "../card-popup/card-popup";
import {getIdBoard, initList} from "../board-creation/board-creation";
import {searchInputTag} from "../header/header";

const parentElement = document.querySelector('.parent');
let idMultiplier = localStorage.getItem("idMultiplier") === null ? 1 : localStorage.getItem("idMultiplier");


// добавляем кнопки карте
const appendCardElements = () => {
    return '<button class="card__button-add--hidden">Сохранить</button>\n' +
        '        <button class="card__button-add-complain--hidden">\n' +
        '            <svg width="17px" height="17px" viewBox="0 0 15 15" class="bi bi-flag" fill="currentColor"\n' +
        '                 xmlns="http://www.w3.org/2000/svg">\n' +
        '                <path fill-rule="evenodd"\n' +
        '                      d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z"/>\n' +
        '            </svg>\n' +
        '        </button>'
}


//генерим картинку в карточку
const generateCardImage = () => {
    let cardImage = document.createElement("div");
    cardImage.classList.add("card__image");

    fetch("https://picsum.photos/300/500").then(response => {
        cardImage.style.background = `url("${response.url}") no-repeat center`;
    });

    cardImage.innerHTML = appendCardElements();
    return cardImage;
}


//создаем рандомного пользователя
const creatRandomUser = () => {
    let cardCommentWrapper = document.createElement('div');
    cardCommentWrapper.classList.add('card-comment_wrapper');

    let cardCommentImg = document.createElement('div');
    cardCommentImg.classList.add('card-comment_img');

    let cardCommentName = document.createElement('div');
    cardCommentName.classList.add('card-comment_name')

    fetch("https://randomuser.me/api/")
        .then(response => response.json())
        .then(data => {
            let datum = data.results[0];
            cardCommentImg.style.background = `url("${datum.picture.thumbnail}") no-repeat center`;
            cardCommentName.textContent = `${datum.name.first} ${datum.name.last}`;
        })
    cardCommentWrapper.append(cardCommentImg, cardCommentName);
    return cardCommentWrapper;
}


//генерим айди
const generateId = () => {
    let id = `id${idMultiplier}`;
    idMultiplier++;
    localStorage.setItem("idMultiplier", idMultiplier);
    return id;
}


// ложим ID карты
const addedIdCard = (item) => {

    initList(item); // рисуем список

    let cardId = document.getElementById(localStorage.getItem("last_card"));
    cardId.addEventListener('click', (event) => {
        getIdBoard(event, imgEl);
    });

    let thisCard = document.getElementById(localStorage.getItem("last_card")); // Получаем нужную карточку
    let firstElementImg = thisCard.firstElementChild; // получаем первый элемент(картинку)
    const imgEl = firstElementImg.style.background;
}


//создаем карточку
function createCard() {
    let card = document.createElement("div");
    card.classList.add("card");
    card.id = generateId();

    let height = Math.round(Math.random() * 290) + 170;
    card.style.gridRowEnd = "span " + Math.round(height / 17);

    let cardImage = generateCardImage();

    cardImage.getElementsByClassName('card__button-add-complain--hidden')[0].addEventListener('click', () => {
        ButtonClick(card);
    });

    card.append(cardImage);

    cardImage.getElementsByClassName('card__button-add--hidden')[0].addEventListener('click', () => {
        localStorage.setItem("last_card", card.id);
        addedIdCard(cardImage)
    });

    if (Math.round(Math.random() * 5) === 4) {
        card.append(creatRandomUser());
    }

    card.append(searchInputTag());
    parentElement.append(card);
}


export function getCardData() {
    if (document.getElementsByClassName("card").length < 1500 &&
        document.querySelector(".search-input_header").value.length === 0) {
        for (let i = 0; i <= 50; i++) {
            createCard()
        }
    }
}

getCardData();





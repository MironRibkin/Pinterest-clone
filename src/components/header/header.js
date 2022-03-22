const searchInputHeader = document.querySelector(".search-input_header");
const deleteButton = document.querySelector(".delete-text_search-input")
const psevdoFilter = document.querySelector('.psevdo-filet');
const serachInputElement = document.querySelector('.search-input_div-wrapper');
const cardHeaderImgWrapper = document.querySelector('.search-input_div-card')
const cardHeaderImgWrapperSecond = document.querySelector('.search-input_div-card_second')
const cards = document.getElementsByClassName("card");

deleteButton.addEventListener('click', () => {
    searchInputHeader.value = "";
    deleteButton.style.display = "none";
})


searchInputHeader.addEventListener('input', () => {
    deleteButton.style.display = searchInputHeader.value.length > 0 ? "block" : "none";
    for (const card of cards) {
        if (!card.lastChild.textContent.includes(searchInputHeader.value)) {
            card.style.display = "none";
        } else {
            card.style.display = "block";
        }
    }
})


searchInputHeader.onclick = () => {
    psevdoFilter.style.display = 'block';
    serachInputElement.style.display = 'block';
}

const creatImgInputHeader = () => {
    for (let i = 0; i < 4; i++) {
        fetch("https://picsum.photos/200/400").then(response => {
            let cardImageInput = document.createElement('div');
            cardImageInput.classList.add('card-header-image');
            cardImageInput.style.background = `url("${response.url}")`;
            cardHeaderImgWrapper.append(cardImageInput)
        })
    }
}

creatImgInputHeader()

const creatPopularPinterestImage = () => {
    for (let i = 0; i < 8; i++) {
        fetch("https://picsum.photos/200/400").then(response => {
            let cardImageInput = document.createElement('div');
            cardImageInput.classList.add('card-header-image');
            cardImageInput.style.background = `url("${response.url}")`;
            cardHeaderImgWrapperSecond.append(cardImageInput)
        })
    }
}

creatPopularPinterestImage()

window.addEventListener('click', (event) => {
    if (event.target === psevdoFilter) {
        psevdoFilter.style.display = "none";
        serachInputElement.style.display = "none";
    }
    if (!Array.from(document.getElementsByClassName("card__button-add--hidden")).includes(event.target) &&
        !Array.from(document.getElementsByClassName("dropdown-content")).includes(event.target) &&
        !Array.from(document.getElementsByClassName('drop-btn')).includes(event.target))
        for (let board of document.getElementsByClassName("toggle-drop")) {
            board.classList.remove("show");
        }
});

// поиск по тегам в инпуте
export const searchInputTag = () => {
    let creatDivElCard = document.createElement('div');
    creatDivElCard.style.display = 'none';
    switch (Math.round(Math.random() * 8)) {
        case 0:
            creatDivElCard.textContent = "доска 1";
            break;
        case 1:
            creatDivElCard.textContent = "доска 2";
            break;
        case 2:
            creatDivElCard.textContent = "доска 3";
            break;
        case 3:
            creatDivElCard.textContent = "доска 4";
            break;
        case 4:
            creatDivElCard.textContent = "доска 5";
            break;
        case 5:
            creatDivElCard.textContent = "доска 6";
            break;
        case 6:
            creatDivElCard.textContent = "доска 7";
            break;
        case 7:
            creatDivElCard.textContent = "доска 8";
            break;
        default:
    }
    return creatDivElCard;
}


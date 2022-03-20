


const btnSave = document.querySelector('.card__button-add--hidden')

btnSave.addEventListener('click', () =>{

})




export const initList = () => { data.forEach(element => {
    const divWrapper = document.createElement('div');
    const divBoard = document.createElement('div');
    const imgBoard = document.createElement('div');
    imgBoard.classList.add('board-img');
    divWrapper.setAttribute('data-id', element.id);
    divWrapper.classList.add('board-wrapper')
    divBoard.setAttribute('data-id', element.id);
    popupProfile.setAttribute('data-id', element.id);
    // const img1 = element.imgLogo;
    imgBoard.style.background = element.imageLogo;
    // console.log(element.imageLogo);
    divBoard.append(element.name);
    divWrapper.append(imgBoard);
    divWrapper.append(divBoard);

    divMyDropdown.append(divWrapper);

    });
    
}
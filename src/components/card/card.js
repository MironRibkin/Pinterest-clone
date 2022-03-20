
const card__image = document.querySelector('.card__image');
const card = document.querySelector('.card');
const modalCard = document.querySelector('.modal-card');
const modalCardImage = document.querySelector('.modal-card__image ');
const modalCardCircle = document.querySelector('modal-card__circle--hover')
const modalCardArrow = document.querySelector('.modal-card__arrow');
const back = document.querySelector('.come-back');
const healthy = document.getElementsByClassName('healthy');
const iconHealthy = document.getElementsByClassName('icon-healthy');
const blockComments = document.querySelector('.modal-card__block-comments');
const cardButtonAdd = document.querySelector('.card__button-add--hidden');
const cardButtonComplain = document.querySelector('.card__button-add-complain--hidden');
const iconHeart = document.getElementsByClassName('icon-likes');
const iconAnswer = document.getElementsByClassName('icon-answer');
const blockCommentContent = document.getElementsByClassName('comment__content')
const formAvatar = document.querySelector('.comment__photo-form');
const buttonsForm = document.querySelector('.buttons__form');
console.log(iconHeart)

const inputComment = document.getElementById('input-form');
const buttonCancel = document.querySelector('.cancel');
const buttonOk = document.querySelector('.ok');
//вытаскиваю bg из карточки чтобы такой же Bg был в попапе
const style = getComputedStyle(card__image)
const bgCard = style.background;


//============Открытие расширенной версии карточки
card__image.addEventListener('click', (event) => { 
   if(event.target !== cardButtonAdd && event.target !== cardButtonComplain) {
      card.style.display = 'none';
      modalCard.style.display = 'flex';
      back.style.display = 'block';
      modalCardImage.style.background = bgCard;
   }
   
})

back.onclick = function () {
   modalCard.style.display = 'none';
   card.style.display = 'block'
   openCloseBlockComm();
   
}


//=========Изменение направления стрелки при клике и открытие блока комментариев

modalCardArrow.addEventListener('click', () =>{
   openCloseBlockComm();
   
});


//============Нажатие на палец вверх

for(let i=0 ; i< healthy.length ; i++) {
healthy[i].addEventListener('click' , ()=> {
   
   iconHealthy[i].classList.toggle('healthy-click');
  
})
}

//Нажатие на сердце
for(let i=0; i<iconHeart.length;i++) {
iconHeart[i].addEventListener('click' , ()=> {
   
   
   iconHeart[i].classList.toggle('heart-click');
})
}


// ======== Закрытие окна при клике в любое место кроме расширенной версии карточки

// window.addEventListener('click' , (event) => {

//    if (!event.target.matches('modalCard')) {
//       modalCard.style.display = 'none';
//       card.style.display = 'block';
//    }
// })


// Функция для закрытия блока комментариев

const openCloseBlockComm = () => {
   blockComments.style.display = 'flex';
   inputComment.style.display = 'flex';
   formAvatar.style.display = 'block';
   buttonsForm.style.display = 'flex'
   modalCardArrow.classList.toggle('modal-card__arrow--coup');
   if(modalCardArrow.classList.contains('modal-card__arrow--coup')){
   blockComments.style.display = 'none';
   inputComment.style.display = 'none';
   formAvatar.style.display = 'none';
   buttonsForm.style.display = 'none';
   }
}

//=========Клик на инпут открывает кнопки

inputComment.addEventListener('click', () => {
    buttonCancel.style.display = 'block';
    buttonOk.style.display = 'block'; 

})

// при заполнении инпута кнопка меняет цвет на красный

inputComment.addEventListener('input' , () => {
   buttonOk.classList.remove('ok-click');
   if(inputComment.value) {
      buttonOk.classList.add('ok-click');
      
   }
   
   

})

// функция которая делает кнопку неактивной если там ничего нету

const deactivateButton = () => {
if(!inputComment.value) {
      buttonOk.setAttribute = ('disabled',true);
      
   }
   else {
      buttonOk.removeAttribute = ('disabled',true);
   }
}

//при клике на форму меняем border-radius

inputComment.addEventListener('click' , () => {
   inputComment.classList.add('comment__text-conteiner-click');
})

// при клике на кнопку отмена , фокус с инпута падает
buttonCancel.addEventListener('click' , () => {
   inputComment.classList.remove('comment__text-conteiner-click');
   inputComment.value = '';
})

// при клике на кнопку окей создается комментарий

buttonOk.addEventListener('click' , () => {
   
   const divCommentsUser = document.createElement('div');
   const commentTextUser = document.createElement('div');
   const commentTextComment = document.createElement('div');
   // const fullBlockComment = document.createElement('div');
   

   // const formAvatar = document.createElement('div');
   // blockComments.classList.add('form-conteiner');
   // formAvatar.classList.add('comment__photo-form');
   divCommentsUser.classList.add('comment__text-conteiner-form');
   // fullBlockComment.classList.add('form-conteiner');
  
  
   commentTextUser.innerText = 'Sacha';
   commentTextComment.innerText = inputComment.value;

   divCommentsUser.append(commentTextUser);
   divCommentsUser.append(commentTextComment);
   blockComments.append(divCommentsUser);
   

   

   // blockComments.append(formAvatar);

   // fullBlockComment.append(blockComments)
   // fullBlockComment.append(formAvatar);
   inputComment.value = '';
   buttonOk.classList.remove('ok-click');
   deactivateButton();
   
})



// при клике на кнопку ответить открывается форма для ответа
const buttonOkForm = document.createElement('button');
const buttonCancelForm = document.createElement('button');
buttonOkForm.classList.add('button-ok-form-answer');
buttonOkForm.innerText = 'Отправить';

buttonCancelForm.classList.add('button-cancel-form-answer');
buttonCancelForm.innerText = 'Отмена';
for(let i=0 ; i<iconAnswer.length; i++) {
iconAnswer[i].addEventListener('click' , () => {
      buttonCancelForm.style.display = 'block';
      buttonOkForm.style.display = 'block';
   if(formAnswer) {
      console.log(formAnswer);
      formAnswer.remove();

   }

   
   const formAnswer = document.createElement('input');
   formAnswer.placeholder = 'Введите ответ';
   formAnswer.classList.add('comment__text-conteiner');
   blockCommentContent[i].append(formAnswer);
   blockCommentContent[i].append(buttonOkForm);
   blockCommentContent[i].append(buttonCancelForm);
   
   formAnswer.addEventListener('input' , () => {
      buttonOkForm.classList.add('button-ok-form-answer-click');
      if(!formAnswer.value) {
         buttonOkForm.classList.remove('button-ok-form-answer-click');
      }
   })


   //при клике на кнопку отмена в форме ответа , инпут и кнопки закрываются
   buttonCancelForm.addEventListener('click' , () => {
      formAnswer.value = '';
      formAnswer.style.display = 'none'
      buttonCancelForm.style.display = 'none';
      buttonOkForm.style.display = 'none';

   })
   
   // blockCommentContent[i].append(buttonCancel);
   // blockCommentContent[i].append(buttonOk);
  

})
}

// заполнение из api имен пользователей
const usernameCommentator = document.getElementsByClassName('comment__text-user');


fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(json => {
     for(let i =0 ; i< usernameCommentator.length;i++) {
        const {name} = json[i];
        usernameCommentator[i].innerText = name;
     }
  })

  // заполнение из api комментариев

  const commentsApi = document.getElementsByClassName('comment__text-comment');
  fetch('https://jsonplaceholder.typicode.com/comments')
  .then(response => response.json())
  .then(json => {
   for(let i =0 ; i< commentsApi.length;i++) {
      const {name} = json[i];
      commentsApi[i].innerText = name;
   }
  })


  // заполнение из api аватаров

// const commentPhoto = document.getElementsByClassName('comment__photo');
//   fetch('https://jsonplaceholder.typicode.com/photos')
//   .then(response => response.json())
//   .then(json =>  {
//    for(let i =0 ; i< commentPhoto.length;i++) {
//       const {url} = json[i];

//       commentPhoto[i].url = url;
      
//    }
//   })


















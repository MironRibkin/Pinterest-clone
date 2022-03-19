const saveBtn = document.querySelector('.save-button')
saveBtn.addEventListener('click'() => {
    document.getElementById('save-button').classList.toggle('show')
})
let data = [];  
    const board = {}; 
    board.name = 'Доска 1';
    data.push(board);
    const stringified = JSON.stringify(data);
    localStorage.setItem('board', stringified);

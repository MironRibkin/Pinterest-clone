const dropButton = document.querySelector(".drop-btn");

dropButton.addEventListener('click', () => {
    document.getElementById('myDropdown').classList.toggle('show')
})

window.onclick = event => {
    if (!event.target.matches('.drop-btn')) {
        let dropdowns = document.getElementsByClassName('dropdown-content');
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
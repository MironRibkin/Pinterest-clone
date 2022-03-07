const searchInputHeader = document.querySelector(".search-input_header");
const deleteButton = document.querySelector(".delete-text_search-input")

deleteButton.addEventListener('click', () => {
    searchInputHeader.value = "";
    deleteButton.style.display = "none";
})
searchInputHeader.addEventListener('input', () => {
    deleteButton.style.display = searchInputHeader.value.length > 0 ? "block" : "none";
})
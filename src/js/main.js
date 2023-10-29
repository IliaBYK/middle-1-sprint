const cards = document.querySelectorAll('.chats__card');

cards.forEach(card => card.addEventListener("click", () => {
  cards.forEach(item => item.classList.remove("chats__card_focus"))
  card.classList.toggle('chats__card_focus');
}))

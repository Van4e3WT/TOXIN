document.addEventListener('DOMContentLoaded', () => {
  let drops = document.querySelectorAll('.dropdown-checkbox');

  drops.forEach(item => {
    item.addEventListener('click', () => {
      item.querySelector('.dropdown-checkbox__title').classList.toggle('active');
    });
  });
});
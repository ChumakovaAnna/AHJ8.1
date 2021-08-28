function collapse() {
  const button = document.querySelector('.button-collapse');
  const eleCollapse = document.querySelector('.collapse');

  button.addEventListener('click', () => {
    eleCollapse.classList.toggle('active');
  });
}

collapse();

const toggleNav = () => {
  const nav = document.getElementById('nav');
  const { display } = nav.style;

  if (display === 'none') {
    nav.style.display = 'block';
  } else {
    nav.style.display = 'none';
  }
};

const notifyDetails = () => {
  const details = document.getElementById('notifyDetails');

  details.innerHTML = 'Details will be made available after May 6th';

  setTimeout(() => details.innerHTML = '', 9000);
};


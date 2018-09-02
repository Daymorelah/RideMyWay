
const navMenu = document.getElementById('nav-menu');
const topNav = document.getElementById('nav-top-nav');

navMenu.addEventListener('click', () => {
  if (topNav.classList) {
    topNav.classList.toggle('open');
  } else {
    // For IE9
    const arrayOfClasses = topNav.className.split(' ');
    const openClassIndex = arrayOfClasses.indexOf('open');
    if (openClassIndex >= 0) arrayOfClasses.splice(openClassIndex, 1);
    else {
      arrayOfClasses.push('open');
      topNav.className = arrayOfClasses.join(' ');
    }
  }
});

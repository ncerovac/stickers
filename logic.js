// Load the hero image
var hero = new Image();

hero.onload = function () {
  var phone = document.getElementById('phone'),
      tiny = phone.children[0];
  hero.style.opacity = 0;
  phone.appendChild(hero);
  setTimeout(function () {
    tiny.style.opacity = 0;
    hero.style.opacity = 1;
    setTimeout(function () {
      tiny.remove();
    }, 630);
  }, 10);
};

hero.src = 'hero.png';

// Add form handlers

var form = document.getElementById('form'),
    packages = form.querySelectorAll('input[name="package"]'),
    nameInput = form.querySelector('input[name="name"]'),
    emailInput = form.querySelector('input[name="email"]'),
    button = form.querySelector('button[type="submit"]'),
    i = 0,
    n = packages.length;

function handlePackage() {
  form.className = 'active';
  nameInput.focus();
}

function handleNameKeyPress(e) {
  if (e.keyCode == 13) {
    emailInput.focus();
  }
}

function handleEmailKeyPress(e) {
  if (e.keyCode == 13) {
    button.focus();
  }
}

function handleFormSubmit(e) {
  e.preventDefault();

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://zapier.com/hooks/catch/1445143/43bfhn/');

  xhr.onreadystatechange = function(e) {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById('order').style.display = 'none';
      document.getElementById('order-success').style.display = 'block';
      fbq('track', 'CompleteRegistration');
    }
  };

  var content = JSON.stringify({
    package: form.querySelector('input[name="package"]:checked').value,
    name: nameInput.value,
    email: emailInput.value
  });

  xhr.send(content);
}

while (i < n) {
  packages[i].onclick = handlePackage;
  i++;
}

nameInput.onkeydown = handleNameKeyPress;
emailInput.onkeydown = handleEmailKeyPress;

form.onsubmit = handleFormSubmit;

form.attributes['onSubmit'] = null;

// Initialize start button

document.getElementById('start').onclick = function () {
  fbq('track', 'Lead');
  document.getElementById('order').scrollIntoView();
}
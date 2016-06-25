// Load the hero image
var hero = new Image(),
    phone = document.getElementById('phone') || document.getElementById('phone-brexit'),
    tiny = phone.children[0];

hero.onload = function () {
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

hero.src = phone.id === 'phone-brexit' ? 'hero-brexit.png' : 'hero.png';

// Add form handlers

try {
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
      //event triger submit for GA
      ga('send', 'event', 'Button', 'submit', 'Request Sticker');
      //mixpanel track req and person
      mixpanel.track("Make Me Sticker Button", {"Name": nameInput.value, "Email" : emailInput.value, "Package" : form.querySelector('input[name="package"]:checked').value});
      mixpanel.people.set({
        "$email": emailInput.value, // only special properties need the $
        "name": nameInput.value
      });
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
} catch (e) {}

// Add subscribe form handlers

try {
var subscribeForm = document.getElementById('subscribe-form'),
    subscribeEmailInput = subscribeForm.querySelector('input[name="email"]'),
    subscribeButton = subscribeForm.querySelector('button[type="submit"]');

function handleSubscribeFormSubmit(e) {
  e.preventDefault();

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://hooks.zapier.com/hooks/catch/1445143/446uuc/');

  xhr.onreadystatechange = function(e) {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById('subscribe').style.display = 'none';
      document.getElementById('subscribe-success').style.display = 'block';
      //event triger submit for GA
      ga('send', 'event', 'Button', 'submit', 'Request Brexit Stickers');
      //mixpanel track req and person
      mixpanel.track("Send Me Brexit Stickers Button", {"Email" : subscribeEmailInput.value});
      mixpanel.people.set({
        "$email": subscribeEmailInput.value // only special properties need the $
      });
    }
  };

  var content = JSON.stringify({
    email: subscribeEmailInput.value
  });

  xhr.send(content);
}

subscribeForm.onsubmit = handleSubscribeFormSubmit;

subscribeForm.attributes['onSubmit'] = null;

} catch (e) {}
// Initialize start button

document.getElementById('start').onclick = function () {
  //send event triger to FB
  fbq('track', 'Lead');
  //send event triger to GA
  ga('send', 'event', 'Button', 'lead', 'Request Info');
  //send triggere to mixpannel
  mixpanel.track("Get In Touch Button", {"Button Location": "Top"});
  var order = document.getElementById('order'),
      subscribe = document.getElementById('subscribe');

  (order || subscribe).scrollIntoView();
}

document.getElementById('dwnl-telegram').onclick = function () {
  //send event triger to FB
  fbq('track', 'AddToCart');
  //send event triger to GA
  ga('send', 'event', 'Button', 'download', 'Download Telegram');
  //send triggere to mixpannel
  mixpanel.track("Download Telegram Stickers");
}

document.getElementById('cust-sticker-btn').onclick = function () {
  //send event triger to GA
  ga('send', 'event', 'Button', 'lead', 'From Brexit to Custom Stickers');
  //send triggere to mixpannel
  mixpanel.track("From Brexit To Custom Stickers");
}




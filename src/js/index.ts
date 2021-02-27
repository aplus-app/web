// @ts-nocheck

import { component } from 'lucia';
import identity from 'netlify-identity-widget';
identity.init();

const app = component({
  loggedIn: false,
  currentPostTitle: '',
  currentPostBody: '',
  posts: [],
  getUser(): boolean {
    return identity.currentUser();
  },
  identifyAction() {
    if (this.loggedIn) {
      identity.logout();
    } else {
      identity.open();
    }
  },
  createPost({ title, body }) {
    const user = getUser();
    const payload = {
      name: user.user_metadata.full_name,
      id: user.id,
      title,
      body,
    };
  },
  __init() {
    this.loggedIn = !!this.getUser();
  },
});
app.mount('#app');

app.state.__init();

identity.on('login', (user) => {
  console.log(user);
  app.state.loggedIn = true;
});
identity.on('logout', () => {
  app.state.loggedIn = false;
});

// Mobile Menu

let userBtn = document.querySelector('#user-btn');
let userMenu = document.querySelector('#user-menu');
let mobileMenu = document.querySelector('#mobile-menu');
let mobileMenuBtn = document.querySelector('#mobile-menu-button');

userBtn.addEventListener('click', function () {
  if (userMenu.classList.contains('hidden')) {
    userMenu.classList.remove('hidden');
  } else {
    setTimeout(() => userMenu.classList.add('hidden'), 100);
  }
  setTimeout(() => userMenu.classList.toggle('hidden-custom'), 20);
});

document.addEventListener(
  'click',
  function (e) {
    if (e.target.closest('#user-menu') || e.target.closest('#user-btn')) return;
    if (!userMenu.classList.contains('hidden-custom')) {
      userMenu.classList.add('hidden-custom');
      setTimeout(() => userMenu.classList.add('hidden'), 100);
    }
  },
  false
);

mobileMenuBtn.addEventListener('click', function () {
  mobileMenu.classList.toggle('hidden');
  this.getElementsByTagName('svg')[0].classList.toggle('hidden');
  this.getElementsByTagName('svg')[1].classList.toggle('hidden');
});

// identity.open(); // open the modal
// identity.open('login'); // open the modal to the login tab
// identity.open('signup'); // open the modal to the signup tab

// identity.on('init', (user) => console.log('init', user));
// identity.on('login', (user) => console.log('login', user));
// identity.on('logout', () => console.log('Logged out'));
// identity.on('error', (err) => console.error('Error', err));
// identity.on('open', () => console.log('Widget opened'));
// identity.on('close', () => console.log('Widget closed'));

// // Unbind from events
// identity.off('login'); // to unbind all registered handlers
// identity.off('login', () => {}); // to unbind a single handler

// // Close the modal
// identity.close();

// // Log out the user
// identity.logout();

// // refresh the user's JWT
// // Note: this method returns a promise.
// identity.refresh().then((jwt) => console.log(jwt));

// // Change language
// identity.setLocale('en');

// // Access the underlying GoTrue JS client.
// // Note that doing things directly through the GoTrue client brings a risk of getting out of
// // sync between your state and the widget’s state.
// // @ts-expect-error
// identity.gotrue;

// @ts-nocheck

import { component, init } from 'lucia';
import identity from 'netlify-identity-widget';
import marked from 'marked';
import DOMPurify from 'dompurify';
identity.init();

const app = component({
  DOMPurify,
  marked,
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
    const user = this.getUser();
    if (!user) alert('You cannot use this method');
    const payload = {
      name: user.user_metadata.full_name,
      id: user.id,
      title,
      body,
    };
    closeModal();
    this.posts.unshift(payload);
  },
  __init() {
    this.loggedIn = !!this.getUser();
    document.querySelector('#user-btn').innerText = this.getUser()?.user_metadata?.full_name;
  },
});
app.mount('#app');

app.state.__init();

identity.on('login', (user) => {
  app.state.loggedIn = true;
  document.querySelector('#user-btn').innerText = user?.user_metadata?.full_name;
});
identity.on('logout', () => {
  app.state.loggedIn = false;
  identity.open();
});
identity.on('close', () => {
  if (app.state.loggedIn === true) return;
  identity.open();
});

// Mobile Menu

let userBtn = document.querySelector('#user-btn');
let userMenu = document.querySelector('#user-menu');
let mobileMenu = document.querySelector('#mobile-menu');
let mobileMenuBtn = document.querySelector('#mobile-menu-button');
let createPostBtn = document.querySelector('#create-post');
let cancelPostBtn = document.querySelector('#cancel-post');
let postModal = document.querySelector('#post-modal');

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

createPostBtn.addEventListener('click', function () {
  postModal.classList.remove('hidden');
  setTimeout(() => {
    document.querySelector('#post-modal-inner').classList.remove('hidden-custom');
    document.querySelector('#post-modal-bg').classList.remove('hidden-custom');
  }, 20);
});

function closeModal() {
  document.querySelector('#post-modal-inner').classList.add('hidden-custom');
  document.querySelector('#post-modal-bg').classList.add('hidden-custom');
  setTimeout(() => postModal.classList.add('hidden'), 100);
}

cancelPostBtn.addEventListener('click', () => closeModal());

init();
if (!app.state.loggedIn) identity.open();

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

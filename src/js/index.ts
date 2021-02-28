// @ts-nocheck

import { component, init } from 'lucia';
import identity from 'netlify-identity-widget';
import marked from 'marked';
import DOMPurify from 'dompurify';
identity.init();
const API_URL = 'https://aplus-server.net';

fetch(`${API_URL}/get/posts`)
  .then((res) => res.json())
  .then((POSTS) => {
    const app = component({
      POSTS,
      API_URL,
      DOMPurify,
      marked,
      searchQuery: '',
      loggedIn: false,
      currentPostTitle: '',
      currentPostBody: '',
      originalPosts: [],
      latestPosts: [],
      trendingPosts: [],
      mode: 'trending',
      amountLoaded: 5,
      posts: [
        ...POSTS.posts.slice(0, 5),
        {
          user_name: 'Aiden Bai',
          user_id: 'aidenbai',
          title: 'Happy Birthday to señorita Juanita',
          body: `Let's all wish señorita Juanita a happy birthday!! She's an phenomenal teacher. ![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/4d78da3e-748d-414a-9a12-54bee2e8d5a1/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210228T041020Z&X-Amz-Expires=86400&X-Amz-Signature=c911bbc7ef25b508d1126c9a9d651f3517f2484423b534a4939b0cc1223eb604&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)`,
          hearts: 20,
          id: 1,
          heartedByUser: localStorage.example1,
          category: 'foreign language',
          comments: [
            {
              id: 1,
              post_id: '1',
              user_name: 'señorita Juanita',
              body: '¡Gracias chico!',
            },
            { id: 2, post_id: '1', user_name: 'Vera Wyman', body: '¡Feliz cumpleaños señorita!' },
            {
              id: 3,
              post_id: '1',
              user_name: 'Gretchen Klocko',
              body: '¡Feliz cumpleaños señorita!',
            },
            { id: 4, post_id: '1', user_name: 'Elbert Mills', body: '¡Feliz cumpleaños señorita!' },
            {
              id: 5,
              post_id: '1',
              user_name: 'Jeremiah Okuneva',
              body: '¡Feliz cumpleaños señorita!',
            },
            {
              id: 6,
              post_id: '1',
              user_name: 'Jennie Jenkins',
              body: '¡Feliz cumpleaños señorita!',
            },
            {
              id: 7,
              post_id: '1',
              user_name: 'Bryant Daniel',
              body: '¡Feliz cumpleaños señorita!',
            },
            {
              id: 8,
              post_id: '1',
              user_name: 'Bradford Spinka',
              body: '¡Feliz cumpleaños señorita!',
            },
            { id: 9, post_id: '1', user_name: 'Lila Jast', body: '¡Feliz cumpleaños señorita!' },
          ],
        },
        {
          user_name: 'Aiden Bai',
          user_id: 'aidenbai',
          title: '5.3 #16 for Edwards',
          body: `I tried using addition, but there's this weird "-" sign. Anybody know what this means? Here is a picture of the work I have now:
            ![](https://i.ytimg.com/vi/jGMRLLySc4w/maxresdefault.jpg)
          `,
          hearts: 3,
          id: 2,
          heartedByUser: localStorage.example1,
          category: 'math',
          comments: [],
        },
        {
          user_name: 'Melinda Chang',
          user_id: 'melindachang',
          title: 'Tips for Abraham',
          body: `Edwards is a great teacher, but sometimes her grading can be really hard. I strongly recommend following these three tips:
            - Be nice to her
            - Show all your work
            - Talk to her if you need help
          `,
          hearts: 100,
          id: 3,
          heartedByUser: localStorage.example2,
          category: 'history',
          comments: [],
        },
        {
          user_name: 'Will Lane',
          user_id: 'willlane',
          title: "Newton's second law",
          body: `Yesterday I discovered that newton's second law is net Force = mass * acceleration! Ain't that neat.`,
          hearts: 5,
          id: 4,
          heartedByUser: localStorage.example3,
          category: 'science',
          comments: [],
        },
        {
          user_name: 'Tejas Agarwal',
          user_id: 'tejasagarwal',
          title: 'Survey form',
          body: `Hi! I'm part of the DECA club, wondering if anybody would be willing to fill it out if you are in Freshman English: [https://example.com](https://example.com).`,
          hearts: 10,
          id: 5,
          heartedByUser: localStorage.example4,
          category: 'english',
          comments: [],
        },
      ],
      userHearts: 0,
      topUsers: [],
      i: 0,
      currentCommentText: '',
      comments: [],
      select: '',
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
      createComment(data) {
        this.posts[this.i].comments.push({ ...data, post_id: String(this.posts[this.i].id) });
        this.comments = [...this.posts[this.i].comments];

        fetch(`${API_URL}/create-comment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify({
            post_id: String(this.posts[this.i].id),
            body: this.currentCommentText,
            user_name: this.getUser().user_metadata.full_name,
          }),
        });
      },
      createPost({ title, body }) {
        const user = this.getUser();
        if (!user) return alert('You cannot use this method');
        const category = ((this.select + title + body).match(
          /math|science|english|foreign language|history/gim
        ) || ['all'])[0];

        const payload = {
          category: category,
          user_name: user.user_metadata.full_name,
          user_id: user.id,
          title: title,
          body: body,
        };
        closeModal();
        this.originalPosts = [payload, ...this.originalPosts];
        this.posts = [payload, ...this.posts];
        this.latestPosts = [payload, ...this.latestPosts];
        this.trendingPosts = [payload, ...this.trendingPosts];

        fetch(`${API_URL}/create-post`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(payload),
        });
      },
      __init() {
        this.loggedIn = !!this.getUser();

        if (!this.loggedIn) identity.open();
        document.querySelector('#user-btn').innerText = this.getUser()?.user_metadata?.full_name;
      },
      openReport() {
        document.querySelector('#report-modal').classList.remove('hidden');
        setTimeout(() => {
          document.querySelector('#report-modal-inner').classList.remove('hidden-custom');
          document.querySelector('#report-modal-bg').classList.remove('hidden-custom');
        }, 20);
        // TODO: Add reporting
      },
      reportPost() {
        alert('Post flagged for further review.');
      },
      closeReport() {
        document.querySelector('#report-modal-inner').classList.add('hidden-custom');
        document.querySelector('#report-modal-bg').classList.add('hidden-custom');
        setTimeout(() => document.querySelector('#report-modal').classList.add('hidden'), 100);
      },
      openCard(i) {
        // if (e.target.closest('#like-container') || e.target.closest('#report-button')) return;
        this.i = i;
        this.comments = [...this.posts[this.i].comments];

        document.querySelector('#card-modal').classList.remove('hidden');
        setTimeout(() => {
          document.querySelector('#card-modal-inner').classList.remove('hidden-custom');
          document.querySelector('#card-modal-bg').classList.remove('hidden-custom');
        }, 20);
      },
      closeCard() {
        document.querySelector('#card-modal-inner').classList.add('hidden-custom');
        document.querySelector('#card-modal-bg').classList.add('hidden-custom');
        setTimeout(() => document.querySelector('#card-modal').classList.add('hidden'), 100);
      },
      saveToLocal() {
        localStorage.local = JSON.stringify(this.originalPosts);
      },
    });
    app.mount('#app');

    try {
      app.state.originalPosts = [...app.state.posts];
      app.state.latestPosts = [...app.state.posts];
      app.state.trendingPosts = [...app.state.posts];
      app.state.trendingPosts.sort((post1, post2) => post2.hearts - post1.hearts);
      app.state.topUsers = app.state.trendingPosts.slice(0, 3);

      for (const post of [...app.state.trendingPosts]) {
        if (post.id === app.state.getUser().id) app.state.userHearts += post.hearts;
      }

      app.state.posts = app.state.trendingPosts;
    } catch (err) {
      console.error(err);
    }
    app.state.__init();

    identity.on('close', () => {
      if (app.state.loggedIn === true) return;
      identity.open();
    });

    identity.on('login', (user) => {
      app.state.loggedIn = true;
      document.querySelector('#user-btn').innerText = user?.user_metadata?.full_name;
    });
    identity.on('logout', () => {
      app.state.loggedIn = false;
      identity.open();
    });
    // Mobile Menu

    // function openReport() {
    //   document.querySelector('#report-modal').classList.remove('hidden');
    //   setTimeout(() => {
    //     document.querySelector('#report-modal-inner').classList.remove('hidden-custom');
    //     document.querySelector('#report-modal-bg').classList.remove('hidden-custom');
    //   }, 20);
    // }

    // function closeReport() {
    //   document.querySelector('#report-modal-inner').classList.add('hidden-custom');
    //   document.querySelector('#report-modal-bg').classList.add('hidden-custom');
    //   setTimeout(() => document.querySelector('#report-modal').classList.add('hidden'), 100);
    // }

    let userBtn = document.querySelector('#user-btn');
    let userMenu = document.querySelector('#user-menu');
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

    document.querySelector('#sign-out').addEventListener('click', function () {
      setTimeout(() => userMenu.classList.add('hidden'), 100);
      setTimeout(() => userMenu.classList.add('hidden-custom'), 20);
    });

    // mobileMenuBtn.addEventListener('click', function () {
    //   mobileMenu.classList.toggle('hidden');
    //   this.getElementsByTagName('svg')[0].classList.toggle('hidden');
    //   this.getElementsByTagName('svg')[1].classList.toggle('hidden');
    // });

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

    document.querySelectorAll('#sort').forEach(function (el) {
      el.addEventListener('click', function () {
        if (el.classList.contains('selected')) return;
        document.querySelector('#sort.selected').classList.add('hover:bg-gray-100');
        document.querySelector('#sort.selected').classList.remove('selected');

        el.classList.remove('hover:bg-gray-100');
        el.classList.add('selected');
      });
    });

    document.querySelectorAll('#subject').forEach(function (el) {
      el.addEventListener('click', function () {
        if (el.classList.contains('selected')) return;

        document.querySelector('#subject.selected').classList.add('hover:bg-gray-100');
        document.querySelector('#subject.selected').classList.remove('selected');

        el.classList.add('selected');
        el.classList.remove('hover:bg-gray-100');
      });
    });

    // document.querySelector('#unheart').forEach(addEventListener('click', function() {
    //   this.classList.toggle('hidden');
    //   this.nextSibling.classList.toggle('hidden');
    // }))

    // document.querySelector('#heart').forEach(addEventListener('click', function() {
    //   this.classList.toggle('hidden');
    //   this.previousSibling.classList.toggle('hidden');
    // }))

    init();

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
  });

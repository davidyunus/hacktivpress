<template>
  <div class="home d-flex justify-content-center">
    <div>
      <form>
        <div class="form-group">
          <h3>Login</h3>
          <input type="text" v-model="usernameLogin" class="form-control" placeholder="Username">
        </div>
        <div class="form-group">
          <input type="password" v-model="passwordLogin" class="form-control" placeholder="Password">
        </div>
        <button type="submit" @click="login" class="btn btn-primary">Login</button>
        <button type="submit" @click="loginFB" class="btn btn-primary">Facebook Login</button>
      </form>
      
    </div>

    <div class="break"></div>

    <div>
      <form>
        <div class="form-group">
          <h3>Register</h3>
          <input type="text" v-model="username" class="form-control" placeholder="Username">
        </div>
        <div class="form-group">
          <input type="text" v-model="name" class="form-control" placeholder="Name">
        </div>
        <div class="form-group">
          <input type="password" v-model="password" class="form-control" placeholder="Password">
        </div>
        <button type="submit" @click="register" class="btn btn-primary">Register</button>
      </form>
    </div>
  </div>
</template>

<script>

import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data () {
    return {
      username: '',
      name: '',
      password: '',
      usernameLogin: '',
      passwordLogin: ''
    }
  },
  methods: {
    register: function () {
      let payload = {
        username: this.username,
        name: this.name,
        password: this.password
      }

      this.$store.dispatch('register', payload)
        .then(register => {
          this.$router.push('/about')
        })
        .catch((err) => {
          alert('please fill all fields')
        })
    },
    login: function () {
      let payload = {
        username: this.usernameLogin,
        password: this.passwordLogin
      }

      this.$store.dispatch('login', payload)
        .then((login) => {
          this.$router.push('/about')
        })
        .catch((err) => {
          alert('username or password wrong')
        })
    },
    loginFB: function() {
      function statusChangeCallback(response) {
          console.log('statusChangeCallback');
          console.log(response);
          
          if (response.status === 'connected') {
            testAPI();
          } else {
            document.getElementById('status').innerHTML = 'Please log ' +
              'into this app.';
          }
        }

      function checkLoginState() {
        FB.getLoginStatus(function(response) {
          statusChangeCallback(response);
        });
      }

      window.fbAsyncInit = function() {
        FB.init({
          appId      : '2371462316198047',
          cookie     : true,  // enable cookies to allow the server to access 
                              // the session
          xfbml      : true,  // parse social plugins on this page
          version    : 'v2.8' // use graph api version 2.8
        });

        FB.getLoginStatus(function(response) {
          statusChangeCallback(response);
        });

      };

      // Load the SDK asynchronously
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));

      // Here we run a very simple test of the Graph API after login is
      // successful.  See statusChangeCallback() for when this call is made.
      function testAPI() {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function(response) {
          console.log('Successful login for: ' + response.name);
          document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
        });
      }
    }
  },
  created () {
    let token = localStorage.getItem('token')

    if (token) {
      this.$router.push('/about')
    }
  }
}
</script>

<style>
div .break {
  width: 100px;
}

h3 {
  color: blue;
}

button {
  margin: 10px;
}
</style>

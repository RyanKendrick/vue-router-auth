<!-- Login page markup -->
<template>
  <div>
    <h4>Login</h4>
    <form>
      <label for="email"> E-Mail </label>
      <div>
        <input id="email" type="email" v-model="email" required autofocus>
      </div>
      <div>
        <label for="password">Password</label>
        <div>
          <input id="password" type="password" v-model="password" required>
        </div>
      </div>
      <div>
        <button type="submit" @click="handleSubmit">
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<!-- Script that handles the login submission - the email and password data attributes bound to the form fields to collect user input. We made a request to the server to authenticate the credentials the user supplies. -->
<script>
  export default {
    data() {
      return {
        email: "",
        password: ""
      }
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault()
        if (this.password.length > 0) {
          this.$http.post('http://localhost:3000/login', {
            email: this.email,
            password: this.password
          })
          // server response: We store the jwt token and user information in localStorage so we can access it from all parts of our application. Of course, we redirect the user to whichever part of our application they tried to access before being redirected to login
          .then(response => {
            let is_admin = response.data.user.is_admin
            localStorage.setItem('user', JSON.stringify(response.data.user))
            localStorage.setItem('jwt', response.data.token)

            if (localStorage.getItem('jwt') != null) {
              this.$emit('loggedIn')
              if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl)
              }
              else {
                if (is_admin == 1) {
                  this.$router.push('admin')
                } else {
                  this.$router.push('dashboard')
                }
              }
            }
          })
          .catch(function (error) {
            console.error(error.response);
          });
        }
      }
    }
  }
</script>

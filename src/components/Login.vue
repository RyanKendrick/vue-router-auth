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

<!-- Script that handles the login submission -->
<!-- the email and password data attributes bound to the form fields to collect user input. We made a request to the server to authenticate the credentials the user supplies. -->
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
          .then(response => {

          })
          .catch(function (error) {
            console.error(error.response);
          });
        }
      }
    }
  }
</script>

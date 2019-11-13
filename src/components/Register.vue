<template>
  <div>
    <h4>Register</h4>
    <form>
      <label for="name">Name</label>
      <div>
        <input id="name" type="text" v-model="name" required autofocus>
      </div>

      <label for="email">E-Mail Address</label>
      <div>
        <input for="email" type="email" v-model="email" required>
      </div>

      <label for="password">Password</label>
      <div>
        <input id="password" type="password" v-model="password" required>
      </div>

      <label for="password-confirm">Confirm Password</label>
      <div>
        <input id="password-confirm" type="password" v-model="password_confirmation" required>
      </div>

      <label for="password-confirm">Is this an administrator account?</label>
      <div>
        <select v-model="is_admin">
          <option value=1>Yes</option>
          <option value=0>No</option>
        </select>
      </div>

      <div>
        <button type="submit" @click="handleSubmit">
          Register
        </button>
      </div>
    </form>
  </div>
</template>

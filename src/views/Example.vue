<template>
    <form @submit.prevent="submit">
      <input 
        type="email" 
        :class="{errorBoarder: $v.email.$error}"
        placeholder="What's your email?" 
        v-model="email"
        @blur="$v.email.$touch()">
      <button :disabled="$v.$invalid" type="submit">Submit</button>
      <p v-if="$v.$anyError" class="errorMessage">Please fill out the required fields:</p>
      <div v-if="$v.email.$error">
        <p v-if="!$v.email.email" class="errorMessage">Please enter a valid e-mail</p>
        <p v-if="!$v.email.required" class="errorMessage">Email is required</p>
      </div>
    </form>
</template>

<script>
import { required, email} from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      email: null
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    submit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        console.log('Form submitted: ', this.email)
      }
    }
  }
}
</script>


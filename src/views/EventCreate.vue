<template>
  <div>
    <h1>Create an event</h1>
      <form @submit.prevent="createEvent" @click="addCat">
        <!-- update custom api!!!!!!!!!! -->
        <BaseSelect
          label="Select a category" 
          v-model="event.category" 
          :options="categories" 
          :custom=false 
          @blur="$v.event.category.$touch()" 
          :class="{ errorBoarder: $v.event.category.$error }"
        />
        <template v-if="$v.event.category.$error">
          <p v-if="!$v.event.category.required" class="errorMessage">Category is required.</p>
        </template>

        <div v-show="newCatSelected">
          <form class="nextSelection" @submit.prevent="submitCat">
            <input id="input1" placeholder="New category" v-model="event.category" name="yes"/>
            <button class="temp-button" type="submit">+</button>
          </form>
        </div>
        
        <h3>Name & describe your event</h3>

        <BaseInput 
          class="field" 
          :class="{ errorBoarder: $v.event.title.$error }"
          label="Title" 
          type="text" 
          v-model="event.title" 
          placeholder="Title"
          @blur="$v.event.title.$touch()"
        />
        
        <template v-if="$v.event.title.$error">
          <p v-if="!$v.event.title.required" class="errorMessage">Title is required.</p>
        </template>


        <BaseInput 
          class="field" 
          label="Description" 
          type="text" 
          v-model="event.description" 
          placeholder="Add a description"
          @blur="$v.event.description.$touch()"
          :class="{ errorBoarder: $v.event.description.$error }"
        />

        <template v-if="$v.event.description.$error">
          <p v-if="!$v.event.description.required" class="errorMessage">Title is required.</p>
        </template>

        <h3>Where is your event?</h3>

        <BaseInput 
          class="field" 
          label="Location" 
          type="text" 
          v-model="event.location" 
          @blur="$v.event.location.$touch()"
          placeholder="Add a location"
          :class="{ errorBoarder: $v.event.location.$error }"
        />

        <template v-if="$v.event.location.$error">
          <p v-if="!$v.event.location.required" class="errorMessage">Location is required.</p>
        </template>   

        <h3>When is your event?</h3>

        <div class="field">
          <label>Date</label>
          <datepicker 
            v-model="event.date" 
            placeholder="Select a date"
            @opened="$v.event.date.$touch()"
            :input-class="{ errorBoarder: $v.event.date.$error }"
          />
        </div>

        <template v-if="$v.event.date.$error">
          <p v-if="!$v.event.date.required" class="errorMessage">Date is required.</p>
        </template>        

        <BaseSelect 
          label="Select a time" 
          v-model="event.time" 
          :options="times" 
          class="field" 
          @blur="$v.event.time.$touch()"
          :class="{ errorBoarder: $v.event.time.$error }"
        />

        <template v-if="$v.event.time.$error">
          <p v-if="!$v.event.time.required" class="errorMessage">Time is required.</p>
        </template>

        <BaseButton 
          buttonClass="-fill-gradient" 
          type=submit 
          :disabled="$v.$anyError"
          >
            Submit 
        </BaseButton>

        <p v-if="$v.$anyError" class="errorMessage">Please fill out the required field(s).</p>
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import NProgress from'nprogress'
import { required } from 'vuelidate/lib/validators'

export default {
  components: {
    Datepicker
  },
  validations: {
    event: {
        category: { required },
        title: { required },
        description: { required },
        location: { required },
        date: { required },
        time: { required }
    }
  },
  data() {
    const times = []
    for (let i = 1; i < 24; i++) {
      times.push(i + ':00')
    }
    return {
      newCatSelected: false,
      event: this.createFreshEventObject(),
      times,
      categories: this.$store.state.categories
    }
  },
  methods: {
    addCat(e) {
      if (e.target.value === 'Add a category...') {
        this.newCatSelected = true
      }
    },
    submitCat() {
      this.$store.dispatch('addCategory', this.event.category)
      this.newCatSelected = false
    },
    createEvent() {
      this.$v.$touch() 
      if (!this.$v.$invalid) {
        NProgress.start()
        this.$store.dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: {id: this.event.id}
          })
          this.event = this.createFreshEventObject()
        })
        .catch( () => {
          NProgress.done()
        })
      }
    },
    createFreshEventObject() {
      const user = this.$store.state.user
      const id = Math.floor(Math.random() * 10000000)
      return {
        id: id,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  }
}
</script>

<style scoped>
.nextSelection {
  display: flex;
  margin: 5px 0;
}

.temp-button {
  background: linear-gradient(to right, #16c0b0, #84cf6a);
  color: #ffffff;
  border: none;
  margin: 0 5px;
  border-radius: 50%;
}
</style>

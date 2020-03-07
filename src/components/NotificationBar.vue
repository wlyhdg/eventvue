<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div> 
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      timeout: null,
      notificationTypeClass: null
    }
  },
  mounted() {
    this.timeout = setTimeout(() => 
      this.remove(this.notification), 
      5000),
    this.notificationTypeClass = `-text-${this.notification.type}`
  },
  beforeDestroy() {
    /* This lifecycle hook is called for future-proofing,
    ie. if we close the component, setTimeout could still be running
    potentially causing a memory leak; this empties timouts just before closing
    the component */
    clearTimeout(this.timeout)
  },
  computed: {
    // notificationTypeClass() {
    //   return `-text-${this.notification.type}`
    // }
  },
  methods: {
    ...mapActions('notification', ['remove'])
  }
}
</script>

<style>
  .notification-bar {
    background: rgba(0, 0, 0, 0.75);
    padding: 5px 15px;
    margin: 20px;
    border-radius: 10px;
    animation: fade 5s linear;
  }

  @keyframes fade {
  0% {opacity: 0;}
  15% {opacity: 1;}
  85% {opacity: 1;}
  100% {opacity: 0;}
}
</style>
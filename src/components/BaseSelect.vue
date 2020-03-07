<template>
  <div class="select">
    <label>{{ label }}</label>
    <select :value="value" @change="updateValue" v-bind="$attrs" v-on="$listeners">
      <option 
        v-for="(option, index) in options" 
        :key="index"
        :selected="option === value"
      >{{ option }}</option>
      <option v-show=custom>
        Add a category...
      </option>
    </select>
  </div>
</template>

<script>
import { formFieldMixin } from '../mixins/formFieldMixin';

export default {
  mixins: [formFieldMixin],
  props: {
    options: {
      type: Array
    },
    custom: {
      type: Boolean
    }
  }
}
</script>

<style>
.select {
  margin: 20px 0;
}
</style>
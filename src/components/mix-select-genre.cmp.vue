<template>
  <el-select v-model="value" placeholder="Select" v-on:change="onSelect">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: 'funk',
          label: 'funk'
        }, {
          value: 'pop',
          label: 'pop'
        }, {
          value: 'rock',
          label: 'rock'
        }, {
          value: 'israeli',
          label: 'israeli'
        }, {
          value: 'Techno',
          label: 'Techno'
        }, {
          value: 'Soundtrack',
          label: 'Soundtrack'
        }],
        value: ''
      }
    },
     methods:{
      onSelect($event){
        console.log('select' ,$event)
        this.$emit('selectType', $event)
      },
    },
  }
</script>
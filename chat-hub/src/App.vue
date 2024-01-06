<template>
  <div>
    <h4>hello world</h4>
    <div v-if="test == 'hi'">
      <div v-for="item, index in myArrayInObject" :key="index">
        <MyComponent ></MyComponent>
        <h2>{{ item.name }}</h2>
        <h4>{{ item.data }}</h4>
      </div>
    </div>
    <div :class="handleChangeClass()">{{ test }}</div>
    <div :style="test == 'hi' ? myStyle : ''">{{ addTestInTest() }}</div>
    <button @click="test='changed...'">change test</button>
    <button @click="changeTest('hi')">hi button</button>
  </div>

</template>

<script>
import MyComponent from './components/MyComponent.vue';

export default {
  components: {
    MyComponent,
  },
  data() {
    return {
      myArray: [1,2,3,4,5],
      myArrayInObject: [{
          'data': 'data1',
          'name': 'name'
        }, {
          'data': 'data2',
          'name': 'name'
        }
      ],
      test: 'test',
      myStyle: {
        'color': 'red'
      }
    }
  },
  methods: {
    changeTest(changeValue) {
      this.test = changeValue
    },
    handleChangeClass() {
      if (this.test == 'hi'){
        return 'myClass'
      }
    },
    addTestInTest() {
      return this.test + '....test..'
    }
  }
}
</script>

<style scoped>
.myClass { 
  color: rebeccapurple;
}
</style>
<template>
  <div class="input-group">
    <label class="input-underlined">
      <input :type="tipoCampo" required :class="{ 'input-left': viconpos === 'right' }" v-model="textInputValue">
      <span class="input-label" :class="{ 'input-label-left': viconpos === 'right' }">{{ inputlabel }}</span>
      <img :src="src" class="input-v-icon" :class="{ 'input-v-icon-right': viconpos === 'right' }"  />
    </label>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { onUpdated } from '@vue/runtime-core'
export default {
  name: 'TextInput',
  emits: ['emitTextInput'],
  props: ['inputlabel', 'viconname', 'viconpos', 'tipoCampo', 'src'],
  setup(props, {emit}) {
    const textInputValue = ref('')

    onUpdated(() => {
      emit('emitTextInput', textInputValue.value)
    })

    return { textInputValue }
  }
}
</script>

<style scoped>
.input-group {
  position: relative;
  width: 230px;
}

.input-underlined > input, .input.left, 
.input-label, .input-label-left, .input-v-icon, 
.input-v-icon-right {
  cursor: text;
}

.input-underlined > input {
  border: none;
	width: 100%;
	height: 3rem;
  font-size: small;
	padding-top: 0.35rem;
  padding-right: 1rem;
  padding-left: 3.5rem;
  box-sizing: border-box;
  transition: border-bottom .2s ease-in-out;
}

.input-underlined > .input-left {
  border: none;
	width: 100%;
	height: 3rem;
  font-size: small;
	padding-top: 0.35rem;
  padding-right: 3.5rem;
  padding-left: 1rem;
  box-sizing: border-box;
  transition: border-bottom .2s ease-in-out;
}

.input-underlined > input:focus,
.input-underlined > input:valid {
  outline: none;
  border-bottom: 3px solid var(--cor-laranja-normal);
  transition: border-bottom .2s ease-in-out;
  cursor: text;
}

.input-underlined > .input-label {
  position: absolute;
	top: 1rem;
	left: 3.5rem;
	line-height: 147.6%;
	transition: top .2s ease, font-size .2s ease;
  font-style: italic;
  font-size: small;

  user-select: none;
}

.input-underlined > .input-label-left {
  position: absolute;
	top: 1rem;
	left: 1rem;
	line-height: 147.6%;
	transition: top .2s ease, font-size .2s ease;
  font-style: italic;
  font-size: small;

  user-select: none;
}

.input-underlined > .input-v-icon {
  position: absolute;
  top: 12px;
	left: 12px;
  width: 22px;
  height: 22px;
  filter: opacity(0.35);
  transition: all .2s ease;
  z-index: 1;

  user-select: none;
}

.input-underlined > .input-v-icon-right {
  position: absolute;
  top: 12px;
	right: 12px;
  left: unset;
  width: 22px;
  height: 22px;
  filter: opacity(0.35);
  transition: all .2s ease;
  z-index: 1;

  user-select: none;
}

.input-underlined > input:focus {
  background: beige;
}

.input-underlined > input:focus + .input-label,
.input-underlined > input:valid + .input-label {
  top: 0.3rem;
  font-size: 0.55rem;
  color: #B0B0B0;
}

.input-underlined > input:focus ~ .input-v-icon {
  /* color: var(--cor-laranja-normal); */
  filter: invert(59%) sepia(64%) saturate(3726%) hue-rotate(349deg) brightness(103%) contrast(88%);
}
</style>
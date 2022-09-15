import { ref } from 'vue'

const getArrayObj = (arrayObjName, id) => {
  const arrayObj = ref([])
  const errorArrayObj = ref(null)

  const url = `http://localhost:3000/${arrayObjName}/${id || ''}`
    
  const loadArrayObj = async () => {
    try {
      let res = await fetch(url)
      if(!res.ok) {
        throw Error('Não há dados disponíveis.')
      }
      arrayObj.value = await res.json()
    }
    catch (err) {
      errorArrayObj.value = err.message
      console.log(errorArrayObj.value)
    }
  }
  
  return { arrayObj, errorArrayObj, loadArrayObj }
}

export default getArrayObj
const login = async (userName, password) => {
  try {
    const res = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({userName, password}),
    })

    const result = await res.json()
    console.log(result)
    if(res.status === 200) {
      return {success:true, token:result.token}
    }
    return {success:false, msg:result.msg}
  }
  catch (err) {
    console.log(err)
  }
}

export { login }
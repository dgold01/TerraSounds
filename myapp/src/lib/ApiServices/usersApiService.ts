

export async function getUsers() {
    const response = await fetch('http://terra-sounds-backend.fly.dev/users')
    const users = await response.json()
    console.log(users)
    return users
}

export async function saveUser(name, email, password) {
    console.log(name)
    const user = {
       name,
       email,
        password
    }
    console.log(user)
    const response = await fetch ('http://terra-sounds-backend.fly.dev/users',{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    return response.json();
}


 
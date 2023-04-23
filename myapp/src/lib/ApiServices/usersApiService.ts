

export async function getUsers() {
    const response = await fetch('http://localhost:3002/users')
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
    const response = await fetch ('http://localhost:3002/users',{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    return response.json();
}


 
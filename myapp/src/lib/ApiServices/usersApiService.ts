

export async function getUsers() {
    const response = await fetch('https://terra-sounds-backend.fly.dev/users')
    const users = await response.json()
    console.log(users)
    return users
}
export async function findEmail(email: string) {
    const response = await fetch(`https://terra-sounds-backend.fly.dev/users/exist/${email}`)
    const emailR = await response.json()
    console.log(emailR)
    return emailR
}

export async function loginUser(user: any) {
    const response = await fetch('https://terra-sounds-backend.fly.dev/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Error: ' + response.statusText);
    }
}




// export async function checkFor
// fetch('http://localhost:3010/auth/google/callback')
//     .then((response) => {
//
//         if (response.ok) {
//             return response.json();
//         } else {
//             throw new Error('Not logged in');
//         }
//     })
//     .then((data) => {
//         setUserProfile(data);
//         setLoggedIn(true);
//     })
//     .catch(() => {
//         setLoggedIn(false);
//     });

export async function createUser(user:any) {
    const response = await fetch ('https://terra-sounds-backend.fly.dev/users',{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    return response.json();
}


 
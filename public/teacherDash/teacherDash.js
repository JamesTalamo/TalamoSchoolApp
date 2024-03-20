const logout = document.querySelector('#logoutButton')
logout.addEventListener('click', () => {
    
    const url = 'http://localhost:5000/users/logout'

    const req = new Request(url ,{
        method : 'GET',
        headers : {
            'Content-type' : 'application/json'
        }
    })

    fetch(req)
    .then((res) => {
        if(!res.ok) throw new Error('ERROR')
        return res.json()
    })
    .catch(console.warn)

    window.location.href ='http://localhost:5000/login'
})


const userRequest = 'http://localhost:5000/users/userDB'
const userReq = new Request(userRequest, {
    method: 'GET',
    headers : {
        'Content-type' : 'application/json'
    }
})
let users ;
fetch(userReq)
.then((res)=> {
    if(!res.ok)  throw new Error('USER REQ ERROR')
    return res.json()
})
.then((usersData)=>{
    users = usersData // setting the output into the variable


    const accessToken = 'http://localhost:5000/getCookie'
    return fetch(accessToken)
})
.then((accessTokenRes)=>{
    if(!accessTokenRes.ok) throw new Error('ACCESS TOKEN RES ERROR')
    return accessTokenRes.json()
})
.then((accessTokenData)=>{
    const token = accessTokenData.jwt

    console.log(token)


    // try{
    //     const foundUser = await User.findOne({ accessToken: token }).exec();
    // }catch(err){
    //     console.error(err)
    // }

    const foundUser = users.find(person => person.accessToken === token)
    console.log(foundUser)

    const user = document.querySelector('#name-holder')
    user.innerHTML = foundUser.username

    const role = document.querySelector('#name-roles')
    role.innerHTML = Object.keys(foundUser.roles)[0]

    

})
.catch(console.warn)

const logout = document.querySelector('#logoutButton')
logout.addEventListener('click', () => {
    const url = 'http://localhost:5000/logout'

    const req = new Request(url, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    })

    fetch(req)
        .then((res) => {
            if (!res.ok) throw new Error('ERROR')
            return res.json()
        })
        .catch(console.warn)

    window.location.href = 'http://localhost:5000/login'
})


const userRequest = 'http://localhost:5000/users/userDB'
const userReq = new Request(userRequest, {
    method: 'GET',
    headers: {
        'Content-type': 'application/json'
    }
})

let users;

fetch(userReq)
    .then((res) => {
        if (!res.ok) throw new Error('USER REQ ERROR')
        return res.json()
    })
    .then((usersData) => {
        users = usersData
        const accessToken = 'http://localhost:5000/getCookie'
        return fetch(accessToken)
    })
    .then((accessTokenRes) => {
        if (!accessTokenRes.ok) throw new Error('ACCESS TOKEN RES ERROR')
        return accessTokenRes.json()
    })
    .then((accessTokenData) => {
        const token = accessTokenData.jwt

        const foundUser = users.find(person => person.accessToken === token)
        console.log(foundUser)

        const user = document.querySelector('#name-holder') //name for nav bar
        user.innerHTML = foundUser.username

        const userRoleNav = document.querySelector('#name-roles') //roles for nav bar
        userRoleNav.innerHTML = Object.keys(foundUser.roles)[0]

        const url = 'http://localhost:5000/quiz/showQuiz'

        fetch(url)
            .then((res) => {
                if (!res.ok) throw new error('error on line 63')
                return res.json()
            })
            .then((data) => {

                const container = document.querySelector('#info-box');

                data.forEach((element) => {
                    const box = document.createElement('div');
                    box.classList.add('boxes');

                    Object.keys(element).forEach(propertyName => {
                        
                        if(propertyName === '_id') {
                            return
                        }

                        let data = document.createElement('div');
                        data.classList.add('data')
                        data.innerHTML = `${propertyName} : ${element[propertyName]}`;
                        box.appendChild(data);
                    });

                    container.appendChild(box);
                });

            })
            .catch(console.warn)
    })
    .catch(console.warn)


    const deleteAllWork = document.querySelector('#delete-question')
    deleteAllWork.addEventListener('click', (e) => {
        const url = 'http://localhost:5000/quiz/delQuiz'

        fetch(url,{
            method:'GET',
            headers : {
                'Content-type' : 'application/json'
            }
        })
        .then((res) => {
            if(!res.ok)  throw new Error('Error')
            const url = 'http://localhost:5000/quiz/resetAllScore'
            const req = new Request(url, {
                method : 'GET',
                headers : {
                    'Content-type' : 'application/json'
                }
            })
            return fetch(req)
        })
        .then((res) => {
            if(!res.ok) throw new Error('2nd Error')
        })
        .catch(console.warn)

        setTimeout(() => {
            window.location.href = 'http://localhost:5000/verified/teacherDash/workC';
        }, 500);
    })



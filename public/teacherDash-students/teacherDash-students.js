const logout = document.querySelector('#logoutButton')
logout.addEventListener('click', () => {
    const url = 'http://localhost:5000/users/logout'

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

        const user = document.querySelector('#name-holder') //name for nav bar
        user.innerHTML = foundUser.username

        const userRoleNav = document.querySelector('#name-roles') //roles for nav bar
        userRoleNav.innerHTML = Object.keys(foundUser.roles)[0]

        // const studentsOnly = users.filter(person => person.roles.role === 'STUDENT') // THIS WILL be use in students database in frontend   

        // studentsOnly.forEach(element => {
        //     const ul = document.querySelector('#new-stud-con') // container for the new stud

        //     const newStud = document.createElement('li') // made a li element
        //     newStud.classList.add('new-stud') // added the new made li element to an exisitning new-stud style in css

        //     const newStudName = document.createElement('div')
        //     newStudName.innerHTML = element.username

        //     const newStudCreated = document.createElement('div')
        //     newStudCreated.innerHTML = element.created

        //     const newStudRole = document.createElement('div')
        //     newStudRole.innerHTML = element.roles.role



        //     fetch('http://localhost:4000/addQuiz')
        //         .then((res) => {
        //             if (!res.ok) throw new error('error line 79')
        //             return res.json()
        //         })
        //         .then((res) => {
        //             overAllWork = res.length

        //             const newStudScore = document.createElement('div')
        //             newStudScore.innerHTML = `${element.userScore} / ${overAllWork}`

        //             newStud.appendChild(newStudName);
        //             newStud.appendChild(newStudCreated);
        //             newStud.appendChild(newStudRole);
        //             newStud.appendChild(newStudScore)

        //             ul.appendChild(newStud)

        //         })
        //         .catch(console.warn)



        // });

        const uri = 'http://localhost:5000/users/userDB'

        fetch(uri)
            .then((res) => {
                if (!res.ok) throw new Error('invalid')
                return res.json()
            })
            .then((users) => {
                // console.log(users)

                // const studentsOnly = users.filter(person => person.roles.role === 'Student') // THIS WILL be use in students database in frontend


                // studentsOnly.forEach(element => {
                // const ul = document.querySelector('#new-stud-con') // container for the new stud

                // const newStud = document.createElement('li') // made a li element
                // newStud.classList.add('new-stud') // added the new made li element to an exisitning new-stud style in css

                // const newStudName = document.createElement('div')
                // newStudName.innerHTML = element.username

                // const newStudCreated = document.createElement('div')
                // newStudCreated.innerHTML = element.created

                // const newStudRole = document.createElement('div')
                // newStudRole.innerHTML = element.roles.role

                // const newStudScore = document.createElement('div')
                // //             newStudScore.innerHTML = `${element.userScore} / ${overAllWork}`

                // //             newStud.appendChild(newStudName);
                // //             newStud.appendChild(newStudCreated);
                // //             newStud.appendChild(newStudRole);
                // //             newStud.appendChild(newStudScore)

                // //             ul.appendChild(newStud)

                console.log(users);

                const allWorkUri = 'http://localhost:5000/quiz/showQuiz'

                fetch(allWorkUri)
                    .then((res) => {
                        if (!res.ok) throw new Error('Error')
                        return res.json()
                    })
                    .then((data) => {
                        const overAllWork = data.length
                        
                        const studentsOnly = users.filter(person => person.roles.Student);
                        studentsOnly.forEach(element => {
                            const ul = document.querySelector('#new-stud-con'); // container for the new stud

                            const newStud = document.createElement('li'); // create a new li element
                            newStud.classList.add('new-stud'); // added the new made li element to an existing new-stud style in css

                            const newStudName = document.createElement('div');
                            newStudName.innerHTML = element.username;

                            const newStudCreated = document.createElement('div');
                            newStudCreated.innerHTML = element.created;

                            const newStudRole = document.createElement('div');
                            newStudRole.innerHTML =  Object.keys(element.roles)[0] // converted instead of giving the values, im getting the property key

                            const newStudScore = document.createElement('div');
                            // newStudScore.innerHTML = `${element.userScore}`;
                            newStudScore.innerHTML = `${element.userScore} / ${overAllWork}`;

                            // Append all elements to the new li element
                            newStud.appendChild(newStudName);
                            newStud.appendChild(newStudCreated);
                            newStud.appendChild(newStudRole);
                            newStud.appendChild(newStudScore);

                            // Append the new li element to the ul container
                            ul.appendChild(newStud);


                        });

                    })
                    .catch(console.error())

            })
            .catch(console.warn)

    })
    .catch(console.warn)

console.log('Hello')




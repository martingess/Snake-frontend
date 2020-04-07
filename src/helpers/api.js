const api = {
    login: async (login, password) => {
        try {
            const response = await fetch('http://localhost:3022/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: `query lg{
                            login(username: "${login}", password: "${password}")
                        }`,
                    variable: {}
                })
            });
            return await response.json();
        } catch (err) {
            return null
        }
    },
    getUserResults: async () => {
        try {

            const response = await fetch('http://localhost:3022/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': "Bearer " + localStorage.authToken
                },
                body: JSON.stringify({
                    query: `query FindUserResults{
                            findUserResults(username:"My"){
                                name,
                                analyzeType,
                                id,
                                date,
                                imgsPaths,
                                doctorName,
                                note
                            }
                        }`,
                    variables: {},
                })
            });
            return await response.json()
        } catch (err) {
            return null
        }
    },
    deleteResultById: async (id) => {
        try {

            fetch('http://localhost:3022/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': "Bearer " + localStorage.authToken
                },
                body: JSON.stringify({
                    query: `mutation deleteResult {
                        deleteResult(id:"${id}")
                        }`,
                    variables: {}
                })
            })
        } catch (err) {
            return null
        }
    },
    createResult: async (values, imgPaths) => {
        try {

            console.log(values)

            const imgsPathsJson = JSON.stringify(imgPaths)

            const response = await fetch('http://localhost:3022/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/JSON",
                    'Authorization': "Bearer " + localStorage.authToken
                },
                body: JSON.stringify({
                    query: `mutation CreateResult {
                            createResult(result: {name: "${values.name}", 
                            date: "${values.date}", 
                            doctorName: "${values.doctorName}", 
                            analyzeType: "${values.analyzeType}", 
                            note: "${values.note}", 
                            imgsPaths: ${imgsPathsJson} }) {
                                name
                                date
                                doctorName
                                analyzeType
                                note
                            }
                        }`,
                    variables: {},
                })
            })
            return await response.json();
        } catch (err) {
            return null
        }
    },
    updateResult: async (value) => {
        try {

            console.log(value)
            const response = await fetch('http://localhost:3022/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/JSON',
                    'Accept': 'application/JSON',
                    'Authorization': "Bearer " + localStorage.authToken
                },
                body: JSON.stringify({
                    query: `mutation UpdateResult($value: UpdateResult) {
                    updateResult(result: $value)
                  }`,
                    variables: {
                        value
                    }
                })
            })
            const updatedResult = await response.json();
            return updatedResult;
        } catch (err) {
            return null
        }
    },

    register: async (value) => {
        try {

            const result = await fetch('http://localhost:3022/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/JSON',
                    'Accept': 'application/JSON'
                },
                body: JSON.stringify({
                    query: `mutation createUser($value: CreateUser) {
                                createUser(user: $value)
                            }`,
                    variables: {
                        value
                    }
                }),
            })
            const resultJson = await result.json()
            return resultJson && resultJson.data.createUser
        } catch (err) {
            return null
        }
    },

    deleteUser: async () => {
        try {

            const response = await fetch('http://localhost:3022/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/JSON',
                    'Accept': 'application/JSON',
                    'Authorization': "Bearer " + localStorage.authToken
                },
                body: JSON.stringify({
                    query: `mutation {
                                deleteUser
                            }`
                }),
            })
            const result = response.json()
            return result
        } catch (err) {
            return null
        }
    }


}
export default api;
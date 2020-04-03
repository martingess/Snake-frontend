const api = {
    login: async (login, password) => {
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
    },
    getUserResults: async () => {
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
                variable: {},
            })
        });
        return await response.json()
    },
    deleteResultById: async (id) => {
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
                variable: {}
            })
        })
    },
    createResult: async (values, imgPaths) => {
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
                variable: {},
})
        })
        return await response.json();
    },
    register: async (value) => {
        console.log(value)
        const result = await fetch('http://localhost:3022/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                query: `mutation createUser($value: CreateUser) {
                                createUser(input: $value)
                            }`,
                variables: {
                    value
                }
            }),
        })
        const resultJson = await result.json()
        return resultJson && resultJson.data.createUser
    }

}
export default api;
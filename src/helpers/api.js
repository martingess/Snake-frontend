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
        const response = await fetch('http://localhost:3022/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': "application/JSON",
                'Authorization': "Bearer " + localStorage.authToken
            },
            body: JSON.stringify({
                query: `mutation CreateResult{
                createResult(
                  name:"${values.name}",
                  imgsPaths:"${imgPaths}",
                  doctorName:"${values.doctorName}",
                  analyzeType:"${values.analyzeType}",
                  date: "${values.date}",
                  note:"${values.note}"
                ) {
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
        const result = await fetch('http://localhost:3022/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                query: `mutation {
                                createUser(login:"${value.login}", password:"${value.password}",email:"${value.email}",name:"${value.name}")
                            }`
            }),
            variables: {}
        })
        const resultJson = await result.json()
        return resultJson && resultJson.data.createUser
    }

}
export default api;
import { getItemsForApprove } from "../modules/redDoctor";

const graphqlRequest = async (query, variables) => {
  try {
    console.log(process.env.REACT_APP_BACKEND_PATH);
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_PATH}/graphql`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.authToken,
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      },
    );
    return await response.json();
  } catch (err) {
    return null;
  }
};


const query = {
  login: `query lg($login: String!, $password: String!) {
    login(username: $login, password: $password)
}`,
  getUserResults: `query FindUserResults{
    findUserResults{
      name,
analyzeType,
id,
date,
imgsPaths,
doctorName,
note
    }
}`,
  getPatientsResults: `query FindDoctorsData{
    findDoctorResults{
        name,
analyzeType,
id,
date,
imgsPaths,
doctorName,
note, 
user {
name
}
}
}`,
  deleteResultById: `mutation deleteResult ($id: String!) {
    deleteResult(id: $id)
    }`,
  createResult: `mutation CreateResult ($name: String! $date: String, $imgsPaths: [String]!, $doctorName: String, $note: String) {
    createResult(result: {name: $name, 
    date: $date, 
    doctorName: $doctorName, 
    note: $note, 
    imgsPaths: $imgsPaths }) {
        name
        date
        doctorName
        analyzeType
        note
    }
}`,
  updatedResult: `mutation UpdateResult($value: UpdateResult) {
  updateResult(result: $value)
}`,
  register: `mutation createUser($value: CreateUser) {
  createUser(user: $value)
}`,
  deleteUser: `mutation {
  deleteUser
}`,
  updateUser: `mutation ($user: inputUpdateUser) {
  updateUser(user: $user)
}`,
  search: `query ($query: String!){
  search(query: $query){
      id,
      name,
      imgsPaths
  }
}`,
  getItemsForApprove: `query FindConfirm{
    resultsForApprove{
      id,
      name,
      user {
        name
      }
    }
  }`,
  doctorApproveResult: `mutation ApproveRes($resultId: String!){
  approveResult(id: $resultId)
}`,
  doctorRejectResult: `mutation RemoveDoctor($resultId: String!){
  removeDoctorFromResult(resultId: $resultId)
}`,
};

const api = {
  login: async (login, password) => {
    return await graphqlRequest(query.login, { login, password });
  },
  getUserResults: async () => {
    return await graphqlRequest(query.getUserResults);
  },
  getItemsForApprove: async () => {
    return await graphqlRequest(query.getItemsForApprove);
  },
  getPatientsResults: async () => {
    return await graphqlRequest(query.getPatientsResults)
  },
  deleteResultById: async (id) => {
    return await graphqlRequest(query.deleteResultById, { id });
  },
  createResult: async (values, imgsPaths) => {
    return await graphqlRequest(query.createResult, {
      ...values,
      imgsPaths,
    });
  },
  updateResult: async (value) => {
    return await graphqlRequest(query.updatedResult, { value });
  },

  register: async (value) => {
    return await graphqlRequest(query.register, { value });
  },

  deleteUser: async () => {
    graphqlRequest(query.deleteUser);
  },

  updateUser: async (user) => {
    return await graphqlRequest(query.updateUser, { user });
  },
  search: async (searchQuery) => {
    return await graphqlRequest(query.search, { query: searchQuery });
  },
  doctorApproveResult: async (id) => {
    return await graphqlRequest(query.doctorApproveResult, {
      resultId: id,
    });
  },

  doctorRejectResult: async (id) => {
    return await graphqlRequest(query.doctorRejectResult, {
      resultId: id,
    });
  },
};
export default api;

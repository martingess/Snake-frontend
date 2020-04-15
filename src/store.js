import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import login from "./modules/redLogin";
import results from "./modules/redResults";
import doctor from "./modules/redDoctor";

import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({login, results, doctor});
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
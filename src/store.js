import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk'
import login from "./modules/redLogin";
import results from "./modules/redResults";
import {setResultsData} from "./modules/redResults";
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({login, results});
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

//TODO: удалить нахер начальные данные и не забыть почистить импорт экшенов
const resultsData = [
  {id: 1, name: 'БАК1-посев', note: 'Особых примечаний нет', date: '02.01.2020', doctor: 'Иванова И.Р.'},
  {id: 2, name: 'БАК2-посев', note: 'Особых примечаний нет', date: '02.01.2020', doctor: 'Иванова И.Р.'},
  {id: 3, name: 'БАК3-посев', note: 'Особых примечаний нет', date: '02.01.2020', doctor: 'Иванова И.Р.'},
  {id: 4, name: 'БАК4-посев', note: 'Особых примечаний нет', date: '02.01.2020', doctor: 'Иванова И.Р.'},
  {id: 5, name: 'БАК5-посев', note: 'Особых примечаний нет', date: '02.01.2020', doctor: 'Иванова И.Р.'},
  {id: 6, name: 'БАК6-посев', note: 'Особых примечаний нет', date: '02.01.2020', doctor: 'Иванова И.Р.'},
];

store.dispatch(setResultsData(resultsData))

export default store;
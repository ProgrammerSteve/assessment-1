// import {cardReducer} from './reducers/cardReducer';
import { configureStore } from '@reduxjs/toolkit'
import { studentReducer } from './reduxtools';





const store = configureStore({
    reducer: {
      student: studentReducer,
    }
  })
  export default store;




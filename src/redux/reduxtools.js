import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'

const initialState = {
    isPending: false,
    apiList: [],
    error: '',
  }

// Pulls the students array from the API and adds an index and tags property
export const getStudents = createAsyncThunk(
  'students/getStudents',
  async (thunkAPI) => {
    const res = await fetch(`https://api.hatchways.io/assessment/students`)
    .then((resp) => resp.json())
    .then(data=>{
        return data.students.map((student,ind)=>{
            return Object.assign({},student,{index:ind, tags:[], isFocused:false})
        })
    })
  return res
})

export const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    studentsShowTag: (state, action) =>{
        console.log(current(state.apiList[action.payload].tags))
    },
    studentsAddTag: (state, action) =>{
      state.apiList[action.payload[0]].tags.push(action.payload[1]);
    },
    studentsFocusTag: (state, action) =>{
      state.apiList[action.payload].isFocused=true;
    },
    studentsBlurTag: (state, action) =>{
      state.apiList[action.payload].isFocused=false;
    },
  },
  extraReducers: {
    [getStudents.pending]: (state) => {
      state.isPending = true
    },
    [getStudents.fulfilled]: (state, { payload }) => {
      state.isPending = false
      state.apiList = payload
    },
    [getStudents.rejected]: (state) => {
      state.isPending = false
      state.error= 'error with api call'
    },
  },
})

export const studentReducer = studentSlice.reducer
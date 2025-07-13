import { createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: "user",
    initialState :{value :{name:"", email:"",role:""}},
    reducers :{
        //login c'est le nom action on va declencher action action login pour faire transmettre les donne a reducer
        login:(state,action)=>{
            state.value = action.payload
        }
    }
})


export const {login} = userSlice.actions; //considerer comme action
//export const {login} = userSlice.reducer; //considerer comme action

export default userSlice.reducer //reducer
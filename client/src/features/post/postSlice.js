import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
    posts: [],
    post: null,
    postLoading: false,
    postSuccess: false,
    postError: false,
    postErrorMessage: ""
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers : (builder) => {
        builder
        .addCase(GeneratePost.pending , (state ,action) => {
            state.postLoading = true
            state.postSuccess = false
            state.postError = false
        })
        .addCase(GeneratePost.fulfilled , (state ,action) => {
            state.postLoading = false
            state.postSuccess = true
            state.post = action.payload
            state.postError = false
        })
        .addCase(GeneratePost.rejected , (state ,action) => {
            state.postLoading = false
            state.postSuccess = false
            state.postError = true
            state.postErrorMessage = action.payload
        })
        .addCase(getPosts.pending , (state ,action) => {
            state.postLoading = true
            state.postSuccess = false
            state.postError = false
        })
        .addCase(getPosts.fulfilled , (state ,action) => {
            state.postLoading = false
            state.postSuccess = true
            state.posts = action.payload
            state.post = null
            state.postError = false
        })
        .addCase(getPosts.rejected , (state ,action) => {
            state.postLoading = false
            state.postSuccess = false
            state.postError = true
            state.postErrorMessage = action.payload
        })
    }
})


export const {} = postSlice.actions

export default postSlice.reducer


//Generate Post 
export const GeneratePost = createAsyncThunk("POST/GENERATE" , async(prompt , thunkAPI) => {

    let token = thunkAPI.getState().auth.user.token

    try {
        return await postService.generateAndPostImage(prompt , token)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

//Get Post 
export const getPosts = createAsyncThunk("POST/GET" , async(_ , thunkAPI) => {

    let token = thunkAPI.getState().auth.user.token

    try {
        return await postService.fetchPosts(token)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})
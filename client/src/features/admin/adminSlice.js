import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import adminService from "./adminService"

const initialState = {
    users: [],
    posts: [],
    reports: [],
    adminLoading: false,
    adminSuccess: false,
    adminError: false,
    adminErrorMessage: ""
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get All Users
            .addCase(getAllUsers.pending, (state) => {
                state.adminLoading = true
                state.adminSuccess = false
                state.adminError = false
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.adminLoading = false
                state.adminSuccess = true
                state.users = action.payload
                state.adminError = false
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.adminLoading = false
                state.adminSuccess = false
                state.adminError = true
                state.adminErrorMessage = action.payload
            })

            // Get All Posts
            .addCase(getAllPosts.pending, (state) => {
                state.adminLoading = true
                state.adminSuccess = false
                state.adminError = false
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.adminLoading = false
                state.adminSuccess = true
                state.posts = action.payload
                state.adminError = false
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.adminLoading = false
                state.adminSuccess = false
                state.adminError = true
                state.adminErrorMessage = action.payload
            })

            // Get Reports
            .addCase(getReports.pending, (state) => {
                state.adminLoading = true
                state.adminSuccess = false
                state.adminError = false
            })
            .addCase(getReports.fulfilled, (state, action) => {
                state.adminLoading = false
                state.adminSuccess = true
                state.reports = action.payload
                state.adminError = false
            })
            .addCase(getReports.rejected, (state, action) => {
                state.adminLoading = false
                state.adminSuccess = false
                state.adminError = true
                state.adminErrorMessage = action.payload
            })

            // Toggle User Status (block/unblock)
            .addCase(toggleUserStatus.pending, (state) => {
                state.adminLoading = true
                state.adminError = false
            })
            .addCase(toggleUserStatus.fulfilled, (state, action) => {
                state.adminLoading = false
                state.adminSuccess = true
                // Update the user in the list with new status
                state.users = state.users.map((u) =>
                    u._id === action.payload._id ? action.payload : u
                )
                state.adminError = false
            })
            .addCase(toggleUserStatus.rejected, (state, action) => {
                state.adminLoading = false
                state.adminError = true
                state.adminErrorMessage = action.payload
            })

            // Update Admin Post
            .addCase(updateAdminPost.pending, (state) => {
                state.adminLoading = true
                state.adminError = false
            })
            .addCase(updateAdminPost.fulfilled, (state, action) => {
                state.adminLoading = false
                state.adminSuccess = true
                state.posts = state.posts.map((p) =>
                    p._id === action.payload._id ? action.payload : p
                )
                state.adminError = false
            })
            .addCase(updateAdminPost.rejected, (state, action) => {
                state.adminLoading = false
                state.adminError = true
                state.adminErrorMessage = action.payload
            })
    }
})

export default adminSlice.reducer

// Get All Users
export const getAllUsers = createAsyncThunk("ADMIN/GET_USERS", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await adminService.fetchAllUsers(token)
    } catch (error) {
        const message = error.response?.data?.message || "Failed to fetch users"
        return thunkAPI.rejectWithValue(message)
    }
})

// Get All Posts
export const getAllPosts = createAsyncThunk("ADMIN/GET_POSTS", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await adminService.fetchAllPosts(token)
    } catch (error) {
        const message = error.response?.data?.message || "Failed to fetch posts"
        return thunkAPI.rejectWithValue(message)
    }
})

// Get Reports
export const getReports = createAsyncThunk("ADMIN/GET_REPORTS", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await adminService.fetchReports(token)
    } catch (error) {
        const message = error.response?.data?.message || "Failed to fetch reports"
        return thunkAPI.rejectWithValue(message)
    }
})

// Toggle User Active Status
export const toggleUserStatus = createAsyncThunk("ADMIN/TOGGLE_USER", async (uid, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await adminService.toggleUserStatus(uid, token)
    } catch (error) {
        const message = error.response?.data?.message || "Failed to update user"
        return thunkAPI.rejectWithValue(message)
    }
})

// Update Admin Post
export const updateAdminPost = createAsyncThunk("ADMIN/UPDATE_POST", async ({ pid, data }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await adminService.updateAdminPost(pid, data, token)
    } catch (error) {
        const message = error.response?.data?.message || "Failed to update post"
        return thunkAPI.rejectWithValue(message)
    }
})

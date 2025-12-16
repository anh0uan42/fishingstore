import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";



const userAdapter = createEntityAdapter({})

const initialState = userAdapter.getInitialState()

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => ({
                url: '/user',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: responseData => {
                const loadedUsers = responseData.map(user => {
                    user.id = user._id
                    return user
                })
                return userAdapter.setAll(initialState, loadedUsers)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'User', id }))
                    ]
                } else return [{ type: 'User', id: 'LIST' }]
            }
        }),

        addUser: builder.mutation({
            query: initialUserData => ({
                url: '/auth/signup',
                method: 'POST',
                body: {
                    ...initialUserData
                }
            }),
            invalidatesTags: [
                { type: 'User', id: 'LIST' }
            ]
        }),

        updateUser: builder.mutation({
            query: initialUserData => ({
                url: '/user',
                method: 'PATCH',
                body: {
                    initialUserData
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),

        // login: builder.mutation({
        //     query: credentials => ({
        //         url: '/auth/login',
        //         method: 'POST',
        //         body: {
        //             ...credentials
        //         }
        //     }),
        // })
        
    })
})

export const {
    useGetUsersQuery,
    useAddUserMutation,
    useUpdateUserMutation,
    // useLoginMutation
} = userApiSlice

export const selectUsersResult = userApiSlice.endpoints.getUsers.select()

const selectUserData = createSelector(
    selectUsersResult,
    userResults => userResults.data
)

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
} = userAdapter.getSelectors(state => selectUserData(state) ?? initialState)
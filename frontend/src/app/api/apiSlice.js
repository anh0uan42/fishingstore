import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../features/slices/authSlice'
// import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'

// const navigate = useNavigate()

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 403) {
        console.log('Sending refresh!')

        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

        if (refreshResult?.data) {
            api.dispatch(setCredentials({ ...refreshResult.data }))

            result = await baseQuery(args, api, extraOptions)
        } else {
            if (refreshResult?.error?.status === 403) {
                refreshResult.error.data.message = 'Your session has expire!'
                // navigate('/login')
                toast(`Your session has expire!\nPlease sign in again!`)
            }
            return refreshResult
        }
    }
    return result
}



export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Product', 'User', ],
    endpoints: builder => ({})
})
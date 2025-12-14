import { motion } from "framer-motion"
import { ArrowRight, Loader, Lock, Mail, User, UserPlus } from "lucide-react"
import { useState } from "react"
import { useAddUserMutation } from "../features/apiSlice/userApiSlice"
import { Link } from "react-router"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"

function SignUpPage() {

    const [addUser, { isLoading }] = useAddUserMutation()

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    
    const canSave = formData.password === formData.confirmPassword && [formData.name, formData.email, formData.password, formData.confirmPassword].every(Boolean) && !isLoading

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const userData = {
                name: formData.name,
                email: formData.email,
                password: formData.password
            }
            await addUser(userData)
            toast.success('User created')
            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
            navigate('/')
        } catch (error) {
            console.log(error.message)
            toast.error('Could not create user!')
        }
    }
    


  return (
    <div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <motion.div
            className="sm:mx-auto sm:w-full sm:max-w-md"
            initial={{ opacity: 0, y: -20}}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <h2 className="mt-6 text-center text-3xl font-extrabold text-emerald-400">Create An Account</h2>
        </motion.div>
        <motion.div
            className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" aria-hidden='true' />
                            </div>
                            <input
                                id='name'
                                type="text"
                                required
                                className="block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                placeholder="Your Full Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value})}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" aria-hidden='true' />
                            </div>
                            <input
                                id='email'
                                type="email"
                                required
                                className="block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                placeholder="your@email.example"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value})}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" aria-hidden='true' />
                            </div>
                            <input
                                id='password'
                                type="password"
                                required
                                className="block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                placeholder="*******"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value})}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="confirm" className="block text-sm font-medium text-gray-300">Confirm Password</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" aria-hidden='true' />
                            </div>
                            <input
                                id='confirm'
                                type="password"
                                required
                                className="block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                placeholder="*******"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value})}
                            />
                        </div>
                    </div>
                    <button
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-500 transition duration-150 ease-in-out disabled:opacity-50"
                        disabled={isLoading}
                        type='submit'
                    >
                        {isLoading ? (
                            <>
                                <Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden='true' />
                                Loading...
                            </>
                        ) : (
                            <>
                                <UserPlus className="mr-2 h-5 w-5" aria-hidden='true' />
                                Sign Up
                            </>
                        )}
                    </button>
                </form>
                <p className="mt-8 text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link to={'/login'} className="font-medium text-emerald-400 hover:text-emerald-300">
                        Login here <ArrowRight className="inline h-4 w-4" />
                    </Link>
                </p>
            </div>
        </motion.div>
    </div>
  )
}

export default SignUpPage
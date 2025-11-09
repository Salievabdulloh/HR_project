'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'
import { useGetStore } from '@/src/store/store'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import useDarkSide from '@/src/shared/config/useDarkSide'
import { styled } from '@mui/material/styles'

const Login = () => {
  const { register, watch, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { username: '', password: '' },
  })

  const { login, getRegister } = useGetStore()
  const router = useRouter()
  const [openEye, setOpenEye] = useState(false)
  const password = watch('password')

  const [theme] = useDarkSide()

  async function onSubmit(data: any) {
    try {
      const res = await login(data)
      const token = res?.access_token || res?.token || res?.data?.access_token || res
      if (token) {
        localStorage.setItem('access_token', token)
        toast.success('Welcome 👋')
        router.push('/dashboard')
      } else {
        toast.error('Invalid username or password')
      }
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong. Please try again.')
    }
  }

  useEffect(() => {
    getRegister()
  }, [])

  return (
    <div
      className={`
        min-h-screen flex items-center justify-center px-4 transition-all duration-700 ease-in-out
        ${theme === 'dark'
          ? 'bg-[#0f172a] text-gray-100'
          : 'bg-linear-to-br from-blue-100 via-white to-green-100 text-gray-900'
        }`}
    >
      <div
        className={`w-full max-w-md rounded-2xl shadow-xl p-8 transition-all duration-700 ease-in-out backdrop-blur-md
          ${theme === 'dark'
            ? 'bg-gray-900/80 border border-gray-700'
            : 'bg-white/80 border border-gray-200'
          }`}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className={`text-3xl font-bold transition-colors duration-700`}>
            Log <span className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>In</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <input
              type="text"
              {...register('username', { required: true })}
              placeholder="Username"
              className={`w-full px-4 py-2 rounded-lg outline-none border focus:ring-2 transition-all duration-500
                ${theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-gray-100 focus:ring-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400'
                }`}
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">Username is required</p>}
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={openEye ? 'text' : 'password'}
              {...register('password', { required: true })}
              placeholder="Password"
              className={`w-full px-4 py-2 rounded-lg outline-none border focus:ring-2 transition-all duration-500
                ${theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-gray-100 focus:ring-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400'
                }`}
            />
            {password && (
              <span
                className="absolute top-2 right-3 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 transition"
                onClick={() => setOpenEye(!openEye)}
              >
                {openEye ? <Eye /> : <EyeOff />}
              </span>
            )}
            {errors.password && <p className="text-red-500 text-sm mt-1">Password is required</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold shadow-md transition-all duration-500
              ${theme === 'dark'
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
          >
            Login
          </button>

          <p className={`text-center text-sm mt-4 transition-colors duration-700
            ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Don’t have an account?{' '}
            <Link
              href="/registration"
              className={`font-medium hover:underline transition
                ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login

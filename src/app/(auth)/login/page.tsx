'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'
import { useGetStore } from '@/src/store/store'
import { useRouter } from 'next/navigation'

const Login = () => {

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    }
  })

  const { login, getRegister, register: user } = useGetStore()

  const [openEye, setopenEye] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const password = watch("password")

  const router = useRouter()

  async function onSubmit(data: any) {
    try {
      // const username = user.find(e => e.username === data.username && e.password === data.password)
      // console.log(user);

      // if (!username) {
      //   alert("Please enter correctly your username or password")
      //   return
      // }
      let getData = await login(data)
      localStorage.setItem('access_token', getData)
      console.log(getData)

      setIsSuccess(true)
      router.push("/dashboard/employee")

    } catch (error) {
      console.error(error);
    }
  }

  if (isSuccess) {
    alert("Welcome")
    setIsSuccess(false)
    return
  }

  useEffect(() => {
    getRegister()
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Log <span className="text-blue-600">In</span>
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <input
              type="username"
              {...register("username", { required: true })}
              placeholder="Username"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.username && <p className="text-red-500 text-sm">Username is required</p>}
          </div>
          <div className='relative'>
            <input
              type={openEye ? "text" : "password"}
              {...register("password", {
                required: true,
                minLength: {
                  value: 4,
                  message: "Password should be longer"
                }
              })}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <span className='top-2 right-3 absolute cursor-pointer' onClick={() => setopenEye(!openEye)}>
              {password ?
                !openEye ? <EyeOff /> : <Eye />
                : ""}
            </span>
            {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
          </div>
          <input
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
          />
          <p className="mt-3 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/registration"
              className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition"
            >
              Registration
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
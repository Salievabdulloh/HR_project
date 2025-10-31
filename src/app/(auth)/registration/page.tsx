'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'
import { useGetStore } from '@/src/store/store'
import { useRouter } from 'next/navigation'

const Registration = () => {

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      phone: "909090909",
      password: "pleaseLetmein.7",
      confirmPassword: "pleaseLetmein.7",
      baseSalary: '2000',
      position: 'Junior',
      departmentId: 0,
      userRole: 'Employee',
      firstName: '',
      lastName: '',
    }
  })

  const { registration, register: user } = useGetStore()

  const [openEye, setopenEye] = useState(false)
  const [openEye2, setopenEye2] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const password = watch("password")
  const password2 = watch("confirmPassword")

  const router = useRouter()

  async function onSubmit(data: any) {
    try {
      const email = user.map(e => e.email)
      const userName = user.map(e => e.username)

      if (data.password !== data.confirmPassword) {
        alert("Password do not match")
        return
      }

      for (let i = 0; i <= email.length; i++) {
        console.log(email[i]);
        if (data.email === email[i]) {
          alert("This email has alredy been used")
          return
        }
        if (data.username === userName[i]) {
          alert("This email has alredy been used")
          return
        }
      }

      await registration(data)
      setIsSuccess(true)
      router.push("/login")
    } catch (error) {
      console.error(error);
    }
  }

  console.log(user)


  // useEffect(() => {
  //   getRegister()
  // }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Create <span className="text-blue-600">Account</span>
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <input
              type="text"
              {...register("username", { required: true })}
              placeholder="Username"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.username && <p className="text-red-500 text-sm">First username is required</p>}
          </div>
          <div>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
          </div>
          <div>
            <input
              type="number"
              {...register("phone", {
                required: true
              })}
              placeholder="Phone +992"
              maxLength={9}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.phone && <p className="text-red-500 text-sm">Phone is required</p>}
          </div>
          <div>
            <input
              type="number"
              {...register("baseSalary", {
                required: true
              })}
              placeholder="BaseSalary"
              maxLength={9}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.baseSalary && <p className="text-red-500 text-sm">BaseSalary is required</p>}
          </div>
          <div>
            <select
              {...register("departmentId", {
                required: true
              })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none">
              {/* <option value="">None</option> */}
              <option value="1">IT Department</option>
              <option value="2">Sales Department</option>
            </select>
            {errors.departmentId && <p className="text-red-500 text-sm">DepartmentId is required</p>}
          </div>
          <div>
            <select
              {...register("userRole", {
                required: true
              })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none">
              <option value="Employee">Employee</option>
              <option value="HR">HR</option>
            </select>
            {errors.userRole && <p className="text-red-500 text-sm">UserRole is required</p>}
          </div>
          <div>
            <select
              {...register("position", {
                required: true
              })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none">
              <option value="Intern">Intern</option>
              <option value="Junior">Junior</option>
              <option value="Middle">Middle</option>
              <option value="Senior">Senior</option>
            </select>
            {errors.position && <p className="text-red-500 text-sm">Position is required</p>}
          </div>
          <div>
            <input
              type="text"
              {...register("firstName", {
                required: true
              })}
              placeholder="FirstName"
              maxLength={9}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.firstName && <p className="text-red-500 text-sm">FirstName is required</p>}
          </div>
          <div>
            <input
              type="text"
              {...register("lastName", {
                required: true
              })}
              placeholder="LastName"
              maxLength={9}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.lastName && <p className="text-red-500 text-sm">LastName is required</p>}
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
          <div className='relative'>
            <input
              type={openEye2 ? "text" : "password"}
              {...register("confirmPassword", { required: true })}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <span className='top-2 right-3 absolute cursor-pointer' onClick={() => setopenEye2(!openEye2)}>{
              password2 ?
                !openEye2 ? <EyeOff /> : <Eye />
                : ""}</span>
            {errors.confirmPassword && <p className="text-red-500 text-sm">Confirm Password is required</p>}
          </div>
          <input
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
          />
          <p className="mt-3 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition"
            >
              Login
            </Link>
          </p>
        </form>
        <div className="">
          {/* {user} */}
        </div>
      </div>
    </div>
  )
}

export default Registration
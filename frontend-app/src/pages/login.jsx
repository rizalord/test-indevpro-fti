import { Field, Form, Formik } from "formik"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"
import http from "../config/axios"
import { login } from "../store/slices/authSlice"

export default function Login() {
  const [errMessage, setErrMessage] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state) => state.auth.user)

  // If user is already logged in, redirect to dashboard page
  useEffect(() => {
    if (user) {
      navigate("/dashboard")
    }

    document.title = "Login"
  }, [user])

  const loginSchema = Yup.object().shape({
    Name: Yup.string().required(),
    Password: Yup.string().required(),
  })

  const submit = async (values, { setSubmitting }) => {
    setSubmitting(true)
    setErrMessage(null)

    const { Name, Password } = values
    try {
      const response = await http.post("/auth/login", { Name, Password })
      const { user, token } = response.data.data
      dispatch(login({ user, token }))

      navigate("/dashboard")
    } catch (error) {
      const { message } = error.response.data
      setErrMessage(message)
    }

    setSubmitting(false)
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold  text-gray-900 md:text-2xl dark:text-white">
              Login
            </h1>

            {errMessage && (
              <div
                className="p-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                role="alert"
              >
                {errMessage}
              </div>
            )}

            <Formik
              initialValues={{ Name: "", Password: "" }}
              validationSchema={loginSchema}
              onSubmit={submit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <div className="space-y-4 md:space-y-6" action="#">
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Nama
                      </label>
                      <Field
                        type="text"
                        name="Name"
                        className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                          errors.Name && touched.Name ? "border-red-500" : ""
                        }`}
                        required
                      />
                      {errors.Name && touched.Name && (
                        <span className="text-red-500">{errors.Name}</span>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <Field
                        type="password"
                        name="Password"
                        placeholder="••••••••"
                        className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                          errors.Password && touched.Password
                            ? "border-red-500"
                            : ""
                        }`}
                        required
                      />
                      {errors.Password && touched.Password && (
                        <span className="text-red-500">{errors.Password}</span>
                      )}
                    </div>
                    <button
                      type="submit"
                      className={`w-full text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 ${isSubmitting &&
                        "opacity-50 cursor-not-allowed"}`}
                      disabled={isSubmitting}
                    >
                      Masuk
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  )
}

import React, { useEffect, useState } from "react"
import AppLayout from "../../layouts/AppLayout"
import * as Yup from "yup"
import http from "../../config/axios"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

export default function CreateUser() {
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    if (user.Status != 1) {
      navigate("/dashboard")
    }

    document.title = "Tambah User"
  }, [])

  const [errMessage, setErrMessage] = useState(null)

  const createUserSchema = Yup.object().shape({
    UserID: Yup.string().required(),
    Name: Yup.string().required(),
    Password: Yup.string()
      .required()
      .min(6),
  })

  const submit = async (values, { setSubmitting }) => {
    setSubmitting(true)
    setErrMessage(null)

    const { UserID, Name, Password } = values
    try {
      await http.post("/users", { UserID, Name, Password })
      navigate("/dashboard/users")
    } catch (error) {
      const { message } = error.response.data
      setErrMessage(message)
    }

    setSubmitting(false)
  }

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-4">Tambah User</h1>

      <Formik
        initialValues={{
          UserID: "",
          Name: "",
          Password: "",
        }}
        validationSchema={createUserSchema}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-6 max-w-lg">
              {errMessage && (
                <div
                  className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                  role="alert"
                >
                  {errMessage}
                </div>
              )}

              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                User ID
              </label>
              <Field
                type="text"
                name="UserID"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <div className="text-red-500 text-sm mt-2">
                <ErrorMessage name="UserID" />
              </div>
            </div>

            <div className="mb-6 max-w-lg">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Nama
              </label>
              <Field
                type="text"
                name="Name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John Doe"
                required
              />

              <div className="text-red-500 text-sm mt-2">
                <ErrorMessage name="Name" />
              </div>
            </div>

            <div className="mb-6 max-w-lg">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Password
              </label>
              <Field
                type="password"
                name="Password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="•••••••••"
                required
              />

              <div className="text-red-500 text-sm mt-2">
                <ErrorMessage name="Password" />
              </div>
            </div>

            <div className="flex flex-row justify-end">
              <button
                type="submit"
                className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }
                `}
                disabled={isSubmitting}
              >
                Tambah
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </AppLayout>
  )
}

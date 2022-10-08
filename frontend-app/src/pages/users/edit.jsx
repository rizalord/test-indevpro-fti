import React, { useEffect, useState } from "react"
import AppLayout from "../../layouts/AppLayout"
import * as Yup from "yup"
import http from "../../config/axios"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"

export default function EditUser() {
  const navigate = useNavigate()

  const [errMessage, setErrMessage] = useState(null)
  const [user, setUser] = useState(null)

  const { id } = useParams()

  const editUserSchema = Yup.object().shape({
    Name: Yup.string().required(),
    Password: Yup.string()
      .required()
      .min(6),
  })

  const submit = async (values, { setSubmitting }) => {
    setSubmitting(true)
    setErrMessage(null)

    const { Name, Password } = values
    try {
      await http.put(`/users/${id}`, { Name, Password })
      navigate("/dashboard/users")
    } catch (error) {
      const { message } = error.response.data
      setErrMessage(message)
    }

    setSubmitting(false)
  }

  const fetchUser = async () => {
    try {
      const { data } = await http.get(`/users/${id}`)
      setUser(data.data)
    } catch (error) {
      navigate("/dashboard/users")
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const userRedux = useSelector((state) => state.auth.user)

  useEffect(() => {
    if (userRedux.Status != 1) {
      navigate("/dashboard")
    }

    document.title = "Edit User"
  }, [])

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>

      {user && (
        <Formik
          initialValues={{
            Name: user.Name,
            Password: user.Password,
          }}
          validationSchema={editUserSchema}
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
                <input
                  type="text"
                  name="UserID"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 cursor-not-allowed"
                  required
                  disabled
                  value={id}
                />
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
                  className={`text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }
                `}
                  disabled={isSubmitting}
                >
                  Ubah
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </AppLayout>
  )
}

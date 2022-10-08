import React, { useEffect, useState } from "react"
import AppLayout from "../../layouts/AppLayout"
import * as Yup from "yup"
import http from "../../config/axios"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useSelector } from 'react-redux'

export default function EditBook() {
  const navigate = useNavigate()

  const [errMessage, setErrMessage] = useState(null)
  const [categories, setCategories] = useState([])
  const [book, setBook] = useState(null)

  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get("id")

  const editBookSchema = Yup.object().shape({
    Title: Yup.string().required(),
    Author: Yup.string().required(),
    Publisher: Yup.string().required(),
    Category: Yup.string().required(),
    Year: Yup.number().required(),
    AllowingToLoan: Yup.string().required(),
    DaysToLoan: Yup.number().required(),
    Status: Yup.string().required(),
    Type: Yup.string().required(),
    Copy: Yup.number().required(),
    Condition: Yup.string().required(),
    TimeOfRenewal: Yup.number().required(),
    Barcode: Yup.string().nullable(),
  })

  const submit = async (values, { setSubmitting }) => {
    setSubmitting(true)
    setErrMessage(null)

    try {
      values.Copy = values.Copy.toString()

      await http.put(`/books/${id}`, values)
      navigate("/dashboard/books")
    } catch (error) {
      const { message } = error.response.data
      setErrMessage(message)
    }

    setSubmitting(false)
  }

  const fetchCategories = async () => {
    try {
      const { data } = await http.get("/categories")
      setCategories(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchBook = async () => {
    try {
      const { data } = await http.get(`/books/${id}`)
      setBook(data.data)
    } catch (error) {
      navigate("/dashboard/books")
    }
  }

  useEffect(() => {
    fetchCategories()
    fetchBook()

    document.title = "Edit Buku"
  }, [])

  const userRedux = useSelector((state) => state.auth.user)

  useEffect(() => {
    if (userRedux.Status != 1) {
      navigate("/dashboard")
    }
  }, [])

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-4">Edit Buku</h1>

      {book && categories && (
        <Formik
          initialValues={{
            Title: book.Title,
            Author: book.Author,
            Publisher: book.Publisher,
            Category: book.Category,
            Year: book.Year,
            AllowingToLoan: book.AllowingToLoan,
            DaysToLoan: book.DaysToLoan,
            Status: book.Status,
            Type: book.Type,
            Copy: book.Copy,
            Condition: book.Condition,
            TimeOfRenewal: book.TimeOfRenewal,
            Barcode: book.Barcode,
          }}
          validationSchema={editBookSchema}
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

                {/* ID */}
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  ID
                </label>
                <input
                  type="text"
                  name="ID"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                cursor-not-allowed opacity-50`}
                  disabled
                  value={book.ID}
                />
              </div>

              {/* Title */}
              <div className="mb-6 max-w-lg">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Judul
                </label>
                <Field
                  type="text"
                  name="Title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Buku Ilahi"
                  required
                />

                <div className="text-red-500 text-sm mt-2">
                  <ErrorMessage name="Title" />
                </div>
              </div>

              {/* Author */}
              <div className="mb-6 max-w-lg">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Author
                </label>
                <Field
                  type="text"
                  name="Author"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />

                <div className="text-red-500 text-sm mt-2">
                  <ErrorMessage name="Author" />
                </div>
              </div>

              {/* Publisher */}
              <div className="mb-6 max-w-lg">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Penerbit
                </label>
                <Field
                  type="text"
                  name="Publisher"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />

                <div className="text-red-500 text-sm mt-2">
                  <ErrorMessage name="Publisher" />
                </div>
              </div>

              {/* Category */}
              <div className="mb-6 max-w-lg">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Category
                </label>
                <Field
                  as="select"
                  name="Category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.Category}>
                      {category.Category}
                    </option>
                  ))}
                </Field>

                <div className="text-red-500 text-sm mt-2">
                  <ErrorMessage name="Category" />
                </div>
              </div>

              {/* Year */}
              <div className="mb-6 max-w-lg">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Tahun
                </label>
                <Field
                  type="number"
                  name="Year"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />

                <div className="text-red-500 text-sm mt-2">
                  <ErrorMessage name="Year" />
                </div>
              </div>

              {/* AllowingToLoan */}
              <div className="mb-6 max-w-lg">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Boleh Dipinjam
                </label>
                <Field
                  as="select"
                  name="AllowingToLoan"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                >
                  <option value="Y">Ya</option>
                  <option value="N">Tidak</option>
                </Field>

                <div className="text-red-500 text-sm mt-2">
                  <ErrorMessage name="AllowingToLoan" />
                </div>
              </div>

              {/* DaysToLoan */}
              <div className="mb-6 max-w-lg">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Lama Peminjaman (Hari)
                </label>
                <Field
                  type="number"
                  name="DaysToLoan"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />

                <div className="text-red-500 text-sm mt-2">
                  <ErrorMessage name="DaysToLoan" />
                </div>
              </div>

              {/* Status */}
              <div className="mb-6 max-w-lg">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Status
                </label>
                <Field
                  as="select"
                  name="Status"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                >
                  <option value="ADA">ADA</option>
                  <option value="KELUAR">KELUAR</option>
                  <option value="HILANG">HILANG</option>
                </Field>

                <div className="text-red-500 text-sm mt-2">
                  <ErrorMessage name="Status" />
                </div>
              </div>

              {/* Type */}
              <div className="mb-6 max-w-lg">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Tipe
                </label>
                <Field
                  type="text"
                  name="Type"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />

                <div className="text-red-500 text-sm mt-2">
                  <ErrorMessage name="Type" />
                </div>
              </div>

              {/* Copy */}
              <div className="mb-6 max-w-lg">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Jumlah Copy
                </label>
                <Field
                  type="number"
                  name="Copy"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />

                <div className="text-red-500 text-sm mt-2">
                  <ErrorMessage name="Copy" />
                </div>
              </div>

              {/* Condition */}
              <div className="mb-6 max-w-lg">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Kondisi Buku
                </label>
                <Field
                  as="select"
                  name="Condition"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                >
                  <option value="BAIK">BAIK</option>
                  <option value="RUSAK">RUSAK</option>
                </Field>

                <div className="text-red-500 text-sm mt-2">
                  <ErrorMessage name="Condition" />
                </div>
              </div>

              {/* TimeOfRenewal */}
              <div className="mb-6 max-w-lg">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Lama Perpanjangan (Hari)
                </label>
                <Field
                  type="number"
                  name="TimeOfRenewal"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />

                <div className="text-red-500 text-sm mt-2">
                  <ErrorMessage name="TimeOfRenewal" />
                </div>
              </div>

              {/* Barcode */}
              <div className="mb-6 max-w-lg">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Barcode
                </label>
                <Field
                  type="text"
                  name="Barcode"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="NNNN-NNNN-NNNN-NNNN"
                />

                <div className="text-red-500 text-sm mt-2">
                  <ErrorMessage name="Barcode" />
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

import React, { useEffect, useState } from "react"
import AppLayout from "../../layouts/AppLayout"
import * as Yup from "yup"
import http from "../../config/axios"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useSelector } from 'react-redux'

export default function DetailBook() {
  const navigate = useNavigate()

  const [errMessage, setErrMessage] = useState(null)
  const [categories, setCategories] = useState([])
  const [book, setBook] = useState(null)

  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get("id")

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
    document.title = "Detail Buku"
  }, [])

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-4">Detail Buku</h1>

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
                cursor-not-allowed opacity-80`}
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
                <input
                  type="text"
                  name="Title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-not-allowed opacity-80"
                  placeholder="Buku Ilahi"
                  required
                  disabled
                  value={book.Title}
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-not-allowed opacity-80"
                  required
                  disabled
                  value={book.Author}
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
                <input
                  type="text"
                  name="Publisher"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-not-allowed opacity-80"
                  required
                  disabled
                  value={book.Publisher}
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
                <select
                  as="select"
                  name="Category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-not-allowed opacity-80"
                  required
                  disabled
                  value={book.Category}
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.Category}>
                      {category.Category}
                    </option>
                  ))}
                </select>

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
                <input
                  type="number"
                  name="Year"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-not-allowed opacity-80"
                  required
                  disabled
                  value={book.Year}
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
                <select
                  as="select"
                  name="AllowingToLoan"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-not-allowed opacity-80"
                  required
                  disabled
                  value={book.AllowingToLoan}
                >
                  <option value="Y">Ya</option>
                  <option value="N">Tidak</option>
                </select>

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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-not-allowed opacity-80"
                  required
                  disabled
                  value={book.DaysToLoan}
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
                <select
                  name="Status"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-not-allowed opacity-80"
                  required
                  disabled
                  value={book.Status}
                >
                  <option value="ADA">ADA</option>
                  <option value="KELUAR">KELUAR</option>
                  <option value="HILANG">HILANG</option>
                </select>

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
                <input
                  type="text"
                  name="Type"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-not-allowed opacity-80"
                  required
                  disabled
                  value={book.Type}
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
                <input
                  type="number"
                  name="Copy"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-not-allowed opacity-80"
                  required
                  disabled
                  value={book.Copy}
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
                <select
                  as="select"
                  name="Condition"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-not-allowed opacity-80"
                  required
                  disabled
                  value={book.Condition}
                >
                  <option value="BAIK">BAIK</option>
                  <option value="RUSAK">RUSAK</option>
                </select>

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
                <input
                  type="number"
                  name="TimeOfRenewal"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-not-allowed opacity-80"
                  required
                  disabled
                  value={book.TimeOfRenewal}
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
                <input
                  type="text"
                  name="Barcode"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-not-allowed opacity-80"
                  placeholder="NNNN-NNNN-NNNN-NNNN"
                  disabled
                  value={book.Barcode}
                />

                <div className="text-red-500 text-sm mt-2">
                  <ErrorMessage name="Barcode" />
                </div>
              </div>

              
            </Form>
          )}
        </Formik>
      )}
    </AppLayout>
  )
}

import React, { useEffect } from "react"
import DeleteModal from "../../components/modals/DeleteModal"
import http from "../../config/axios"
import AppLayout from "../../layouts/AppLayout"
import * as Yup from "yup"
import { Field, Form, Formik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

export default function Books() {
  const navigate = useNavigate()

  const [books, setBooks] = React.useState([])
  const [links, setLinks] = React.useState([])
  const [from, setFrom] = React.useState(0)
  const [to, setTo] = React.useState(0)
  const [total, setTotal] = React.useState(0)
  const [title, setTitle] = React.useState("")

  const [showModal, setShowModal] = React.useState(false)
  const [deleteId, setDeleteId] = React.useState(null)

  const searchSchema = Yup.object().shape({ Title: Yup.string() })

  const userRedux = useSelector((state) => state.auth.user)

  useEffect(() => {
    fetchBooks()

    document.title = "Data Buku"
  }, [])

  const fetchBooks = async (page = 1) => {
    const response = await http.get(`/books?page=${page}&title=${title}`)
    setBooks(response.data.data.data)
    setLinks(response.data.data.links)

    setFrom(response.data.data.from)
    setTo(response.data.data.to)
    setTotal(response.data.data.total)
  }

  const searchBooks = async (values) => {
    const title = values.Title
    setTitle(title)

    const response = await http.get(`/books?title=${title}`)
    setBooks(response.data.data.data)
    setLinks(response.data.data.links)

    setFrom(response.data.data.from)
    setTo(response.data.data.to)
    setTotal(response.data.data.total)
  }

  const onSelectDelete = (id) => {
    setDeleteId(id)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const deleteBook = async () => {
    await http.delete(`/books/${deleteId}`)

    navigate(0)
  }

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-4">Data Buku</h1>

      <div className="overflow-x-auto relative sm:rounded-lg">
        <div className="pb-4 bg-white dark:bg-gray-900">
          <div className="flex flex-col md:flex-row justify-between mb-2">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div>
              <Formik
                initialValues={{ Title: "" }}
                validationSchema={searchSchema}
                onSubmit={searchBooks}
              >
                {(_) => (
                  <Form>
                    <div className="flex flex-row items-center mb-2">
                      <div className="relative mt-1 md:ml-1 w-full">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <Field
                          type="text"
                          name="Title"
                          id="table-search"
                          className="block p-2 pl-10 w-full md:w-80  text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Cari buku berdasarkan judul"
                        />
                      </div>

                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-md ml-2"
                      >
                        Cari
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>

            {userRedux.Status == 1 && (
              <div className="relative mt-1 mr-2">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/books/create")}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Tambah Buku
                </button>
              </div>
            )}
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                ID
              </th>
              <th scope="col" className="py-3 px-6">
                Judul
              </th>
              <th scope="col" className="py-3 px-6">
                AKSI
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={index}
              >
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {book.ID}
                </th>
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {book.Title}
                </th>
                <td className="py-4 px-6 flex flex-row">
                  <Link
                    to={`/dashboard/books/detail?id=${book.ID}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Detail
                  </Link>
                  {userRedux.Status == 1 && (
                    <div className="flex flex-row">
                      <span className="mx-2">|</span>
                      <Link
                        to={`/dashboard/books/edit?id=${book.ID}`}
                        className="font-medium text-yellow-600 dark:text-yellow-500 hover:underline"
                      >
                        Edit
                      </Link>
                    </div>
                  )}

                  {userRedux.Status == 1 && (
                    <div className="flex flex-row">
                      <span className="mx-2">|</span>
                      <button
                        className="font-medium text-red-600 hover:underline"
                        data-modal-toggle="popup-modal"
                        onClick={() => onSelectDelete(book.ID)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <nav
          className="flex flex-col gap-5 justify-between items-center pt-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Menampilkan{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {from}-{to}
            </span>{" "}
            dari{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {total}
            </span>
          </span>
          <ul className="inline-flex items-center -space-x-px">
            {links.map((link, index) =>
              // if index is 0, then it's previous button
              index === 0 ? (
                <li
                  key={index}
                  onClick={() =>
                    link.url ? fetchBooks(link.url.split("=")[1]) : null
                  }
                >
                  <div className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer">
                    <span className="sr-only">Sebelumnya</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </li>
              ) : index === links.length - 1 ? (
                // if index is last, then it's next button
                <li
                  key={index}
                  onClick={() =>
                    link.url ? fetchBooks(link.url.split("=")[1]) : null
                  }
                >
                  <div className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer">
                    <span className="sr-only">Lanjut</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </li>
              ) : (
                <li
                  key={index}
                  onClick={() => fetchBooks(link.url.split("=")[1])}
                >
                  <div className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer">
                    {link.label}
                  </div>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>

      {/* delete modal */}
      <DeleteModal
        show={showModal}
        handleClose={closeModal}
        handleDelete={deleteBook}
        message="Apakah anda yakin ingin menghapus buku ini?"
      />
    </AppLayout>
  )
}

import { createBrowserRouter } from 'react-router-dom'
import Books from './pages/books'
import CreateBook from './pages/books/create'
import DetailBook from './pages/books/detail'
import EditBook from './pages/books/edit'
import Dashboard from './pages/dashboard'
import Login from './pages/login'
import Users from './pages/users'
import CreateUser from './pages/users/create'
import EditUser from './pages/users/edit'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dashboard/users",
    element: <Users />,
  },
  {
    path: "/dashboard/users/create",
    element: <CreateUser />,
  },
  {
    path: "/dashboard/users/edit/:id",
    element: <EditUser />,
  },
  {
    path: "/dashboard/books",
    element: <Books />,
  },
  {
    path: "/dashboard/books/create",
    element: <CreateBook />,
  },
  {
    path: "/dashboard/books/edit",
    element: <EditBook />,
  },
  {
    path: "/dashboard/books/detail",
    element: <DetailBook />,
  },
])

export default router
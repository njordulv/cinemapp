import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { clearError, selectErrorMessage } from '@/redux/slices/errorSlice'
import 'react-toastify/dist/ReactToastify.css'

const Error = () => {
  const errorMessage = useSelector(selectErrorMessage)
  const dispatch = useDispatch()

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage, {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        className: 'text-sm',
      })
      dispatch(clearError())
    }
  }, [errorMessage, dispatch])

  return (
    <>
      <ToastContainer />
    </>
  )
}

export default Error

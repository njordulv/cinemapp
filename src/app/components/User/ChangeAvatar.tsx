import { useState, useRef, useEffect } from 'react'
import { Input } from '@nextui-org/react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getFirestore, doc, updateDoc } from 'firebase/firestore'
import { auth, storage } from '@/config/firebase'
import { setAvatar } from '@/redux/slices/userSlice'
import { useAppDispatch } from '@/hooks/reduxHooks'

export default function ChangeAvatar() {
  const dispatch = useAppDispatch()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const errorTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const successTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current)
      }
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current)
      }
    }
  }, [])

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current)
    }
    if (successTimeoutRef.current) {
      clearTimeout(successTimeoutRef.current)
    }

    if (!auth.currentUser) {
      setError('User is not authenticated')
      errorTimeoutRef.current = setTimeout(() => setError(''), 3000)
      return
    }

    const file = event.target.files?.[0]
    if (file && !file.type.startsWith('image/')) {
      setError('This is not an image!')
      errorTimeoutRef.current = setTimeout(() => setError(''), 3000)
      return
    }

    if (file) {
      const userId = auth.currentUser.uid
      const storageRef = ref(storage, `user_avatars/${userId}.jpg`)

      try {
        await uploadBytes(storageRef, file)
        const downloadURL = await getDownloadURL(storageRef)
        dispatch(setAvatar(downloadURL))

        const firestore = getFirestore()
        const userDoc = doc(firestore, 'users', userId)
        await updateDoc(userDoc, { photoURL: downloadURL })

        setSuccess('File uploaded successfully!')
        successTimeoutRef.current = setTimeout(() => setSuccess(''), 3000)
      } catch (error) {
        setError(`Error uploading file: ${error}`)
        errorTimeoutRef.current = setTimeout(() => setError(''), 3000)
      }
    }
  }

  return (
    <>
      <div className="flex flex-col gap-3 relative pb-5">
        <Input
          type="file"
          size="md"
          label="Change avatar"
          placeholder="Choose file"
          labelPlacement="outside"
          classNames={{
            innerWrapper: 'relative top-[7px]',
          }}
          onChange={handleFileUpload}
        />
        <div className="absolute bottom-0 text-red text-tiny">
          {error && <span className="text-red">{error}</span>}
          {success && <span className="text-secondary">{success}</span>}
        </div>
      </div>
    </>
  )
}

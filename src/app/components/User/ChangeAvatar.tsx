import { useState } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getFirestore, doc, updateDoc } from 'firebase/firestore'
import { auth, storage } from '@/config/firebase'
import { setAvatar } from '@/redux/slices/userSlice'
import { useAppDispatch } from '@/hooks/reduxHooks'

export default function ChangeAvatar() {
  const dispatch = useAppDispatch()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!auth.currentUser) {
      setError('User is not authenticated')
      return
    }

    const file = event.target.files?.[0]
    if (file && !file.type.startsWith('image/')) {
      setError('This is not an image!')
      return
    }

    if (file) {
      const userId = auth.currentUser.uid
      const storageRef = ref(
        storage,
        `user_avatars/${auth.currentUser?.uid}.jpg`
      )

      try {
        await uploadBytes(storageRef, file)
        const downloadURL = await getDownloadURL(storageRef)
        dispatch(setAvatar(downloadURL))

        const firestore = getFirestore()
        const userDoc = doc(firestore, 'users', userId)
        await updateDoc(userDoc, { avatarURL: downloadURL })

        setSuccess('File uploaded successfully!')
      } catch (error) {
        setError(`Error uploading file: ${error}`)
      }
    }
  }

  return (
    <>
      <div className="flex flex-col items-start gap-3">
        <div>
          <span>Change avatar </span>
          <input type="file" onChange={handleFileUpload} />
        </div>
        {error && <div className="text-red text-tiny">{error}</div>}
        {success && <div className="text-secondary text-tiny">{success}</div>}
      </div>
    </>
  )
}

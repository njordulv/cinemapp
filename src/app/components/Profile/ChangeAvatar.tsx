import { useState } from 'react'
import { Spinner } from '@nextui-org/react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getFirestore, doc, updateDoc } from 'firebase/firestore'
import { auth, storage } from '@/config/firebase'

export default function ChangeAvatar() {
  const [uploading, setUploading] = useState(false)
  const [avatarURL, setAvatarURL] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault()
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
      setUploading(true)
      const userId = auth.currentUser.uid
      const storageRef = ref(
        storage,
        `user_avatars/${auth.currentUser?.uid}.jpg`
      )

      try {
        await uploadBytes(storageRef, file)
        const downloadURL = await getDownloadURL(storageRef)
        setAvatarURL(downloadURL)

        const firestore = getFirestore()
        const userDoc = doc(firestore, 'users', userId)
        await updateDoc(userDoc, { avatarURL: downloadURL })

        setSuccess('File uploaded successfully!')
      } catch (error) {
        setError(`Error uploading file: ${error}`)
      }

      setUploading(false)
    }
  }

  return (
    <div>
      <div className="flex flex-col items-start gap-2">
        <div>
          <input type="file" onChange={handleFileUpload} disabled={uploading} />
          {error && <div className="warning">{error}</div>}
          {success && <div className="secondary">{success}</div>}
        </div>
        {uploading && <Spinner size="sm" color="default" />}
        {avatarURL && (
          <img src={avatarURL} alt="User Avatar" width={100} height={100} />
        )}
      </div>
    </div>
  )
}

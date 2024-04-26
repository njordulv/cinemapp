import { Button, Input } from '@nextui-org/react'
import { getFirestore, doc, updateDoc } from 'firebase/firestore'
import { auth } from '@/config/firebase'
import { useAppSelector } from '@/hooks/reduxHooks'
import { selectUserName } from '@/redux/slices/userSlice'
import { useState } from 'react'

export default function ChangeName() {
  const userName = useAppSelector(selectUserName) || ''
  const [inputValue, setInputValue] = useState(userName)

  const handleInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleSaveName = async () => {
    const user = auth.currentUser

    if (user) {
      const userId = user.uid
      const firestore = getFirestore()
      const userDocRef = doc(firestore, 'users', userId)
      await updateDoc(userDocRef, { name: inputValue })
    }
  }

  return (
    <div className="flex gap-3 items-end">
      <Input
        type="text"
        size="md"
        label="Change your name"
        labelPlacement="outside"
        placeholder="Name"
        value={inputValue}
        onChange={handleInputName}
      />
      <Button size="md" onClick={handleSaveName}>
        Save
      </Button>
    </div>
  )
}

import { Button, Input } from '@nextui-org/react'
import { getFirestore, doc, updateDoc } from 'firebase/firestore'
import { auth } from '@/config/firebase'
import { useAppSelector, useAppDispatch } from '@/hooks/reduxHooks'
import { setUserName, selectUserName } from '@/redux/slices/userSlice'

export default function ChangeName() {
  const dispatch = useAppDispatch()
  const userName = useAppSelector(selectUserName) || ''

  const handleInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    dispatch(setUserName(value))
  }

  const handleSaveName = async () => {
    const user = auth.currentUser

    if (user) {
      const userId = user.uid
      const firestore = getFirestore()
      const userDocRef = doc(firestore, 'users', userId)
      await updateDoc(userDocRef, { name: userName })
      dispatch(setUserName(userName))
    }
  }

  return (
    <div className="flex gap-3 items-end relative pb-10">
      <Input
        type="text"
        size="md"
        label="Change your name"
        labelPlacement="outside"
        placeholder="Name"
        value={userName}
        onChange={handleInputName}
      />
      <Button size="md" onClick={handleSaveName}>
        Save
      </Button>
    </div>
  )
}

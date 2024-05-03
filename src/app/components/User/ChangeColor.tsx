import { Select, SelectItem, Avatar, Button } from '@nextui-org/react'
import { getFirestore, doc, updateDoc } from 'firebase/firestore'
import { auth } from '@/config/firebase'
import { useAppSelector, useAppDispatch } from '@/hooks/reduxHooks'
import { setAccentColor, selectAccentColor } from '@/redux/slices/userSlice'

export default function ChangeColor() {
  const dispatch = useAppDispatch()
  const accentColor = useAppSelector(selectAccentColor) || ''

  const handleSelectColor = (selectedColor: string) => {
    dispatch(setAccentColor(selectedColor))
  }

  const handleAccentColor = async () => {
    const user = auth.currentUser
    if (user) {
      const userId = user.uid
      const firestore = getFirestore()
      const userDocRef = doc(firestore, 'users', userId)
      await updateDoc(userDocRef, { color: accentColor })
      dispatch(setAccentColor(accentColor))
    }
  }

  return (
    <div className="flex gap-3 items-end relative pb-5">
      <Select
        label="Select accent color"
        size="md"
        placeholder={accentColor ? accentColor : 'Select accent color'}
        labelPlacement="outside"
        value={accentColor}
        onChange={(e) => handleSelectColor(e.target.value)}
        startContent={
          <Avatar
            alt={accentColor}
            className="w-5 h-5"
            color={
              accentColor as 'default' | 'primary' | 'secondary' | 'success'
            }
            icon=""
          />
        }
      >
        <SelectItem
          key="primary"
          startContent={
            <Avatar alt="primary" className="w-5 h-5" color="primary" icon="" />
          }
        >
          Red
        </SelectItem>
        <SelectItem
          key="secondary"
          startContent={
            <Avatar
              alt="secondary"
              className="w-5 h-5"
              color="secondary"
              icon=""
            />
          }
        >
          Cyan
        </SelectItem>
        <SelectItem
          key="success"
          startContent={
            <Avatar alt="success" className="w-5 h-5" color="success" icon="" />
          }
        >
          Green
        </SelectItem>
      </Select>
      <Button size="md" onClick={handleAccentColor}>
        Save
      </Button>
    </div>
  )
}

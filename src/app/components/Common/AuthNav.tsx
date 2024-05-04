'use client'

import Link from 'next/link'
import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  NavbarItem,
  Avatar,
} from '@nextui-org/react'
import { SlUser } from 'react-icons/sl'
import { useAuth } from '@/hooks/useAuth'
import { authItems } from '@/utils/menuItems'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { logoutUser } from '@/redux/slices/userSlice'

export default function AuthNav() {
  const dispatch = useAppDispatch()
  const { isAuth, email, photoURL } = useAuth()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <>
      {!isAuth ? (
        authItems.map((item) => (
          <NavbarItem key={item.key}>
            <Link
              href={item?.link}
              className="hover:text-red text-small font-normal"
            >
              {item?.name}
            </Link>
          </NavbarItem>
        ))
      ) : (
        <Dropdown
          placement="bottom-end"
          className="bg-black rounded-md"
          backdrop="blur"
        >
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              color="default"
              size="sm"
              showFallback
              src={photoURL || ''}
              className="transition-transform text-md capitalize"
              fallback={
                <SlUser
                  className="text-default-500"
                  fill="currentColor"
                  size={18}
                />
              }
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile">Signed in as {email}</DropdownItem>
            <DropdownItem key="dashboard" href="/dashboard">
              Dashboard
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </>
  )
}

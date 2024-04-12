'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from '@nextui-org/react'
import { IoIosArrowDown } from 'react-icons/io'
import MobileNav from './MobileNav'
import SearchBar from '@/components/Search/SearchBar'
import Logo from '@/components/Common/Logo'
import { movieItems, tvItems, authItems } from '@/utils/menuItems'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

const Navigation = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const icons = {
    chevron: <IoIosArrowDown fill="currentColor" size={16} />,
  }

  const { user, logOut } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logOut()
      router.push('/login')
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <>
      <Navbar
        isBordered
        shouldHideOnScroll
        isBlurred={false}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        classNames={{
          wrapper: 'max-w-[1170px] px-4',
        }}
      >
        <NavbarContent as="div" justify="start">
          <NavbarBrand>
            <Logo />
          </NavbarBrand>
          <NavbarContent
            className="hidden sm:flex max-w-[1170px] gap-4"
            justify="start"
          >
            <Dropdown className="bg-black rounded-md">
              <NavbarItem>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="p-0 bg-transparent data-[hover=true]:bg-transparent text-white data-[hover=true]:text-red"
                    endContent={icons.chevron}
                    radius="sm"
                    variant="light"
                  >
                    Movies
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                aria-label="Cinemapp popular movies"
                itemClasses={{
                  base: 'gap-2',
                }}
              >
                {movieItems.map((item) => (
                  <DropdownItem
                    key={item.key}
                    className="data-[hover=true]:bg-transparent data-[hover=true]:text-red"
                  >
                    <Link href={item.link}>{item.name}</Link>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown className="bg-black rounded-md">
              <NavbarItem>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="p-0 bg-transparent data-[hover=true]:bg-transparent text-white data-[hover=true]:text-red"
                    endContent={icons.chevron}
                    radius="sm"
                    variant="light"
                  >
                    TV Shows
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                aria-label="Cinemapp popular TV shows"
                itemClasses={{
                  base: 'gap-2',
                }}
              >
                {tvItems.map((item) => (
                  <DropdownItem
                    key={item.key}
                    className="data-[hover=true]:bg-transparent data-[hover=true]:text-red"
                  >
                    <Link href={item.link}>{item.name}</Link>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <NavbarItem>
              <Link
                href="/person"
                className="hover:text-red text-small font-normal"
              >
                People
              </Link>
            </NavbarItem>
          </NavbarContent>
        </NavbarContent>
        <NavbarContent justify="end" className="hidden sm:flex">
          {!user.uid ? (
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
            <>
              <Dropdown placement="bottom-end" backdrop="blur">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="default"
                    name="Jason Hughes"
                    size="sm"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">zoey@example.com</p>
                  </DropdownItem>
                  <DropdownItem key="dashboard" href="/dashboard">
                    Dashboard
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    color="danger"
                    onClick={handleLogout}
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </>
          )}
          <SearchBar />
        </NavbarContent>
        <NavbarContent className="sm:hidden" justify="end">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          />
        </NavbarContent>
        <MobileNav />
      </Navbar>
      {children}
    </>
  )
}

export default Navigation

'use client'

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
} from '@nextui-org/react'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { setIsMenuOpen, menuSelector } from '@/redux/slices/menuSlice'
import Logo from '@/components/Common/Logo'
import DesktopNav from '@/components/Common/DesktopNav'
import MobileNav from '@/components/Common/MobileNav'
import AuthNav from '@/components/Common/AuthNav'
import SearchBar from '@/components/Search/SearchBar'

const Navigation = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch()
  const isMenuOpen = useAppSelector(menuSelector)

  const handleMenuOpenChange = (isOpen: boolean) => {
    dispatch(setIsMenuOpen(isOpen))
  }

  return (
    <>
      <Navbar
        isBordered
        shouldHideOnScroll
        isBlurred={false}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={handleMenuOpenChange}
        classNames={{
          wrapper: 'max-w-[1170px] px-4',
        }}
      >
        <NavbarContent as="div" justify="start">
          <NavbarBrand>
            <Logo />
          </NavbarBrand>
          <DesktopNav />
        </NavbarContent>
        <NavbarContent justify="end" className="hidden md:flex">
          <AuthNav />
          <SearchBar />
        </NavbarContent>
        <NavbarContent className="md:hidden" justify="end">
          <AuthNav />
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

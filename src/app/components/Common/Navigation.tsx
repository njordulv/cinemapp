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
} from '@nextui-org/react'
import { IoIosArrowDown } from 'react-icons/io'
import MobileNav from './MobileNav'
import SearchBar from '@/components/Search/SearchBar'
import Logo from '@/components/Common/Logo'
import { movieItems, tvItems } from '@/utils/menuItems'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const icons = {
    chevron: <IoIosArrowDown fill="currentColor" size={16} />,
  }

  return (
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
      <NavbarBrand>
        <Logo />
      </NavbarBrand>
      <NavbarContent
        className="hidden sm:flex max-w-[1170px] gap-4"
        justify="center"
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
      <NavbarContent justify="end" className="hidden sm:flex">
        <SearchBar />
      </NavbarContent>
      <NavbarContent className="sm:hidden" justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
      </NavbarContent>
      <MobileNav />
    </Navbar>
  )
}

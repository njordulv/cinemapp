'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from '@nextui-org/react'
import { IoIosArrowDown } from 'react-icons/io'
import Logo from '@/components/Common/Logo'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const icons = {
    chevron: <IoIosArrowDown fill="currentColor" size={16} />,
  }

  return (
    <Navbar
      isBordered
      isBlurred={false}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
      </NavbarContent>
      <NavbarBrand>
        <Logo />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Dropdown className="bg-black rounded-md">
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-white data-[hover=true]:text-soft"
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
            <DropdownItem
              key="popular movies"
              className="data-[hover=true]:bg-transparent data-[hover=true]:text-soft"
            >
              <Link href="/">Popular</Link>
            </DropdownItem>
            <DropdownItem
              key="top rated movies"
              className="data-[hover=true]:bg-transparent data-[hover=true]:text-soft"
            >
              <Link href="/top-rated">Top Rated</Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown className="bg-black rounded-md">
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-white data-[hover=true]:text-soft"
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
            <DropdownItem
              key="Popular TV Shows"
              className="data-[hover=true]:bg-transparent data-[hover=true]:text-soft"
            >
              <Link href={`/tv`}>Popular</Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavbarItem>
          <Link
            href="/person"
            className="hover:text-soft text-small font-normal"
          >
            People
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end"></NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem key="Popular Movies">
          <Link href="/">Popular Movies</Link>
        </NavbarMenuItem>
        <NavbarMenuItem key="Popular TV Shows">
          <Link href="/tv">Popular TV Shows</Link>
        </NavbarMenuItem>
        <NavbarMenuItem key="People">
          <Link href="/person">People</Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}

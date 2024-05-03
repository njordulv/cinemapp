import Link from 'next/link'
import {
  NavbarContent,
  NavbarItem,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from '@nextui-org/react'
import { IoIosArrowDown } from 'react-icons/io'
import { movieItems, tvItems } from '@/utils/menuItems'

export default function DesktopNav() {
  const icons = {
    chevron: <IoIosArrowDown fill="currentColor" size={16} />,
  }

  return (
    <>
      <NavbarContent
        className="hidden md:flex max-w-[1170px] gap-4"
        justify="start"
      >
        <Dropdown className="bg-black rounded-md" backdrop="blur">
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="bg-transparent data-[hover=true]:bg-transparent text-white data-[hover=true]:text-red p-0 gap-1 justify-end"
                endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
                Movies
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu aria-label="Cinemapp popular movies" variant="flat">
            {movieItems.map((item) => (
              <DropdownItem key={item.key}>
                <Link href={item.link}>{item.name}</Link>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Dropdown className="bg-black rounded-md" backdrop="blur">
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="bg-transparent data-[hover=true]:bg-transparent text-white data-[hover=true]:text-red p-0 gap-1"
                endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
                TV Shows
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu aria-label="Cinemapp popular TV-Shows" variant="flat">
            {tvItems.map((item) => (
              <DropdownItem key={item.key}>
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
    </>
  )
}

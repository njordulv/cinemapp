'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react'
import { Tooltip, Button } from '@nextui-org/react'
import { IoIosArrowDown } from 'react-icons/io'

export default function Nav() {
  const locale = useLocale()
  const icons = {
    chevron: <IoIosArrowDown fill="currentColor" size={16} />,
  }

  return (
    <nav className="flex gap-4">
      <Dropdown className="bg-darker rounded-md">
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
        <DropdownMenu aria-label="Dropdonw menu">
          <DropdownItem className="text-soft data-[hover=true]:bg-transparent data-[hover=true]:text-white">
            <Link href={`/${locale}/`}>Popular</Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown className="bg-darker rounded-md">
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
        <DropdownMenu aria-label="Dropdonw menu">
          <DropdownItem className="text-soft data-[hover=true]:bg-transparent data-[hover=true]:text-white">
            <Link href={`/${locale}/tv/`}>Popular</Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </nav>
  )
}

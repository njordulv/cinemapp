import Link from 'next/link'
import { NavbarMenuItem, NavbarMenu } from '@nextui-org/react'
import { mobileItems } from '@/utils/menuItems'
import SearchBar from '@/components/Search/SearchBar'

export default function MobileNav() {
  return (
    <NavbarMenu className="px-4">
      <NavbarMenuItem key="Search Bar" className="pb-4">
        <SearchBar />
      </NavbarMenuItem>
      {mobileItems.map((item) => (
        <NavbarMenuItem key={item.key}>
          <Link href={item.link}>{item.name}</Link>
        </NavbarMenuItem>
      ))}
    </NavbarMenu>
  )
}

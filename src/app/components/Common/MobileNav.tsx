import { useRouter } from 'next/navigation'
import { NavbarMenuItem, NavbarMenu, Button } from '@nextui-org/react'
import { mobileItems } from '@/utils/menuItems'
import SearchBar from '@/components/Search/SearchBar'

interface MenuProps {
  setIsMenuOpen: (isOpen: boolean) => void
}

export default function MobileNav({ setIsMenuOpen }: MenuProps) {
  const router = useRouter()

  const menuHandler = (link: string) => {
    setIsMenuOpen(false)
    router.push(link)
  }

  return (
    <NavbarMenu className="px-4">
      <NavbarMenuItem key="Search Bar" className="pb-4">
        <SearchBar />
      </NavbarMenuItem>
      {mobileItems.map((item) => (
        <NavbarMenuItem key={item.key}>
          <Button
            size="lg"
            color="default"
            variant="ghost"
            fullWidth
            onClick={() => menuHandler(item.link)}
          >
            {item.name}
          </Button>
        </NavbarMenuItem>
      ))}
    </NavbarMenu>
  )
}

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
    <NavbarMenu className="px-4 max-h-full">
      <NavbarMenuItem key="Search Bar">
        <SearchBar />
      </NavbarMenuItem>
      {mobileItems.map((item) => (
        <NavbarMenuItem key={item.key}>
          <Button
            size="lg"
            color="default"
            variant="ghost"
            className="border-1 max-h-[44px]"
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

'use client'

import Link from 'next/link'
import { NavbarMenuItem, NavbarMenu } from '@nextui-org/react'
import SearchBar from '@/components/Search/SearchBar'

export default function MobileNav() {
  return (
    <>
      <NavbarMenu className="px-4">
        <NavbarMenuItem key="Search Bar" className="pb-4">
          <SearchBar />
        </NavbarMenuItem>
        <NavbarMenuItem key="Trending Movies">
          <Link href="/movies/trending">Trending</Link>
        </NavbarMenuItem>
        <NavbarMenuItem key="Popular Movies">
          <Link href="/">Popular Movies</Link>
        </NavbarMenuItem>
        <NavbarMenuItem key="Top Rated Movies">
          <Link href="/movies/top-rated">Top Rated</Link>
        </NavbarMenuItem>
        <NavbarMenuItem key="Upcoming Movies">
          <Link href="/movies/upcoming">Upcoming</Link>
        </NavbarMenuItem>
        <NavbarMenuItem key="Now Playing Movies">
          <Link href="/movies/upcoming">Now Playing</Link>
        </NavbarMenuItem>
        <NavbarMenuItem key="Trending TV Shows">
          <Link href="/tv/trending">Trending Shows</Link>
        </NavbarMenuItem>
        <NavbarMenuItem key="Popular TV Shows">
          <Link href="/tv">Popular TV Shows</Link>
        </NavbarMenuItem>
        <NavbarMenuItem key="Top Rated TV Shows">
          <Link href={`/tv/top-rated`}>Top Rated TV Shows</Link>
        </NavbarMenuItem>
        <NavbarMenuItem key="Airing Today">
          <Link href={`/tv/airing-today`}>Airing Today</Link>
        </NavbarMenuItem>
        <NavbarMenuItem key="On TV">
          <Link href={`/tv/on-the-air`}>On TV</Link>
        </NavbarMenuItem>
        <NavbarMenuItem key="People">
          <Link href="/person">People</Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </>
  )
}

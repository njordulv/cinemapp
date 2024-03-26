'use client'

import { useRouter } from 'next/navigation'
import { useRef, useEffect } from 'react'
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection,
  Avatar,
} from '@nextui-org/react'
import { useAsyncList } from '@react-stately/data'
import { IoSearchOutline } from 'react-icons/io5'
import { SearchTypes } from '@/types/data'
import { formatReleaseYear } from '@/utils/formatDate'

interface AutoFillProps {
  onClose: () => void
}

const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL
const NO_IMAGE = process.env.NEXT_PUBLIC_NO_IMAGE

const AutoFill: React.FC<AutoFillProps> = ({ onClose }) => {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const headingClasses =
    'flex w-full sticky top-1 z-20 py-1.5 px-2 m-0 bg-default-800 shadow-small rounded-small text-grey uppercase'

  useEffect(() => inputRef.current?.focus(), [])

  let list = useAsyncList<SearchTypes>({
    async load({ signal, filterText }) {
      const res = await fetch(
        `/api/search?type=multi&query=${filterText}&searchType=multi`,
        {
          signal,
        }
      )
      const json = await res.json()
      return { items: json.results }
    },
  })

  const autoCompleteItems = (items: any[], type: string) => {
    return items
      ?.filter((item) => item.media_type === type)
      .map((item) => (
        <AutocompleteItem
          key={item.id}
          onSelect={() => {
            onClose()
            router.push(`/${item.media_type}/${item.id}`)
          }}
        >
          <div className="flex gap-2 items-center">
            <Avatar
              src={
                item.poster_path
                  ? `${BASE_IMAGE_URL}w45${item.poster_path}`
                  : NO_IMAGE
              }
              alt={item.title || item.name}
              className="flex-shrink-0"
              radius="sm"
              size="sm"
              fallback={NO_IMAGE}
            />
            <div className="flex flex-col">
              <span className="text-small">{item.title || item.name}</span>
              <span className="text-tiny text-default-400">
                {formatReleaseYear(
                  item.release_date || item.first_air_date || ''
                )}
              </span>
            </div>
          </div>
        </AutocompleteItem>
      ))
  }

  return (
    <Autocomplete
      ref={inputRef}
      className="max-w-md"
      inputValue={list.filterText}
      isLoading={list.isLoading}
      items={list.items || []}
      label="Type to search..."
      variant="bordered"
      onInputChange={(value) => list.setFilterText(value)}
      onKeyDown={(e: any) => e.continuePropagation()}
      radius="md"
      classNames={{
        base: 'max-w-md',
        listboxWrapper: 'max-h-[320px]',
        selectorButton: 'text-white',
        clearButton: 'text-default-200',
      }}
      inputProps={{
        classNames: {
          inputWrapper:
            'h-[50px] bg-red data-[hover=true]:border-default-400 group-data-[focus=true]:border-default-400',
          label:
            'text-default-400 group-data-[filled-within=true]:text-default-400',
        },
      }}
      listboxProps={{
        hideSelectedIcon: true,
        itemClasses: {
          base: [
            'rounded-lg',
            'text-grey',
            'transition-opacity',
            'data-[hover=true]:text-white',
            'dark:data-[hover=true]:bg-default-600',
            'data-[pressed=true]:opacity-50',
            'data-[selectable=true]:focus:bg-default-800',
          ],
        },
      }}
      popoverProps={{
        offset: 10,
        classNames: {
          base: 'rounded-medium',
          content: 'p-0 border-small border-default-400 bg-background',
        },
      }}
      startContent={
        <IoSearchOutline className="text-grey" strokeWidth={2.5} size={20} />
      }
      scrollShadowProps={{
        isEnabled: false,
      }}
    >
      {['movie', 'tv', 'person'].map((type) => (
        <AutocompleteSection
          key={type}
          title={type}
          classNames={{
            base: 'p-0 p-0 m-0 shadow-none rounded-small text-grey uppercase',
            heading: headingClasses,
          }}
        >
          {autoCompleteItems(list.items || [], type)}
        </AutocompleteSection>
      ))}
    </Autocomplete>
  )
}

export default AutoFill

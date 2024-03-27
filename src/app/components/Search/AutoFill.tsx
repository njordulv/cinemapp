'use client'

import { useRouter } from 'next/navigation'
import { useRef, useEffect } from 'react'
import { Autocomplete, AutocompleteSection } from '@nextui-org/react'
import { useAsyncList } from '@react-stately/data'
import { IoSearchOutline } from 'react-icons/io5'
import { SearchTypes } from '@/types/data'
import { useAutoCompleteItem } from '@/hooks/useAutoCompleteItem'

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
          {useAutoCompleteItem({
            items: list.items || [],
            type,
            onClose,
            router,
            BASE_IMAGE_URL: BASE_IMAGE_URL || NO_IMAGE,
          })}
        </AutocompleteSection>
      ))}
    </Autocomplete>
  )
}

export default AutoFill

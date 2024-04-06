'use client'

import { useRouter } from 'next/navigation'
import { Autocomplete, AutocompleteSection } from '@nextui-org/react'
import { useAsyncList } from '@react-stately/data'
import { SearchTypes } from '@/types/data'
import { useAutoCompleteItem } from '@/hooks/useAutoCompleteItem'

const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL
const NO_IMAGE = process.env.NEXT_PUBLIC_NO_IMAGE

const SearchBar: React.FC = () => {
  const router = useRouter()
  const headingClasses =
    'flex w-full sticky top-1 z-20 py-1.5 px-2 m-0 shadow-small bg-default-100 text-grey rounded-small uppercase'

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
      className="md:max-w-[302px] max-w-full"
      inputValue={list.filterText}
      isLoading={list.isLoading}
      items={list.items || []}
      label="Type to search..."
      variant="bordered"
      onInputChange={(value) => list.setFilterText(value)}
      onKeyDown={(e: any) => e.continuePropagation()}
      radius="md"
      classNames={{
        listboxWrapper: 'max-h-[304px]',
        selectorButton: 'text-white',
        clearButton: 'text-default-400',
      }}
      inputProps={{
        classNames: {
          inputWrapper:
            'h-[46px] border-1 border-default-200 data-[hover=true]:border-default-400 group-data-[focus=true]:border-default-300',
          label:
            'text-default-400 group-data-[filled-within=true]:text-default-400',
        },
      }}
      listboxProps={{
        hideSelectedIcon: true,
        itemClasses: {
          base: [
            'rounded-lg p-1',
            'text-grey',
            'transition-opacity',
            'data-[hover=true]:text-white',
            'dark:data-[hover=true]:bg-default-200',
            'data-[pressed=true]:opacity-80',
            'data-[selectable=true]:focus:bg-default-800',
          ],
        },
      }}
      popoverProps={{
        offset: 10,
        classNames: {
          base: 'rounded-medium',
          content:
            'p-0 mt-[-4px] border-small border-default-400 bg-background',
        },
      }}
      scrollShadowProps={{
        isEnabled: false,
      }}
    >
      {['movie', 'tv', 'person'].map((type) => (
        <AutocompleteSection
          key={type}
          title={type}
          classNames={{
            base: 'p-0 m-0 shadow-none rounded-small text-grey uppercase',
            heading: headingClasses,
          }}
        >
          {useAutoCompleteItem({
            items: list.items || [],
            type,
            router,
            BASE_IMAGE_URL: BASE_IMAGE_URL || NO_IMAGE,
          })}
        </AutocompleteSection>
      ))}
    </Autocomplete>
  )
}

export default SearchBar

'use client'

import { useRouter } from 'next/navigation'
import { Autocomplete, AutocompleteItem, Avatar } from '@nextui-org/react'
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
  let list = useAsyncList<SearchTypes>({
    async load({ signal, filterText }) {
      let res = await fetch(`/api/search?query=${filterText}`, { signal })
      let json = await res.json()

      return {
        items: json.results,
      }
    },
  })

  return (
    <Autocomplete
      className="max-w-md"
      inputValue={list.filterText}
      isLoading={list.isLoading}
      items={list.items || []}
      label="Select a movie"
      placeholder="Type to search..."
      variant="bordered"
      onInputChange={(value) => list.setFilterText(value)}
      onKeyDown={(e: any) => e.continuePropagation()}
      classNames={{
        base: 'max-w-md',
        listboxWrapper: 'max-h-[320px]',
        selectorButton: 'text-white',
        clearButton: 'text-default-200',
      }}
      inputProps={{
        classNames: {
          inputWrapper:
            'h-[50px] data-[hover=true]:border-default-400 group-data-[focus=true]:border-default-400',
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
          content: 'p-0 border-small border-default-100 bg-background',
        },
      }}
      startContent={
        <IoSearchOutline className="text-grey" strokeWidth={2.5} size={20} />
      }
      radius="md"
    >
      {(item) => (
        <AutocompleteItem key={item.id} textValue={item.title}>
          <div
            className="flex justify-between items-center"
            onClick={() => {
              onClose()
              router.push(`/movie/${item.id}`)
            }}
          >
            <div className="flex gap-2 items-center">
              <Avatar
                alt={item.name}
                className="flex-shrink-0"
                radius="sm"
                size="sm"
                src={
                  item.poster_path
                    ? `${BASE_IMAGE_URL}w45${item.poster_path}`
                    : NO_IMAGE
                }
                fallback={NO_IMAGE}
              />
              <div className="flex flex-col">
                <span className="text-small">{item.title}</span>
                <span className="text-tiny text-default-400">
                  {formatReleaseYear(item.release_date ?? '')}
                </span>
              </div>
            </div>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  )
}

export default AutoFill

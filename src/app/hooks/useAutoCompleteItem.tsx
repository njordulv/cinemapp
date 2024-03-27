import { AutocompleteItem, Avatar } from '@nextui-org/react'
import { formatReleaseYear } from '@/utils/formatDate'

interface AutocompleteProps {
  items: any[]
  type: string
  router: any
  onClose: () => void
  BASE_IMAGE_URL?: string
  NO_IMAGE?: string
}

export const useAutoCompleteItem = ({
  items,
  type,
  onClose,
  router,
  BASE_IMAGE_URL,
  NO_IMAGE,
}: AutocompleteProps) => {
  return items
    ?.filter((item) => item.media_type === type)
    .map((item) => (
      <AutocompleteItem
        key={item.id}
        onClick={() => {
          router.push(`/${item.media_type}/${item.id}`)
          onClose()
        }}
        textValue={item.title || item.name}
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
            <span className="text-small normal-case">
              {item.title || item.name}
            </span>
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

import { AutocompleteItem, Avatar } from '@nextui-org/react'
import { formatReleaseYear } from '@/utils/formatDate'

interface AutocompleteProps {
  items: any[]
  type: string
  router: any
  BASE_IMAGE_URL?: string
  NO_IMAGE?: string
}

export const useAutoCompleteItem = ({
  items,
  type,
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
        }}
        textValue={item.title || item.name}
        startContent={
          <Avatar
            src={
              item.poster_path
                ? `${BASE_IMAGE_URL}w45${item.poster_path}`
                : item.profile_path
                ? `${BASE_IMAGE_URL}w45${item.profile_path}`
                : NO_IMAGE
            }
            alt={item.title || item.name}
            className="flex-shrink-0"
            radius="sm"
            size="sm"
            fallback={NO_IMAGE}
          />
        }
      >
        <div className="flex flex-col">
          <span className="text-small normal-case">
            {item.title || item.name}
          </span>
          <span className="text-tiny text-default-400 normal-case">
            {item.release_date || item.first_air_date
              ? formatReleaseYear(
                  item.release_date || item.first_air_date || ''
                )
              : item.known_for_department}
          </span>
        </div>
      </AutocompleteItem>
    ))
}

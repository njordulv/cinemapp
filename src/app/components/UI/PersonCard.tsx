import { useState, useEffect } from 'react'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useDispatch } from '@/redux/store'
import { setPerson } from '@/redux/slices/personSlice'
import PersonData from '@/types/PersonData'
const NO_IMAGE = '/no-image.svg'

export default function PersonCard({
  id,
  name,
  profile_path,
  known_for_department,
  popularity,
}: PersonData) {
  const dispatch = useDispatch()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [personDetails, setPersonDetails] = useState<PersonData | null>(null)

  useEffect(() => {
    fetch(`/api/person/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        return response.json()
      })
      .then((data) => {
        setPersonDetails(data)
      })
      .catch((error) => setError(error.message))
  }, [id, dispatch])

  const pageHandler = () => {
    dispatch(setPerson(personDetails))
    router.push(`/person/${id}`)
  }

  if (error) {
    return <h1>There is an error - {error}</h1>
  }

  return (
    // <Card
    //   isFooterBlurred
    //   isPressable
    //   radius="lg"
    //   className="border-none bg-content-none bg-blueDark"
    //   onPress={pageHandler}
    // >
    //   <Image
    //     className="object-cover"
    //     src={profile_path}
    //     width={220}
    //     height={330}
    //     fallbackSrc={NO_IMAGE}
    //     alt={name}
    //   />
    //   <CardFooter className="p-3 py-1 h-auto flex flex-col items-start text-left color-inherit subpixel-antialiased bg-background/10 backdrop-blur-[2px] backdrop-saturate-100 backdrop-contrast-125 before:bg-white/10 border-white/20 border-1 overflow-hidden absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
    //     <div className="text-white/80 text-[14px] leading-[18px] text-shadow-sm pr-8">
    //       {name}
    //     </div>
    //     <div className="text-tiny text-white/80 text-shadow-sm">
    //       {known_for_department}
    //     </div>
    //     <div className="text-tiny text-white/80 text-shadow-sm">
    //       Popularity: {popularity.toFixed(2)}
    //     </div>
    //   </CardFooter>
    // </Card>

    <Card
      shadow="md"
      className=" bg-cyan-100"
      isPressable
      onPress={pageHandler}
    >
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="md"
          width="182"
          className="w-full object-cover h-[240px] rounded-b-none"
          src={profile_path}
          fallbackSrc={NO_IMAGE}
          alt={name || 'Unknown'}
        />
      </CardBody>
      <CardFooter className="flex flex-col text-small items-start p-2">
        <b className="text-[15px]">{name}</b>
        <p className="text-default-500 text-[14px]">{known_for_department}</p>
        <p className="text-default-500 text-[14px]">
          Popularity: {popularity.toFixed(2)}
        </p>
      </CardFooter>
    </Card>
  )
}

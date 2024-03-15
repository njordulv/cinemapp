import { useState, useEffect } from 'react'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useDispatch } from '@/redux/store'
import { setPerson } from '@/redux/slices/personSlice'
import KnownFor from '@/components/UI/KnownFor'
import PersonData from '@/types/PersonData'
const NO_IMAGE = '/no-image.svg'

export default function PersonCard({
  id,
  name,
  profile_path,
  known_for,
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
      <CardFooter className="flex flex-col text-small items-start gap-2 p-2">
        <b className="text-[15px]">{name}</b>
        {known_for && <KnownFor items={known_for} />}
      </CardFooter>
    </Card>
  )
}

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
} from '@nextui-org/react'

interface CrewList {
  id?: number
  name?: string
  department?: string
  profile_path?: string
  job?: string
  known_for_department?: string
}

interface CrewProps {
  crew: CrewList[]
}

const Crew: React.FC<CrewProps> = ({ crew }) => {
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/'
  const NO_IMAGE = '/no-image.svg'

  return (
    <Table
      isCompact
      isStriped
      radius="sm"
      aria-label="Example static collection table"
    >
      <TableHeader>
        <TableColumn className="text-md">Name</TableColumn>
        <TableColumn className="text-md">Department</TableColumn>
        <TableColumn className="text-md">Known For</TableColumn>
      </TableHeader>
      <TableBody>
        {crew &&
          crew.map((member: CrewList, index: number) => (
            <TableRow key={`${member.id}${index}`}>
              <TableCell className="flex">
                <User
                  name={member.name}
                  description={member.job}
                  avatarProps={{
                    radius: 'md',
                    src: member.profile_path
                      ? `${BASE_IMAGE_URL}w92${member.profile_path}`
                      : NO_IMAGE,
                  }}
                />
              </TableCell>
              <TableCell>{member.department}</TableCell>
              <TableCell>{member.known_for_department}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}

export default Crew

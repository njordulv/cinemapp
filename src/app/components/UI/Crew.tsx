import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Link,
} from '@nextui-org/react'
import { CrewTypes } from '@/types/data'

interface CrewProps {
  crew: CrewTypes[]
}

const Crew: React.FC<CrewProps> = ({ crew }) => {
  const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL
  const NO_IMAGE = process.env.NEXT_PUBLIC_NO_IMAGE

  return (
    <Table
      isCompact
      isStriped
      hideHeader
      radius="md"
      aria-label="Crew table"
      classNames={{
        wrapper: 'rounded-medium',
      }}
    >
      <TableHeader>
        <TableColumn className="text-md">Name</TableColumn>
        <TableColumn className="text-md">Department</TableColumn>
        <TableColumn className="text-md">Known For</TableColumn>
      </TableHeader>
      <TableBody>
        {crew &&
          crew.map((member: CrewTypes, index: number) => (
            <TableRow key={index} className="table-row">
              <TableCell className="flex">
                <Link
                  href={`/person/${member.id}`}
                  className="text-white hover:text-special transition-all"
                >
                  <User
                    name={member.name}
                    description={member.job}
                    avatarProps={{
                      radius: 'sm',
                      src: member.profile_path
                        ? `${BASE_IMAGE_URL}w92${member.profile_path}`
                        : NO_IMAGE,
                    }}
                  />
                </Link>
              </TableCell>
              <TableCell className="text-default-600">
                {member.department}
              </TableCell>
              <TableCell className="text-default-600">
                {member.known_for_department}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}

export default Crew

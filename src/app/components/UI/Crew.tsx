import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
} from '@nextui-org/react'
import { CrewTypes } from '@/types/data'

interface CrewProps {
  crew: CrewTypes[]
}

const Crew: React.FC<CrewProps> = ({ crew }) => {
  const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL
  const NO_IMAGE = process.env.NEXT_PUBLIC_NO_IMAGE

  return (
    <Table isCompact isStriped radius="sm" aria-label="Crew table">
      <TableHeader>
        <TableColumn className="text-md">Name</TableColumn>
        <TableColumn className="text-md">Department</TableColumn>
        <TableColumn className="text-md">Known For</TableColumn>
      </TableHeader>
      <TableBody>
        {crew &&
          crew.map((member: CrewTypes, index: number) => (
            <TableRow key={`${index}`}>
              <TableCell className="flex">
                <User
                  name={member.name}
                  description={member.job}
                  className="text-default-800"
                  avatarProps={{
                    radius: 'md',
                    src: member.profile_path
                      ? `${BASE_IMAGE_URL}w92${member.profile_path}`
                      : NO_IMAGE,
                  }}
                />
              </TableCell>
              <TableCell className="text-default-500">
                {member.department}
              </TableCell>
              <TableCell className="text-default-500">
                {member.known_for_department}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}

export default Crew

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
} from '@nextui-org/react'
import { Crew } from '@/types/data'

interface CrewProps {
  crew: Crew[]
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
          crew.map((member: Crew, index: number) => (
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

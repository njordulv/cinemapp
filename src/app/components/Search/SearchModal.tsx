'use client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from '@nextui-org/react'
import { IoSearchOutline } from 'react-icons/io5'
import { CustomButton } from '@/components/UI/CustomButton'
import AutoFill from '@/src/app/components/Search/AutoFill'

export default function SearchModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <CustomButton color="transp" onPress={onOpen} size="circle">
        <IoSearchOutline size="24" />
      </CustomButton>

      <Modal isOpen={isOpen} backdrop="blur" placement="top" onClose={onClose}>
        <ModalContent className="bg-background">
          <>
            <ModalHeader className="flex flex-col gap-1">
              Look for a movie, series, celebrity...
            </ModalHeader>
            <ModalBody className="pb-32">
              <AutoFill onClose={onClose} />
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  )
}

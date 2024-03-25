'use client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Tooltip,
} from '@nextui-org/react'
import { IoSearchOutline } from 'react-icons/io5'
import AutoFill from '@/src/app/components/Search/AutoFill'
import { CustomButton } from '@/components/UI/CustomButton'

export default function SearchModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Tooltip
        color="foreground"
        content="Search"
        delay={2000}
        className="text-grey text-tiny"
      >
        <CustomButton color="transp" onPress={onOpen} size="circle">
          <IoSearchOutline size="24" />
        </CustomButton>
      </Tooltip>
      <Modal
        isOpen={isOpen}
        backdrop="blur"
        onClose={onClose}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: { duration: 0.3, ease: 'easeOut' },
            },
            exit: {
              y: -30,
              opacity: 0,
              transition: { duration: 0.2, ease: 'easeIn' },
            },
          },
        }}
      >
        <ModalContent className="bg-background">
          <>
            <ModalHeader className="flex flex-col gap-1">
              Look up a movie, series, individual...
            </ModalHeader>
            <ModalBody className="pb-16">
              <AutoFill onClose={onClose} />
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  )
}

'use client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tooltip,
} from '@nextui-org/react'
import { IoSearchOutline } from 'react-icons/io5'
import AutoFill from '@/src/app/components/Search/AutoFill'
import { CustomButton } from '@/components/UI/CustomButton'

export default function SearchModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

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
        onOpenChange={onOpenChange}
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
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Look up a movie, series, individual...
              </ModalHeader>
              <ModalBody>
                <AutoFill />
              </ModalBody>
              <ModalFooter className="pb-6">
                <CustomButton color="primary" onPress={onClose} size="md">
                  Search
                </CustomButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

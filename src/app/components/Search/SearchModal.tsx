import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Tooltip,
} from '@nextui-org/react'
import { IoSearchOutline } from 'react-icons/io5'
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
        <CustomButton color="back" onPress={onOpen} size="circle">
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
              transition: {
                duration: 0.3,
                ease: 'easeOut',
              },
            },
            exit: {
              y: -30,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: 'easeIn',
              },
            },
          },
        }}
      >
        <ModalContent className="bg-background">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Look up a film, series, individual...
              </ModalHeader>
              <ModalBody>
                <Input
                  isClearable
                  autoFocus
                  type="search"
                  label="Search"
                  variant="bordered"
                  labelPlacement="outside"
                  placeholder="Type to search..."
                  classNames={{
                    inputWrapper:
                      'border-default-600 data-[hover=true]:border-default-500 group-data-[focus=true]:border-default-400 border-small',
                    label:
                      'text-default-400 group-data-[filled-within=true]:text-default-500',
                    input: 'appearance-none',
                  }}
                />
              </ModalBody>
              <ModalFooter>
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

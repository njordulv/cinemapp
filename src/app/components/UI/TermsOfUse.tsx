'use client'

import { useState, useEffect } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image,
} from '@nextui-org/react'

export default function TermsOfUse() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isModalSeen, setIsModalSeen] = useState(
    localStorage.getItem('tmbdModalSeen') === 'true'
  )

  useEffect(() => {
    if (!isModalSeen) {
      setTimeout(() => onOpen(), 1000)
    }
  }, [isModalSeen, onOpen])

  const handleClose = () => {
    setTimeout(() => {
      setIsModalSeen(true)
      localStorage.setItem('tmbdModalSeen', 'true')
    }, 1000)
    onClose()
  }

  return (
    <>
      {!isModalSeen && (
        <Modal
          isOpen={isOpen}
          backdrop="blur"
          size="md"
          shadow="sm"
          isDismissable={false}
          hideCloseButton
          onClose={handleClose}
        >
          <ModalContent className="flex flex-col p-6 gap-6">
            <ModalBody className="p-0 flex flex-row gap-6">
              <Image
                shadow="none"
                radius="none"
                width="100%"
                height="auto"
                className="object-cover"
                src={'/tmdb-logo.svg'}
                fallbackSrc="/no-image.svg"
                alt="TMDB official logo"
              />
              <p className="text-[17px] leading-[27px]">
                This website uses TMDB and the TMDB APIs but is not endorsed,
                certified, or otherwise approved by TMDB.
              </p>
            </ModalBody>
            <ModalFooter className="p-0">
              <Button color="default" variant="ghost" onClick={handleClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  )
}

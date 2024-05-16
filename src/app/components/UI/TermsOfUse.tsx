'use client'

import { useState, useEffect } from 'react'
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image,
} from '@nextui-org/react'

export default function TermsOfUse() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isModal, setIsModal] = useState(
    localStorage.getItem('tmbdTOU') === 'true'
  )

  useEffect(() => {
    if (!isModal) {
      setTimeout(() => onOpen(), 1000)
    }
  }, [isModal, onOpen])

  const handleClose = () => {
    setTimeout(() => {
      setIsModal(true)
      localStorage.setItem('tmbdTOU', 'true')
    }, 1000)
    onClose()
  }

  return (
    <>
      {!isModal && (
        <Modal
          isOpen={isOpen}
          backdrop="blur"
          size="md"
          shadow="sm"
          isDismissable={false}
          hideCloseButton
          onClose={handleClose}
        >
          <ModalContent className="flex flex-col p-6 gap-6 m-5">
            <ModalBody className="p-0 flex sm:flex-row flex-col gap-6">
              <Image
                shadow="none"
                radius="none"
                width="112px"
                height="auto"
                className="object-cover min-w-[112px]"
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

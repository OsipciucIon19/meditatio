import React, { FC, useEffect, useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'
import { Event } from '../../types/event'
import Loader from '../ui/Loader/Loader'
import { useFetching } from '../../hooks/useFetching'
import EventService from '../../services/EventService'
import { useNavigate } from 'react-router-dom'

type ViewEventModalProps = {
  modal: boolean
  toggle?: React.KeyboardEventHandler<any> | React.MouseEventHandler<any>
  event: Event
  isEventLoading: boolean
  userId: string
}

const ViewEventModal: FC<ViewEventModalProps> = (props) => {
  const { modal, toggle, event, isEventLoading, userId } = props
  const [eventContent, setEventContent] = useState(null)
  const navigate = useNavigate()
  const [fetchEventContent, isEventContentLoading] = useFetching(async (eventId, userId): Promise<void> => {
    const response = await EventService.fetchEventContent(eventId, userId)
    setEventContent(response.data)
  })
  const handleAccessLessonButton = async () => {
    await fetchEventContent(event?._id, userId)
  }

  useEffect(() => {
    if (eventContent) {
      navigate(`/lesson/${eventContent?._id}`, { state: { eventContent } })
    }

    return () => {
      setEventContent(null)
    }
  }, [eventContent])

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader>Vizualizare detalii lectie</ModalHeader>
      <ModalBody>
        {
          isEventLoading ? <Loader /> : 'Event id: ' + event?._id
        }
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => handleAccessLessonButton() }>
          {isEventContentLoading ? <Spinner className="mx-2" size="sm" color="light" /> : 'Accesează lecția'}
        </Button>
        <Button color="danger" onClick={(e: React.KeyboardEvent<any> & React.MouseEvent<any, MouseEvent>) => {
          toggle(e)
        }}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default ViewEventModal

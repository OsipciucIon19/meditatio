import React, { FC, useEffect, useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'
import { Event } from '../../types/event'
import Loader from '../ui/Loader/Loader'
import { useFetching } from '../../hooks/useFetching'
import EventService from '../../services/EventService'
import { useNavigate } from 'react-router-dom'
import { monthNames } from 'utils/events'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()
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
      <ModalHeader>{t('view-lesson-details')}</ModalHeader>
      <ModalBody>
        {
          isEventLoading ? <Loader /> :
            <>
              <p className="mx-auto my-2">
                <b>{new Date(event?.start).getDate()} {monthNames[new Date(event?.start).getMonth()]}</b>
              </p>
            </>
        }
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => handleAccessLessonButton() }>
          {isEventContentLoading ? <Spinner className="mx-2" size="sm" color="light" /> : t('access-lesson')}
        </Button>
        <Button color="danger" onClick={(e: React.KeyboardEvent<any> & React.MouseEvent<any, MouseEvent>) => {
          toggle(e)
        }}>
          {t('cancel')}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default ViewEventModal

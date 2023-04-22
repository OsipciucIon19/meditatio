import React, { FC, useEffect, useState } from 'react'
import { Button, Form, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import Localization from 'react-widgets/Localization'
import { DateLocalizer } from 'react-widgets/IntlLocalizer'
import { Course } from '../../types/course'
import TimeInput from '../ui/TimeInput/TimeInput'
import { User } from '../../types/user'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { monthNames } from 'utils/events'

type ScheduleModalProps = {
  modal: boolean
  toggle?: React.KeyboardEventHandler<any> | React.MouseEventHandler<any>
  event: Date
  course: Course
  studentId?: string
  teacher?: User
}

const ScheduleModal: FC<ScheduleModalProps> = (props) => {
  const navigate = useNavigate()
  const { modal, toggle, event, course, teacher, studentId } = props
  const [toEventHours, setToEventHours] = useState<number>(0)
  const [fromEventHours, setFromEventHours] = useState<number>(0)
  const [toEventMinutes, setToEventMinutes] = useState<number>(0)
  const [fromEventMinutes, setFromEventMinutes] = useState<number>(0)
  const [daysAmountSelected, setDaysAmountSelected] = useState('single')
  const { t } = useTranslation()
  const days = ['Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sa', 'Du']

  const handleChange = (time, isHourFormat, isFromInput) => {
    if (isFromInput) {
      if (isHourFormat) {
        setFromEventHours(time)
      } else {
        setFromEventMinutes(time)
      }
    } else {
      if (isHourFormat) {
        setToEventHours(time)
      } else {
        setToEventMinutes(time)
      }
    }
  }

  useEffect(() => {
    setFromEventHours(event.getHours())
    setFromEventMinutes(event.getMinutes())
    setToEventHours(event.getHours() + 1)
    setToEventMinutes(event.getMinutes())
  }, [event])

  const singleSelectedElements = (
    <div className="my-2">
      <b>{`${event.getDate()} ${monthNames[event.getMonth()]}`}</b>
    </div>
  )
  const multipleSelectedElements = (
    <div className="d-flex justify-content-between my-2">
      {days.map((day, index) =>
        <span key={day}>
          <Input type="checkbox" defaultChecked={event.getDay() === index + 1} id={`${day}${index}`}/>
          <label htmlFor={`${day}${index}`}>
            <b>{day}</b>
          </label>
        </span>
      )}
    </div>
  )

  const handleSelectChange = (event) => {
    setDaysAmountSelected(event.target.value)
  }

  const handlePaymentClick = () =>
    navigate('/checkout', {
      state: {
        eventInfo: {
          student: studentId,
          teacher: teacher._id,
          course: course._id,
          start: new Date(event.getFullYear(), event.getMonth(), event.getDate(), fromEventHours, fromEventMinutes),
          end: new Date(event.getFullYear(), event.getMonth(), event.getDate(), toEventHours, toEventMinutes),
          amount: course.price
        }
      }
    })

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader>{t('schedule-a-lesson')}</ModalHeader>
      <ModalBody>
        <Localization date={new DateLocalizer({ culture: 'ro', firstOfWeek: 1 })}>
          <Form>
            <div className="my-1">
              <b>{t('chosen-course')}:</b> {course?.subject.title} {t('courses-class')} {course?.subject.grade}
            </div>
            <div className="my-1"><b>{t('price-per-hour')}:</b> {course?.price} lei</div>
            <div className="my-1"><b>{t('chosen-teacher')}:</b>
              <div className="my-1">
                <img
                  className="mr-2"
                  src={`https://ui-avatars.com/api/?name=${teacher?.firstName}+${teacher?.lastName}&size=40`}
                  alt="avatar"
                  style={{ borderRadius: '25px' }}
                />{teacher?.firstName} {teacher?.lastName}
              </div>
            </div>
            <hr/>
            <div className="d-flex align-items-center mb-3">
              <label className="me-4" htmlFor="daysAmount">
                {t('schedule')}:
              </label>
              <Input
                type="select"
                name="daysAmount"
                id="daysAmount"
                value={daysAmountSelected}
                onChange={handleSelectChange}
              >
                <option value="single">{t('one-lesson')}</option>
                <option value="multiple">{t('multiple-lessons')}</option>
              </Input>
            </div>
            {daysAmountSelected === 'single' && singleSelectedElements}
            {daysAmountSelected === 'multiple' && multipleSelectedElements}
            <div className="d-flex">
              <div className="d-flex align-items-center">
                <label className="w-25 me-2">
                  {t('from')}:
                </label>
                <div className="d-flex align-items-center">
                  <TimeInput
                    time={event.getHours()}
                    isHourFormat
                    isFromInput
                    handleChange={handleChange}
                  />
                  <span className="me-1">:</span>
                  <TimeInput
                    time={event.getMinutes()}
                    isHourFormat={false}
                    isFromInput
                    handleChange={handleChange}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center me-2">
                <label className="w-50 ms-4">
                  {t('to')}:
                </label>
                <div className="d-flex align-items-center">
                  <TimeInput
                    time={event.getHours() + 1}
                    isHourFormat
                    isFromInput={false}
                    handleChange={handleChange}
                  />
                  <span className="me-1">:</span>
                  <TimeInput
                    time={event.getMinutes()}
                    isHourFormat={false}
                    isFromInput={false}
                    handleChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </Form>
        </Localization>
      </ModalBody>
      <ModalFooter>
        <div><i>{t('total')}: {course?.price} lei</i></div>
        <Button color="primary" onClick={() => handlePaymentClick()}>
          {t('review')}
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

export default ScheduleModal

import React, { FC, useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import { User } from 'types/user'
import { useFetching } from 'hooks/useFetching'
import EventService from 'services/EventService'
import { useTranslation } from 'react-i18next'

type UserProfileProps = {
  user: User
}
const UserProfile: FC<UserProfileProps> = ({ user }) => {
  const [events, setEvents] = useState([])
  const { t } = useTranslation()
  const [fetchEvents] = useFetching(async (id, roles): Promise<void> => {
    const response = await EventService.fetchEvents(id, roles)
    setEvents([...events, ...response.data])
  })

  useEffect(() => {
    const fetchData = async () => {
      await fetchEvents(user._id, user.roles)
    }
    fetchData().catch(console.error)

  }, [])

  return (
    <section>
      <Row>
        <h1>{t('user-account')}</h1>
      </Row>
      <Row>
        <Col className="col-3 d-flex flex-column justify-content-center">
          <img
            src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&size=200`}
            alt="avatar"
            style={{ borderRadius: '250px' }}
          />
          <div className="text-center">
            <h2>{user.firstName + ' ' + user.lastName}</h2>
          </div>
        </Col>
        <Col className="col-9">
          <h3>
            {t('scheduled-lessons')}:
          </h3>
          {
            events.map((event) => <div key={event._id}>{event.title} {t('courses-class')} {event.grade} - {event.start}</div>)
          }
        </Col>
      </Row>
    </section>
  )
}

export default UserProfile
import React, { FC } from 'react'
import { Col, Row } from 'reactstrap'
import { User } from 'types/user'

type UserProfileProps = {
  user: User
}
const UserProfile: FC<UserProfileProps> = ({ user }) => {
  return (
    <section>
      <Row>
        <h1>Contul tău personal</h1>
      </Row>
      <Row>
        <Col>
          <img
            src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&size=200`}
            alt="avatar"
            style={{ borderRadius: '250px' }}
          />
          <div>
            <h2>{user.firstName + ' ' + user.lastName}</h2>
          </div>
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
    </section>
  )
}

export default UserProfile
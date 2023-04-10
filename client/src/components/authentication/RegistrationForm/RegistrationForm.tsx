import React, { FC, useContext, useEffect, useState } from 'react'
import { Context } from 'App'
import { observer } from 'mobx-react-lite'
import { Input, Button, Spinner, Form, Label, ButtonGroup } from 'reactstrap'
import { useTitle } from 'hooks/useTitle'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { StyledRegistrationForm } from './RegistrationForm.styled'

const LoginForm: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { store } = useContext(Context)
  const location = useLocation()
  const navigate = useNavigate()

  useTitle('Înregistrare')

  const registerUser = async () => {
    setIsLoading(true)
    await store.registration(email, password, firstName, lastName, phoneNumber)
    setIsLoading(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    if (store.isAuth) {
      return navigate('/profile')
    }
  }, [store.isAuth, navigate])

  return (
    <StyledRegistrationForm className="blurry-bg">
      <div className="registration">
        <h1 className="registration__title">Înregistrare</h1>
        <Form
          className="registration__form"
          onSubmit={handleSubmit}
        >
          <Label for="firstName">
            Numele
          </Label>
          <Input
            id="firstName"
            onChange={e => setFirstName(e.target.value)}
            name="firstName"
            value={firstName}
            type="text"
            placeholder="Ionescu"
          />
          <Label for="lastName">
            Prenumele
          </Label>
          <Input
            id="lastName"
            onChange={e => setLastName(e.target.value)}
            name="lastName"
            value={lastName}
            type="text"
            placeholder="Ion"
          />
          <Label for="email">
            Email
          </Label>
          <Input
            id="email"
            onChange={e => setEmail(e.target.value)}
            name="email"
            value={email}
            type="email"
            placeholder="ion.ionescu@mail.md"
          />
          <Label for="phoneNumber">
            Numarul de telefon
          </Label>
          <Input
            id="phoneNumber"
            onChange={e => setPhoneNumber(e.target.value)}
            name="phoneNumber"
            value={phoneNumber}
            type="text"
            placeholder="+373 60 000 000"
          />
          <Label for="password">
            Parolă
          </Label>
          <Input
            id="password"
            onChange={e => setPassword(e.target.value)}
            name="password"
            value={password}
            type="password"
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
          />
          <ButtonGroup className="float-end align-items-center">
            <Button
              className="registration__form__button"
              type="submit"
              disabled={isLoading}
              color="primary"
              onClick={registerUser}
            >
              {
                isLoading ?
                  <Spinner className="mx-2" size="sm" color="light" /> :
                  'Înainte'
              }
            </Button>
            <span style={{ margin: '1rem' }}>
                            Ai deja un cont? <Link to="/login">Loghează-te</Link>
            </span>
          </ButtonGroup>
        </Form>
      </div>
    </StyledRegistrationForm>
  )
}

export default observer(LoginForm)

import React, { FC, useContext, useEffect, useState } from 'react'
import { Context } from 'App'
import { observer } from 'mobx-react-lite'
import { Input, Button, Spinner, Form, Label, ButtonGroup } from 'reactstrap'
import { useTitle } from 'hooks/useTitle'
import { Link, useNavigate } from 'react-router-dom'
import { StyledRegistrationForm } from './RegistrationForm.styled'
import { useTranslation } from 'react-i18next'

const LoginForm: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { store } = useContext(Context)
  const navigate = useNavigate()
  const { t } = useTranslation()

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
      navigate('/profile')
    }

    return () => {
      setFirstName(null)
      setLastName(null)
      setEmail(null)
      setPassword(null)
      setPhoneNumber(null)
    }
  }, [store.isAuth, navigate])

  return (
    <StyledRegistrationForm className="blurry-bg">
      <div className="registration">
        <h1 className="registration__title">{t('register-title')}</h1>
        <Form
          className="registration__form"
          onSubmit={handleSubmit}
        >
          <Label for="firstName">
            {t('first-name')}
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
            {t('last-name')}
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
            {t('email')}
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
            {t('phone-number')}
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
            {t('password')}
          </Label>
          <Input
            id="password"
            onChange={e => setPassword(e.target.value)}
            name="password"
            value={password}
            type="password"
            autoComplete="on"
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
                  t('submit')
              }
            </Button>
            <span style={{ margin: '1rem' }}>
              {t('have-an-account')} <Link to="/login">{t('link-login-2')}</Link>
            </span>
          </ButtonGroup>
        </Form>
      </div>
    </StyledRegistrationForm>
  )
}

export default observer(LoginForm)

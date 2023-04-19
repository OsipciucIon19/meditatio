import React, { FC, useContext, useEffect, useState } from 'react'
import { Context } from 'App'
import { observer } from 'mobx-react-lite'
import { Input, Button, Spinner, Form, Label, ButtonGroup } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useTitle } from 'hooks/useTitle'
import { StyledLoginForm } from './LoginForm.styled'
import { useTranslation } from 'react-i18next'

const LoginForm: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { store } = useContext(Context)
  const navigate = useNavigate()
  const { t } = useTranslation()

  useTitle('Autentificare')

  useEffect(() => {
    if (store.isAuth) {
      navigate('/profile')
    }

    return () => {
      setEmail(null)
      setPassword(null)
    }
  }, [store.isAuth, navigate])

  const authenticateUser = async () => {
    setIsLoading(true)
    await store.login(email, password)
    setIsLoading(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <StyledLoginForm className="blurry-bg">
      <div className="auth">
        <h1 className="auth__title">{t('auth-title')}</h1>
        <Form
          className="auth__form"
          onSubmit={handleSubmit}
        >
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
              className="auth__form__button"
              disabled={isLoading}
              type="submit"
              color="secondary"
              onClick={authenticateUser}
            >
              {
                isLoading ?
                  <Spinner className="mx-2" size="sm" color="light"/> :
                  t('submit')
              }
            </Button>
            <span style={{ margin: '1rem' }}>
              {t('do-not-have-an-account')} <Link to="/registration">{t('link-register-2')}</Link>
            </span>
          </ButtonGroup>
        </Form>
      </div>
    </StyledLoginForm>
  )
}

export default observer(LoginForm)

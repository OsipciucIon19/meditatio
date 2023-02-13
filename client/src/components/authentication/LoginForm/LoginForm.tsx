import React, {FC, useContext, useEffect, useState} from 'react'
import {Context} from 'index'
import {observer} from 'mobx-react-lite'
import {Input, Button, Spinner, Form, Label, ButtonGroup} from 'reactstrap'
import {Link, useNavigate} from 'react-router-dom'
import {useTitle} from "hooks/useTitle";
import {StyledLoginForm} from './LoginForm.styled'

const LoginForm: FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context)
    const navigate = useNavigate()

    useTitle('Autentificare')

    useEffect(() => {
        if (store.isAuth) {
            return navigate('/profile')
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
                <h1 className="auth__title">Autentificare</h1>
                <Form
                    className="auth__form"
                    onSubmit={handleSubmit}
                >
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
                            className="auth__form__button"
                            type="submit"
                            color="secondary"
                            onClick={authenticateUser}
                        >
                            {
                                isLoading ?
                                    <Spinner className="mx-2" size="sm" color="light"/> :
                                    'Înainte'
                            }
                        </Button>
                        <span style={{margin: '1rem'}}>
                        Încă nu ai un cont? <Link to="/registration">Înregistrează-te</Link>
                    </span>
                    </ButtonGroup>
                </Form>
            </div>
        </StyledLoginForm>
    )
}

export default observer(LoginForm)

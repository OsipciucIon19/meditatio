import React, {FC, useContext, useState} from 'react'
import {Context} from 'index'
import {observer} from 'mobx-react-lite'
import {Input, Button, Spinner, Form, Label, ButtonGroup} from 'reactstrap'
import {useTitle} from 'hooks/useTitle'
import {Link, useLocation} from 'react-router-dom'
import {StyledRegistrationForm} from './RegistrationForm.styled'

const LoginForm: FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const {store} = useContext(Context)
	const location = useLocation()

	useTitle('Înregistrare')

	const registerUser = async () => {
		setIsLoading(true)
		await store.registration(email, password)
		setIsLoading(false)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
	}

	return (
		<StyledRegistrationForm className="blurry-bg">
			<div className="registration">
				<h1 className="registration__title">Înregistrare</h1>
				<Form
					className="registration__form"
					onSubmit={handleSubmit}
				>
					<Label for="email">
                        Email
					</Label>
					<Input
						id="email"
						onChange={e => setEmail(e.target.value)}
						name="email"
						value={location.state?.email ? location.state.email : email}
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
							className="registration__form__button"
							type="submit"
							color="primary"
							onClick={registerUser}
						>
							{
								isLoading ?
									<Spinner className="mx-2" size="sm" color="light"/> :
									'Înainte'
							}
						</Button>
						<span style={{margin: '1rem'}}>
                            Ai deja un cont? <Link to="/login">Loghează-te</Link>
						</span>
					</ButtonGroup>
				</Form>
			</div>
		</StyledRegistrationForm>
	)
}

export default observer(LoginForm)

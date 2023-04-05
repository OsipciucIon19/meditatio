import {FC, useContext, useState} from 'react'
import {Button, Col, Form, Input, Row} from 'reactstrap'
import {StyledHeroSection} from './HeroSection.styled'
import {LazyLoadImage} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import {useNavigate} from 'react-router-dom'
import {Context} from 'index'

type HeroSectionProps = {
    inverted?: boolean,
    title: string,
    image?: string,
    body?: JSX.Element,
    hasForm?: boolean
}

const HeroSection: FC<HeroSectionProps> = ({inverted, title, image, body, hasForm}) => {
	const {store} = useContext(Context)
	const [email, setEmail] = useState<string>('')
	const rowDirection = inverted ? 'row-reverse' : 'row'
	const navigate = useNavigate()

	const handleSubmit = (event) => {
		event.preventDefault()
	}

	return (
		<StyledHeroSection>
			<Row className="hero-row" style={{flexDirection: rowDirection}}>
				<Col>
					<h1 className="hero-title">{title}</h1>
					<div className="hero-body">
						{body}
					</div>
					{
						hasForm && <Form
							className="d-flex"
							onSubmit={handleSubmit}
						>
							<Input
								id="email"
								onChange={ e => setEmail(e.target.value) }
								value={ email }
								placeholder="ex: ion.ionescu@mail.md"
								style={{width: '50%'}}
								name="email"
								type="email"
							/>
							<Button
								disabled={store.isAuth}
								type="submit"
								onClick={() => navigate('/registration', {state: {email}})}
							>Obține un cont</Button>
						</Form>
					}
				</Col>
				<Col>
					{image && <LazyLoadImage
						className="hero-image"
						src={image}
						width="500"
						alt="hero"
						effect="blur"
					/>}
				</Col>
			</Row>
		</StyledHeroSection>
	)
}

export default HeroSection

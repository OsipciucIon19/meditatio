import React, { FC } from 'react'
import { Button } from 'reactstrap'
import logo404 from 'assets/images/error/404-logo.svg'
import { useNavigate } from 'react-router-dom'
import { useTitle } from 'hooks/useTitle'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const NotFoundPage: FC = () => {
	const navigate = useNavigate()
    
	useTitle('Pagina nu a fost gasită')

	return (
		<section className="d-flex flex-column justify-content-center align-items-center">
			<h1 className="fw-bold">404 :(</h1>
			<LazyLoadImage
				src={logo404}
				width="500"
				height="200"
				alt="404-logo"
				effect="blur"
			/>
			<h2>Se pare că te-ai pierdut</h2>
			<p>pagina pe care o cauți nu este disponibilă</p>
			<Button
				onClick={() => navigate('/')}
			>
                La pagina principală
			</Button>
		</section>
	)
}

export default NotFoundPage
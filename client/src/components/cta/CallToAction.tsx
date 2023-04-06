import React, { FC } from 'react'
import { StyledCallToAction } from 'components/cta/CallToAction.styled'
import { Col, Row } from 'reactstrap'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { Link } from 'react-router-dom'


type CallToActionProps = {
  inverted?: boolean,
  title: string,
  image?: string,
  body?: JSX.Element,
  link: {to: string, text: string}
}

const CallToAction: FC<CallToActionProps> = ({ inverted, title, image, body, link }) => {
  const rowDirection = inverted ? 'row-reverse' : 'row'

  return (
    <StyledCallToAction>
      <Row className="cta-row" style={{ flexDirection: rowDirection }}>
        <Col>
          <h2 className="cta-title">{title}</h2>
          <div className="cta-body">
            {body}
          </div>
          <Link to={link.to} className="btn btn-secondary">{link.text}</Link>
        </Col>
        <Col>
          {image && <LazyLoadImage
            className="cta-image"
            src={image}
            width="500"
            alt={`cta-${title}`}
            effect="blur"
          />}
        </Col>
      </Row>
    </StyledCallToAction>

  )
}

export default CallToAction

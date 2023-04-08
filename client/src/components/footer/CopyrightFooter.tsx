import React, { FC } from 'react'
import { Col, Container, Row } from 'reactstrap'
import { AiFillLinkedin, AiFillTwitterSquare, AiFillYoutube, AiFillFacebook } from 'react-icons/ai'

const CopyrightFooter: FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <div className="copyright-footer py-2">
      <Container>
        <Row className="py-1 align-items-center">
          <Col>
            <div className="">© {currentYear} meditat.io</div>
          </Col>
          <Col>

            <ul className="align-items-center mb-0">
              <li><a className="nav-link" href="https://facebook.com/" style={{ color: '#fff' }}>
                <AiFillFacebook size={20}/>
              </a></li>
              <li><a className="nav-link" href="https://twitter.com/" style={{ color: '#fff' }}>
                <AiFillTwitterSquare size={20}/>
              </a></li>
              <li><a className="nav-link" href="https://youtube.com/" style={{ color: '#fff' }}>
                <AiFillYoutube size={20}/>
              </a></li>
              <li><a className="nav-link" href="https://linkedin.com/" style={{ color: '#fff' }}>
                <AiFillLinkedin size={20}/>
              </a></li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default CopyrightFooter

import styled from 'styled-components'

export const StyledHeroSection = styled.section`
  .hero-row {
    align-items: center;

    .hero-title {
      font-size: 65px;
      font-weight: 600;
    }

    .hero-image {
      display: block;
      margin: 0.5rem auto;
      max-width: 100%;
      border-radius: 5px;
    }
  }

  @media screen and (max-width: 988px) {
    .hero-row .hero-title {
      font-size: 50px;
    }
  }

  @media screen and (max-width: 767px) {
    .hero-row {
      flex-direction: column-reverse!important;

      .hero-title {
        font-size: 40px;
      }
    }
  }
`

import styled from 'styled-components'

export const StyledCallToAction = styled.section`
  .cta-row {
    align-items: center;

    .cta-title {
      font-size: 40px;
      font-weight: 600;
    }

    .cta-image {
      display: block;
      margin: 0.5rem auto;
      max-width: 100%;
      border-radius: 5px;
    }
  }

  @media screen and (max-width: 988px) {
    .cta-row .cta-title {
      font-size: 50px;
    }
  }

  @media screen and (max-width: 767px) {
    .cta-row {
      flex-direction: column-reverse!important;

      .cta-title {
        font-size: 40px;
      }
    }
  }
`

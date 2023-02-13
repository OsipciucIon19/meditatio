import styled from 'styled-components'

export const StyledRegistrationForm = styled.section`
  width: 50%;
  border-radius: 25px;
  max-width: 100%;

  .registration {
    display: flex;
    flex-direction: column;

    &__title {
      margin: 1rem auto;
    }

    &__form {
      margin: 1rem 2rem;

      &__button {
        margin: 1rem auto;
      }
    }
  }

  @media screen and (max-width: 768px) {
    width: 75%;
  }
  
  @media screen and (max-width: 425px) {
    width: 100%;
  }
`
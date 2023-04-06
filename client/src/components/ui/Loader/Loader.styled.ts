import styled from 'styled-components'

export const StyledLoader = styled.div`
  padding: 0;
  margin: 0;
  font-family: 'Futura-Black', sans-serif;
  position: relative;
  height: 250px;
  width: 100%;
  display: flex;
  align-items: center;
  
  .text-loading-wrapper {
    display: flex;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 50%;
  }

  .text-loading {
    position: relative;
    margin: 2rem auto;
    height: 80px;
    width: 80px;
  }

  .yellow, .blue, .brown, .red {
    position: absolute;
  }

  .yellow {
    top: 0;
    left: 0;
  }

  .blue {
    top: 30px;
    left: 0;
  }

  .brown {
    top: 30px;
    left: 30px;
  }

  .red {
    top: 0;
    left: 30px;
  }

  img {
    width: 50px;
    height: 50px;
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }

  .yellow-image {
    animation: yellow-image 1.5s infinite linear;
  }

  .red-image {
    animation: red-image 1.5s infinite linear;
  }

  .brown-image {
    animation: brown-image 1.5s infinite linear;
  }


  .blue-image {
    animation: blue-image 1.5s infinite linear;
  }

  @keyframes yellow-image {
    20% {
      transform: scale(1.2) translate(-2px, -2px);
    }
  }
  @keyframes red-image {
    40% {
      transform: scale(1.2) translate(2px, -2px);
    }
  }
  @keyframes brown-image {
    60% {
      transform: scale(1.2) translate(2px, 2px);
    }
  }
  @keyframes blue-image {
    80% {
      transform: scale(1.2) translate(-2px, 2px);
    }
  }
`
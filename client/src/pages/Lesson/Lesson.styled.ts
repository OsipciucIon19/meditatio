import styled from 'styled-components'

export const StyledLesson = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;

  .menu-button {
    margin: 1.2rem;
  }

  .content-section {
    overflow: overlay;
    width: 100%;
    margin: 0;
    padding: 2rem;
    scroll-behavior: smooth;
  }

  .ps-menuitem-root .ps-active {
    background-color: #fbc93d;

    &:hover {
      background-color: #fbc93d;
    }
  }
  
  .cursor {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #fb4f4f;
    z-index: 9999;
    box-shadow: 1px 1px 17px 0 rgba(251,79,79,1);
    -webkit-box-shadow: 1px 1px 17px 0 rgba(251,79,79,1);
    -moz-box-shadow: 1px 1px 17px 0 rgba(251,79,79,1);
  }
`
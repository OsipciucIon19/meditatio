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
    
    .ex-nr {
      color: #6cc0e5;
      font-size: 26pt;
    }
    
    .unordered-list > li {
      list-style: inside;
    }
    
    .ordered-list > li {
      list-style: lower-alpha;
    }
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
    box-shadow: 1px 1px 17px 0 rgba(251, 79, 79, 1);
    -webkit-box-shadow: 1px 1px 17px 0 rgba(251, 79, 79, 1);
    -moz-box-shadow: 1px 1px 17px 0 rgba(251, 79, 79, 1);
  }

  .notebook {
    position: absolute;
    color: black;
    width: 100%;
    z-index: 3;
    cursor: pointer;

    &__button {
      display: block;
      width: fit-content;
      margin: 0 1rem;
      padding: 0.5rem;
      color: white;
      background: #646464;
      border-radius: 10px 10px 0 0;
    }

    textarea {
      width: 100%;
      background: #646464;
      border: 0;
      padding: 0.5rem;
      color: white;
    }
  }
`
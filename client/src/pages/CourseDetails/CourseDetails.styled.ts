import styled from 'styled-components'

export const StyledCourseDetails = styled.div`
  .course-content {
    margin: 0 auto;
    width: fit-content;
  }
  
  .course-image {
    width: 270px;
    height: 370px;
    background-size: contain;
    border-radius: 5px;
    margin: 0 auto;
    
    p, h3 {
      display: flex;
      justify-content: center;
      padding: 1rem;
    }
  }
  
  .course-price-value {
    font-size: 22pt;
    color: #6cc0e5;
  }
  
  .course-description {
    li {
      list-style: square;
    }
  }
`
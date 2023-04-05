import styled from 'styled-components'

export const StyledCalendar = styled.div`
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 25px;
  
  a {
    color: #403b36;
    text-decoration: none;
  }
  
  #fc-dom-1{
    color: #403b36;
  }
  
  .fc {
    max-height: 680px;
  }
  
  .fc-button {
    border: 0;
    color: #403b36;
    background-color: #6cc0e5;
    
    &:active {
      color: #403b36!important;
      background-color: rgba(108, 192, 229, 0.7)!important;
    }
    
    &:hover {
      color: #403b36;
      background-color: rgba(108, 192, 229, 0.7);
    }
    
    &:disabled {
      &:hover, &:active {
        color: #fff!important;
        background-color: #2c3e50!important;  
      }
      
    }
  }
  
  .fc-today-button {
    border-radius: 25px;
  }
  
  .fc-prev-button {
    border-radius: 25px 0 0 25px;
  }
  
  .fc-next-button {
    border-radius: 0 25px 25px 0;
  }

  .fc .fc-daygrid-day.fc-day-today {
    background-color: rgba(251, 201, 61, 0.3);
  }

  .fc-v-event {
    background-color: #403b36;
    border: 1px solid #403b36;

    .fc-event-main {
      padding: 0 3px;
      overflow: hidden;
    }
  }


    .fc-h-event {
    border-color: #6cc0e5;
    .fc-event-main {
      background: #6cc0e5;
    }
  }

  @media screen and (max-width: 768px) {
    .fc {
      height: 680px;
    }
    
    #fc-dom-1 {
      font-size: 1rem;
    }
  }
`
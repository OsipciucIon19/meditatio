import React, {FC} from 'react'
import Calendar from 'components/calendar/Calendar'
import {useTitle} from 'hooks/useTitle'

const UserCalendar: FC = (props) => {
    useTitle('Calendar')
    
    return (
        <>
            <Calendar/>
        </>
    );
}

export default UserCalendar;
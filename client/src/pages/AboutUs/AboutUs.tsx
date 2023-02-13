import React, {FC} from 'react'
import {useTitle} from 'hooks/useTitle'
import Calendar from "../../components/calendar/Calendar";

const AboutUs: FC = () => {
    useTitle('Despre Noi')
    
    return (
        <div>
            <h1>This is the about us page</h1>
        </div>
    )
}

export default AboutUs

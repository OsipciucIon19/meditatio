import React, {FC} from 'react';

type CallToActionProps = {
    inverted?: boolean,
    title: string,
    image?: string,
    body?: JSX.Element
}

const CallToAction: FC<CallToActionProps> = ({inverted, title, image, body}) => {
    return (
        <div></div>
    )
}

export default CallToAction

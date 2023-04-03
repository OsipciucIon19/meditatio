import React, {FC, useState} from 'react';
import {Button, Form, Input, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Localization from "react-widgets/Localization";
import {DateLocalizer} from "react-widgets/IntlLocalizer";
import DatePicker from "react-widgets/DatePicker";
import {Course} from "../../types/course";

type ScheduleModalProps = {
    modal: boolean
    toggle?: React.KeyboardEventHandler<any> | React.MouseEventHandler<any>
    event: Date
    course: Course
}
const ScheduleModal: FC<ScheduleModalProps> = (props) => {
    const {modal, toggle, event, course} = props
    const [, setSelectedEvent] = useState(event)

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader>Add event</ModalHeader>
            <ModalBody>
                <Localization date={new DateLocalizer({culture: 'ro', firstOfWeek: 1})}>
                    <Form>
                        <div>Title: {course?.subject.title} clasa {course?.subject.grade}</div>
                        <hr/>
                        <div>student id: {}</div>
                        <div>teacher id: {}</div>
                        <div>course id: {course?._id}</div>
                        <hr/>
                        <label>
                            From:
                        </label>
                        <DatePicker
                            value={event}
                            onChange={(value) => setSelectedEvent(value)}
                            includeTime
                        />
                        <label>
                            To:
                        </label>
                        <DatePicker
                            value={new Date(event.getTime() + 60 * 60 * 1000)}
                            disabled
                            includeTime
                        />
                    </Form>
                </Localization>
            </ModalBody>
            <ModalFooter>
                {/*<Button color="primary" onClick={() => setIsModalOpen(false)}>*/}
                {/*    Programeaza*/}
                {/*</Button>*/}
                {/*<Button color="danger" onClick={() => setIsModalOpen(false)}>*/}
                {/*    Cancel*/}
                {/*</Button>*/}
            </ModalFooter>
        </Modal>
    )
}

export default ScheduleModal

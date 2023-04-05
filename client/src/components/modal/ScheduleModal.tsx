import React, {FC, useEffect, useState} from 'react';
import {Button, Form, Input, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Localization from "react-widgets/Localization";
import {DateLocalizer} from "react-widgets/IntlLocalizer";
import DatePicker from "react-widgets/DatePicker"
import {Course} from "../../types/course";

type ScheduleModalProps = {
    modal: boolean
    toggle?: React.KeyboardEventHandler<any> | React.MouseEventHandler<any>
    event: Date
    course: Course
}
const ScheduleModal: FC<ScheduleModalProps> = (props) => {
    const {modal, toggle, event, course} = props
    console.log(event)
    const [, setSelectedEvent] = useState(event)
    const [toEventHours, setToEventHours] = useState<number>(event.getHours())
    const [fromEventHours, setFromEventHours] = useState<number>(event.getHours() + 1)
    const [toEventMinutes, setToEventMinutes] = useState<number>(event.getMinutes())
    const [fromEventMinutes, setFromEventMinutes] = useState<number>(event.getMinutes())
    const [daysAmountSelected, setDaysAmountSelected] = useState('single')
    const monthNames = ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
        "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"
    ]

    const singleSelectedElements = (
        <div>
            <p><b>{`${event.getDate()} ${monthNames[event.getMonth()]}`}</b></p>
            <section className="d-flex">
                <div className="d-flex align-items-center">
                    <label className="w-25 me-2">
                        De la:
                    </label>
                    <div className="d-flex align-items-center">
                        <Input
                            className="w-50"
                            type="number"
                            min="0"
                            max="23"
                            defaultValue={event.getHours()}
                            value={toEventHours < 10 ? `0${toEventHours}` : toEventHours}
                            onChange={(event) => setToEventHours(parseInt(event.target.value))}
                        />
                        <span className="me-1">:</span>
                        <Input
                            className="w-50"
                            type="number"
                            min="0"
                            max="59"
                            value={toEventMinutes < 10 ? `0${toEventMinutes}` : toEventMinutes}
                            onChange={(event) => setToEventMinutes(parseInt(event.target.value))}
                        />
                    </div>
                </div>
                <div className="d-flex align-items-center me-2">
                    <label className="w-50">
                        Până la:
                    </label>
                    <div className="d-flex align-items-center">
                        <Input
                            className="w-50"
                            type="number"
                            min="0"
                            max="23"
                            value={fromEventHours < 10 ? `0${fromEventHours}` : fromEventHours}
                            onChange={(event) => setFromEventHours(parseInt(event.target.value))}
                        />
                        <span className="me-1">:</span>
                        <Input
                            className="w-50"
                            type="number"
                            min="0"
                            max="59"
                            value={fromEventMinutes < 10 ? `0${fromEventMinutes}` : fromEventMinutes}
                            onChange={(event) => setFromEventMinutes(parseInt(event.target.value))}
                        />
                    </div>
                </div>
            </section>
            <DatePicker
                value={event}
                onChange={(value) => setSelectedEvent(value)}
                includeTime
            />
            <label>
                Până la:
            </label>
            <DatePicker
                value={new Date(event.getTime() + 60 * 60 * 1000)}
                disabled
                includeTime
            />
        </div>
    )
    const multipleSelectedElements = <div>multiple</div>

    const handleSelectChange = (event) => {
        setDaysAmountSelected(event.target.value)
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader>Add event</ModalHeader>
            <ModalBody>
                <Localization date={new DateLocalizer({culture: 'ro', firstOfWeek: 1})}>
                    <Form>
                        <div>Title: {course?.subject.title} clasa {course?.subject.grade}</div>
                        <div>course id: {course?._id}</div>
                        <hr/>
                        <div className="d-flex align-items-center mb-3">
                            <label className="me-4" htmlFor="daysAmount">
                                Programează:
                            </label>
                            <Input
                                type="select"
                                name="daysAmount"
                                id="daysAmount"
                                value={daysAmountSelected}
                                onChange={handleSelectChange}
                            >
                                <option value="single">o singură lecție</option>
                                <option value="multiple">mai multe lecții</option>
                            </Input>
                        </div>
                        {daysAmountSelected === 'single' && singleSelectedElements}
                        {daysAmountSelected === 'multiple' && multipleSelectedElements}
                    </Form>
                </Localization>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => {
                }}>
                    Programeaza
                </Button>
                <Button color="danger" onClick={() => {
                }}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default ScheduleModal

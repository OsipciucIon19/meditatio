import React, {FC} from 'react'
import {Input} from 'reactstrap'

type TimeInputProps = {
  time: number
  isHourFormat?: boolean
  handleChange: (number: number, isHourFormat: boolean, isFromInput: boolean) => void
  isFromInput?: boolean
}

const TimeInput: FC<TimeInputProps> = ({time, isHourFormat = false, handleChange, isFromInput}) => {

	return (
		<Input
			className="w-50"
			type="number"
			min="0"
			max={isHourFormat ? '23' : '59'}
			step={isHourFormat ? '1' : '5'}
			defaultValue={time < 10 ? `0${time}` : time}
			onChange={(event) => handleChange(parseInt(event.target.value), isHourFormat, isFromInput)}
		/>
	)
}

export default TimeInput

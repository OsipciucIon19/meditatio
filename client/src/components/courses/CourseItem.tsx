import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'reactstrap'
import 'react-lazy-load-image-component/src/effects/blur.css'

const CourseItem = (props: any) => {
	const [areDetailsShown, setAreDetailsShown] = useState(false)
	const navigate = useNavigate()
    
	return (
		<div
			className="course-card"
			onMouseEnter={() => setAreDetailsShown(true)}
			onMouseLeave={() => setAreDetailsShown(false)}
		>
			<div
				className="course-card__image"
				style={{ background: `url(/images/courses/${props.course.imagePath})` }}
			/>
			<div className={`course-card__content ${areDetailsShown && 'blurry'}`}>
				<h3 className="course-card__content__title mt-5">
					{props.course.subject.title}
				</h3>
				<h4 className="course-card__content__grade">
                    clasa <span className="grade-value">{props.course.subject.grade}</span>
				</h4>
				<div
					className={`course-card__content__additional-info ${areDetailsShown ? 'active' : 'inactive'}`}
				>
					<p className="course-card__content__additional-info__description">
						{props.course.description}
					</p>
					<Button
						className="course-card__content__additional-info__button"
						onClick={
							() => navigate(`/courses/${props.course._id}`)
						}
					>
                        Vezi Detalii
					</Button>
				</div>
			</div>
		</div>
	)
}

export default CourseItem

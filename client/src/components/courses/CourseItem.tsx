import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'reactstrap'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { useTranslation } from 'react-i18next'

const CourseItem = (props: any) => {
  const [areDetailsShown, setAreDetailsShown] = useState(false)
  const navigate = useNavigate()
  const { t } = useTranslation()

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
          {t('courses-class')} <span className="grade-value">{props.course.subject.grade}</span>
        </h4>
        <div
          className={`course-card__content__additional-info ${areDetailsShown ? 'active' : 'inactive'}`}
        >
          <p
            className="course-card__content__additional-info__description"
            dangerouslySetInnerHTML={{
              __html: props.course.description.length > 100 ? props.course.description.substring(0, 100) + '...' : props.course.description
            }}
          />
          <Button
            className="course-card__content__additional-info__button"
            onClick={
              () => navigate(`/courses/${props.course._id}`)
            }
          >
            {t('courses-see-details')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CourseItem

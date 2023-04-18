import React, { useEffect, useRef, useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar'
import { Button } from 'reactstrap'
import { RxHamburgerMenu, TbTriangleFilled } from 'react-icons/all'
import { StyledLesson } from './Lesson.styled'
import { useLocation } from 'react-router-dom'
import { convertToRomanNumber } from '../../utils/events'
import { io } from 'socket.io-client'

const socket = io('http://localhost:5000')

const Lesson = () => {
  const { collapseSidebar } = useProSidebar()
  const { state } = useLocation()
  const { eventContent } = state
  const [activeTab, setActiveTab] = useState({ paragraph: 1, lesson: 1 })
  const mainSection = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 9999, y: 9999 })
  const [isNoteBookOpened, setIsNoteBookOpened] = useState(false)
  const [notebookInput, setNotebookInput] = useState('')

  useEffect(() => {
    socket?.on('receive-lesson', (data) => {
      mainSection.current.scrollTop = 0
      setActiveTab(data)
    })

    socket?.on('receive-mouse-position', (data) => {
      setMousePosition(data)
    })

    socket?.on('receive-toggle-notebook', (data) => {
      setIsNoteBookOpened(data)
    })

    socket?.on('receive-write-to-notebook', (data) => {
      setNotebookInput(data)
    })
  }, [socket])

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event
      setTimeout(() => {
        socket?.emit('mouse-position', { x: clientX, y: clientY })
      }, 100)
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const changeTab = (activeTab) => {
    mainSection.current.scrollTop = 0
    setActiveTab(activeTab)
    socket?.emit('select-lesson', activeTab)
  }

  const toggleNotebook = () => {
    socket?.emit('toggle-notebook', !isNoteBookOpened)
    setIsNoteBookOpened(prevState => !prevState)
  }

  const handleNotebookInput = (value) => {
    socket?.emit('write-to-notebook', value)
    setNotebookInput(value)
  }

  return (
    <StyledLesson>
      <Sidebar>
        <Button className="menu-button" onClick={() => collapseSidebar()}>
          <RxHamburgerMenu />
        </Button>
        <Menu>
          {eventContent?.content?.paragraphs?.map(paragraph =>
            <SubMenu
              icon={<span>{convertToRomanNumber(paragraph.index)}.</span>}
              key={paragraph.index}
              label={paragraph.title}
            >
              {paragraph.lessons?.map(lesson =>
                <MenuItem
                  active={lesson.index === activeTab.lesson && paragraph.index === activeTab.paragraph}
                  key={lesson.title}
                  icon={<span>{lesson.index}.</span>}
                  onClick={() => changeTab({ paragraph: paragraph.index, lesson: lesson.index })}
                >
                  {lesson.title}
                </MenuItem>
              )}
            </SubMenu>)}
        </Menu>
      </Sidebar>
      <section
        ref={mainSection}
        className="content-section"
        dangerouslySetInnerHTML={{
          __html: eventContent?.content?.paragraphs[activeTab.paragraph - 1]?.lessons[activeTab.lesson - 1]?.content
        }}
      />
      <div className="notebook" style={{ top: isNoteBookOpened ? '70%' : '95%' }}>
        <span
          className="notebook__button"
          onClick={() => toggleNotebook()}
        >
          <TbTriangleFilled style={{ transform: isNoteBookOpened ? 'rotate(180deg)' : 'rotate(0)' }}/> Maculator
        </span>
        <pre><textarea
          rows={50}
          value={notebookInput}
          onChange={(e) => handleNotebookInput(e.target.value)}
        ></textarea></pre>
      </div>
      <div
        className="cursor"
        style={{
          top: mousePosition.y - 98,
          left: mousePosition.x
        }}
      />
    </StyledLesson>
  )
}

export default Lesson

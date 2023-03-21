import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { ImageContainer } from '../image-container/ImageContainer'
import { ImgCollector } from '../img-collector/ImgCollector'
import { Images } from '../pwd-builder/PwdBuilder'

type Props = {
  pwdImages: Images[] | any
  pwdVisibility: boolean
  dragSource: string
  dragDestination: string
}

export const PwdContainer = (props: Props) => {
  const { pwdImages, dragSource, dragDestination } = props
  function getStyle(style: any) {
    return {
      ...style,
      transform: dragSource === 'gridContainer' ? 'none' : style.transform,
    }
  }
  return (
    <section
      className={`w-full border border-gray-300
       sm:p-1 md:p-2 xl:p-3 sm:my-1 md:my-2 xl:my-3 rounded-lg flex gap-7 items-center justify-center`}
    >
      <Droppable droppableId='pwdContainer' direction='horizontal'>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`w-full flex sm:flex-wrap gap-7 items-center justify-center`}
          >
            {pwdImages.map((img: Images, i: number) => {
              return (
                <Draggable key={img.id} draggableId={img.id.toString()} index={i}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getStyle(provided.draggableProps.style)}
                      className={`${
                        dragDestination === 'gridContainer' && dragSource === 'pwdContainer' ? 'transform-none' : ''
                      }`}
                    >
                      {img.imageSrc ? (
                        <ImageContainer
                          imageSrc={img.imageSrc}
                          imageAlt={img.imageAlt}
                          snapshot={snapshot}
                          pwdVisibility={props.pwdVisibility}
                        />
                      ) : (
                        <ImgCollector snapshot={snapshot} />
                      )}
                    </div>
                  )}
                </Draggable>
              )
            })}

            {dragSource === 'gridContainer' ? '' : provided.placeholder}
          </div>
        )}
      </Droppable>
    </section>
  )
}

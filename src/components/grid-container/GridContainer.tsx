import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { Images } from '../pwd-builder/PwdBuilder';
type Props = {
  children?: React.ReactNode;
  styles?: React.CSSProperties;
  data?: object;
  className?: string;
  gridImages: Images[];
};

export const GridContainer = (props: Props) => {
  function getStyle(style: any, snapshot: any) {
    if (!snapshot.isDropAnimating) {
      return {
        ...style,
        transform: 'none',
        transition: 'none',
      };
    } else if (snapshot.isDraggingOver) {
      return {
        border: '1px solid orange',
        ...style,
        transitionDuration: `all 0.1s ease-in-out`,
      };
    }
    return {
      ...style,
      transitionDuration: `0.0001s`,
    };
  }
  const { children, styles, className, gridImages } = props;
  return (
    <Droppable droppableId='gridContainer' direction='horizontal'>
      {(provided, snapshot) => (
        <div
          className={`${className} w-full border rounded-lg border-gray-300 flex flex-wrap items-center justify-center gap-7 md:my-1 md:p-2 sm:p-1 max-h-[40%] `}
          style={{
            ...styles,
            transform: snapshot.isDraggingOver ? 'none' : 'none',
          }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {children}
          {gridImages.map((img, index) => {
            return (
              <Draggable key={img.id} draggableId={img.id.toString()} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getStyle(provided.draggableProps.style, snapshot)}
                  >
                    <div
                      className={`relative rounded-lg hover:cursor-move `}
                      style={{
                        top: `${snapshot.isDragging ? '-50%' : 'auto'}`,
                        left: `${snapshot.isDragging ? '-20%' : 'auto'}`,
                      }}
                    >
                      <img
                        className='object-cover rounded-lg p-0 md:w-[80px] md:h-[80px] sm:w-[60px] sm:h-[60px] hover:scale-105 transition-all duration-200 ease-in-out'
                        src={img.imageSrc}
                        alt={img.imageAlt}
                        loading='lazy'
                        style={snapshot.isDragging ? { opacity: '5%' } : {}}
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            );
          })}
          {/* {provided.placeholder} */}
        </div>
      )}
    </Droppable>
  );
};

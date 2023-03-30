import React, { useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { toast } from 'react-hot-toast';
import uuid from 'react-uuid';
import { useAuthProvider } from '../../context/auth/VisualDAuthProvider';
import { AuthFormActionsTypes } from '../../context/typings.context';
import { useUi } from '../../context/ui/UiProvider';
import { RouteNames } from '../../utility/getSteps';
import { GridContainer } from '../grid-container/GridContainer';
import { HidePwdEye } from '../icons/pwd-eye-icon/HidePwdEye';
import { ShowPwdEye } from '../icons/pwd-eye-icon/ShowPwdEye';
import { PwdContainer } from '../pwd-container/PwdContainer';

export type Images = {
  imageSrc: string;
  imageAlt: string;
  id: string;
};
const gridImagesArray: Images[] = [];
const readImages = () => {
  const images = [];
  for (let i = 1; i <= 24; i++) {
    images.push({
      id: uuid(),
      imageSrc: `https://picsum.photos/150/150?random=${i}`,
      imageAlt: uuid(),
    });
  }
  return images;
};
const pwdImagesArray = [
  { id: uuid() },
  { id: uuid() },
  { id: uuid() },
  { id: uuid() },
  { id: uuid() },
  { id: uuid() },
  { id: uuid() },
  { id: uuid() },
];
export const PwdBuilder = () => {
  const [gridImages, setGridImages] = React.useState<Images[]>([...gridImagesArray]);
  const [pwdImages, setPwdImages] = React.useState<Images[] | any>([...pwdImagesArray]);
  const [pwdVisible, setPwdVisible] = React.useState<boolean>(false);

  const [dragSource, setDragSource] = React.useState<string>('');

  const [dragDestination, setDragDestination] = React.useState<string>('');
  const onDragStartHandler = (result: any) => {
    setDragSource(result.source.droppableId);
  };

  const onDragUpdateHandler = (result: any) => {
    setDragDestination(result.destination?.droppableId);
  };

  function isPwdEmpty(objects: Images[]): boolean {
    return objects.some((obj) => Boolean(obj.imageSrc));
  }
  const dragEndHandler = (result: DropResult) => {
    if (pwdImages?.length > 8) {
      return;
    }
    if (!result.destination) {
      return;
    } else if (
      result.destination.droppableId === result.source.droppableId &&
      result.source.droppableId === 'pwdContainer'
    ) {
      const activeImage = pwdImages[result.source.index];
      const newPwdImages = [...pwdImages];
      newPwdImages.splice(result.source.index, 1);
      newPwdImages.splice(result.destination.index, 0, activeImage);
      setPwdImages(newPwdImages);
    } else if (
      result.destination.droppableId === result.source.droppableId &&
      result.source.droppableId === 'gridContainer'
    ) {
      const activeImage = gridImages[result.source.index];
      const newGridImages = [...gridImages];
      newGridImages.splice(result.source.index, 1);
      newGridImages.splice(result.destination.index, 0, activeImage);
      setGridImages(newGridImages);
    } else if (result.destination.droppableId === 'pwdContainer' && result.source.droppableId === 'gridContainer') {
      if (isOnlyTwoSixImagesInPwd(pwdImages)) {
        toast.error('You can only drag and drop six images.');
        return;
      }
      const activeImage = gridImages[result.source.index];
      const newGridImages = [...gridImages];
      newGridImages.splice(result.source.index, 1);
      newGridImages.splice(result.source.index, 0, {
        ...activeImage,
        id: uuid(),
      });
      setGridImages(newGridImages);
      const newPwdImages = [...pwdImages];
      newPwdImages.splice(result.destination.index, 1);
      newPwdImages.splice(result.destination.index, 0, activeImage);
      setPwdImages(newPwdImages);
    } else {
      const newPwdImages = [...pwdImages];
      newPwdImages.splice(result.source.index, 1);
      newPwdImages.splice(result.source.index, 0, {
        id: uuid(),
      });
      setPwdImages(newPwdImages);
    }
  };

  const { authFormDispatch } = useAuthProvider();

  const {
    uiState: { chosenRoute },
  } = useUi();

  useEffect(() => {
    setGridImages([...readImages()]);
  }, []);

  useEffect(() => {
    if (isPwdEmpty(pwdImages)) {
      authFormDispatch({
        type: AuthFormActionsTypes.SET_PWD_IMAGES,
        payload: pwdImages,
      });
    }
  }, [pwdImages, authFormDispatch]);

  const isOnlyTwoSixImagesInPwd = (pwdImages: Images[]) => {
    const filteredImages = pwdImages.filter((image) => {
      return Boolean(image.imageSrc);
    });
    return filteredImages?.length === 6;
  };

  return (
    <DragDropContext onDragEnd={dragEndHandler} onDragStart={onDragStartHandler} onDragUpdate={onDragUpdateHandler}>
      <section className='mb-3'>
        <div className='text-start py-3 my-2'>
          <h2 className='text-2xl font-extrabold text-gray-500'>
            {chosenRoute === RouteNames.REGISTER ? 'Create' : 'Enter'} your password.
          </h2>
          <span className='font-bold text-md text-bluelight'>
            You need to drag and drop <span className='text-red-400'>any six</span> images from the given grid of images
            to drop zone given below.
          </span>
        </div>
        <GridContainer gridImages={gridImages} />
        <section className='flex justify-between items-center my-3'>
          <h3 className='text-xl font-extrabold text-gray-500 text-start'>Your Password.</h3>
          {isPwdEmpty(pwdImages) ? (
            <div className='flex items-center gap-5'>
              <button className='text-bluelighter ont-semibold' onClick={() => setPwdImages([...pwdImagesArray])}>
                Reset Password
              </button>
              <button
                className='text-bluelighter flex items-center gap-2 font-semibold'
                onClick={() => setPwdVisible((prev) => !prev)}
              >
                {pwdVisible ? 'Hide Password' : 'Show Password'}
                <span>{pwdVisible ? <HidePwdEye /> : <ShowPwdEye />}</span>
              </button>
            </div>
          ) : (
            ''
          )}
        </section>
        <PwdContainer
          pwdImages={pwdImages}
          pwdVisibility={pwdVisible}
          dragSource={dragSource}
          dragDestination={dragDestination}
        />
      </section>
    </DragDropContext>
  );
};

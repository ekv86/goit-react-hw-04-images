import { ImageGallery } from './ImageGallery';

export const App = () => {
  return (
    <div
      className=""
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <ImageGallery />
    </div>
  );
};

import ImageGallery from "./ImageGallery";
import AlbumGallery from "./AlbumGallery";

function Home() {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Image Gallery App</h1>
      <div className="row mb-4">
        <AlbumGallery />
      </div>
      <div className="row">
        <div className="">
          <ImageGallery />
        </div>
      </div>
    </div>
  );
}

export default Home;

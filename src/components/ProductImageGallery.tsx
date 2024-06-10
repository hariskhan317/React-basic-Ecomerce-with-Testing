const ProductImageGallery = ({ imageUrls }: { imageUrls: string[] }) => {
  if (imageUrls.length === 0) return <>dasdgit</>;

  return (
    <ul>
      {imageUrls.map((url) => (
        <li key={url}>
          <img src={url} />
        </li>
      ))}
    </ul>
  );
};

export default ProductImageGallery;

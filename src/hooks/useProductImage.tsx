import { useState } from 'react';
import { uploadProductImages, getProductImageById, ProductImageResponse } from '../services/productImage';

const useProductImage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImages = async (images: File[]): Promise<number[]> => {
    setLoading(true);
    setError(null);
    try {
      const imageIds = await uploadProductImages(images);
      setLoading(false);
      return imageIds;
    } catch (err) {
      setError('Error uploading images');
      setLoading(false);
      throw err;
    }
  };

  const getImageById = async (id: number): Promise<ProductImageResponse> => {
    setLoading(true);
    setError(null);
    try {
      const image = await getProductImageById(id);
      setLoading(false);
      return image;
    } catch (err) {
      setError('Error fetching image');
      setLoading(false);
      throw err;
    }
  };

  return {
    uploadImages,
    getImageById,
    loading,
    error,
  };
};

export default useProductImage;

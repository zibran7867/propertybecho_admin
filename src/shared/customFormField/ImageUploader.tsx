import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { MdDelete } from 'react-icons/md';
import './custom.scss';

export interface Image {
    id: number;
    url: File | string;
}

interface ImageUploaderProps {
    imageArray: Image[];
    images: Image[];
    setImages: (images: Image[]) => void;
    deleteImages: Image[];
    setDeleteImages: (deleteImages: Image[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = (props) => {
    const { imageArray, images, setImages, deleteImages, setDeleteImages } = props;

    useEffect(() => {
        setImages(imageArray);
    }, [imageArray]);

    const onDrop = (acceptedFiles: File[]) => {
        const newImages: Image[] = acceptedFiles.map((file, index) => ({
            id: images.length + index + 1,
            url: file,
        }));

        setImages([...images, ...newImages]);
    };

    const handleImageDelete = (deleteImage: Image) => {
        if (typeof deleteImage?.url === 'string') {
            setDeleteImages([...deleteImages, deleteImage]);
        } else {
            setImages(images.filter((img) => img.id !== deleteImage.id));
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className='flex mt-2 gap-2 flex-wrap'>
            {images?.map((image, index) => {
                const preview =
                    image?.url instanceof File
                        ? URL.createObjectURL(image.url)
                        : image.url;
                if (
                    !deleteImages.some(
                        (delImg) => delImg.id === image.id && delImg.url === image.url
                    )
                ) {
                    return (
                        <div key={index} className={`rounded-lg form-upload-img`}>
                            <img src={preview} alt={`Images ${image?.id}`} />
                            <div className='form-upload-pdf-icon'>
                                <div className='flex gap-5'>
                                    <div
                                        className='bg-white w-[40px] h-[40px] rounded-full flex items-center justify-center hover:cursor-pointer hover:bg-primary-200'
                                        onClick={() => handleImageDelete(image)}
                                    >
                                        <MdDelete className='text-xl' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                } else return null;
            })}
            <input {...getInputProps()} style={{ display: 'none' }} />
            <div {...getRootProps()}>
                <label className="w-full flex flex-col items-center px-4 py-[42px] bg-white rounded-lg tracking-wide uppercase border cursor-pointer ">
                    <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span className="mt-2 text-base">Select a file</span>
                </label>
            </div>
        </div>
    );
};

export default ImageUploader;
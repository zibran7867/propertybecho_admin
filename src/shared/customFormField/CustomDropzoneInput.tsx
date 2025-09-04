import { FieldProps } from 'formik';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { HiOutlineDownload } from 'react-icons/hi';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import PdfPreview from './PdfPreview';

interface CustomDropzoneInputProps extends FieldProps {
    preview?: string | File | any;
    label?: string;
    disabled?: boolean;
    onChange?: (value: any) => void;
}

const CustomDropzoneInput: React.FC<CustomDropzoneInputProps> = ({
    field: { ...fields },
    form: { touched, errors },
    ...props
}) => {
    const { onChange, preview, disabled, label } = props
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => onChange && onChange(acceptedFiles[0])
    });

    const error = Boolean(touched[fields.name] && errors[fields.name]);

    const isPdf = preview &&
        (preview.type === 'application/pdf' ||
            (typeof preview === 'string' && preview.toLowerCase().includes('.pdf')));

    const isImage = preview &&
        (preview.type === 'image/jpg' ||
            preview.type === 'image/jpeg' ||
            preview.type === 'image/png');

    return (
        <>
            {label && <label className='ml-2.5' htmlFor='label'>{label}</label>}
            <div className={`${error && "error-red-border"}`}>
                {!preview ? (
                    <div {...getRootProps()}>
                        <label className=" flex flex-col items-center px-4 py-[42px] bg-white rounded-lg tracking-wide uppercase border cursor-pointer ">
                            <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                            </svg>
                            <span className="mt-2 text-base">Select a file</span>
                        </label>
                    </div>
                ) : (
                        <div className={`border rounded-lg ${isPdf ? 'form-upload-pdf' : 'form-upload-img'} `}>
                        {isPdf ? (
                            <>
                                <PdfPreview file={preview} />

                                <div className='form-upload-pdf-icon'>
                                    <div className='flex gap-5'>
                                        {!disabled && <div  {...getRootProps()} className='bg-white w-[40px] h-[40px] rounded-full flex items-center justify-center hover:cursor-pointer hover:bg-primary-200'>
                                            <MdOutlineModeEditOutline className='text-xl' />
                                        </div>}
                                        <div className='bg-white w-[40px] h-[40px] rounded-full  items-center justify-center hover:cursor-pointer hover:bg-primary-200 flex'>
                                            <a target='_blank' href={preview} download rel="noreferrer">
                                                <HiOutlineDownload className='text-xl' />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                                isImage ? (
                                <>
                                    <img src={URL.createObjectURL(preview)} alt="Preview" />
                                    <div className='form-upload-pdf-icon'>
                                        <div className='flex gap-5'>
                                            {!disabled && <div  {...getRootProps()} className='bg-white w-[40px] h-[40px] rounded-full flex items-center justify-center hover:cursor-pointer hover:bg-primary-200'>
                                                <MdOutlineModeEditOutline className='text-xl' />
                                            </div>}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <img src={preview} {...getRootProps()} alt="Preview" />
                                    <div className="form-upload-pdf-icon">
                                        <div className='flex gap-5'>
                                            {!disabled && <div  {...getRootProps()} className='bg-white w-[40px] h-[40px] rounded-full flex items-center justify-center hover:cursor-pointer hover:bg-primary-200'>
                                                <MdOutlineModeEditOutline className='text-xl' />
                                            </div>}
                                        </div>
                                    </div>
                                </>
                            )
                        )}
                    </div>
                )}
                <input id={label} {...getInputProps()} style={{ display: 'none' }} />
                {error && <span className="text-sm text-danger ms-2">{errors[fields?.name] as string}</span>}
            </div>
        </>
    );
};

export default CustomDropzoneInput;

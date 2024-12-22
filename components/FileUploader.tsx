"use client";
import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type FileUploaderFiles = {
  files: File[] | undefined;
  onChange: (file: File[]) => void;
};

const FileUploader = ({ files, onChange }: FileUploaderFiles) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="file-upload" {...getRootProps()}>
      <input {...getInputProps()} />
      {files && files.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          width={1000}
          height={1000}
          className="max-h-[400px] overflow-hidden object-cover"
          alt="uploaded"
        />
      ) : (
        <>
          <Image
            src={"/assets/icons/upload.svg"}
            alt="upload"
            width={40}
            height={40}
            className=""
          />
          <div className="file-upload_label">
            <p className="text-14-regular">
              <span className="text-green-500">Click to upload </span>
              or drag and drop
            </p>
            <p>SVG, PNG, JPG, or Gif (max 800x400)</p>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUploader;

import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface Props {
  onChange: (file: string) => void;
}

export function FileUpload({ onChange }: Props) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    },
  });

  return (
    <section style={{ width: '100%', height: '20%' }}>
      <div {...getRootProps({ className: 'dropzone' })}>
        <p>
          <span aria-label="img" role="img">
            🚀
          </span>
          Upload Color Palette
        </p>
        <input {...getInputProps()} />
      </div>
    </section>
  );
}

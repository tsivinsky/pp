import React, { useState } from "react";

export const useDropzone = (
  onSubmitFiles: (files: DataTransferItemList) => void
) => {
  const [isActive, setIsActive] = useState(false);

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsActive(false);

    if (e.dataTransfer.items) {
      onSubmitFiles(e.dataTransfer.items);
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsActive(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsActive(false);
  };

  const handlers = {
    onDrop,
    onDragOver,
    onDragLeave,
  };

  return {
    handlers,
    isActive,
  };
};

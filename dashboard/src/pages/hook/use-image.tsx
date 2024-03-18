import { useEffect, useState } from "react";

type UploadError = string | null;
interface FileInfo {
  file: File | null;
  previewUrl: string | null;
  error: UploadError;
  uploadProgress: number;
}

const useImageUpload = (): FileInfo => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<UploadError>(null);
  const [upload, setUpload] = useState(0);

  const handlFileChange = (event: React.ChangeEvent<HTMLAnchorElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      setFile(null);
      setPreviewUrl(null);
      setError(null);
      return;
    }

    if (!["image/jpeg", "image/png"].includes(selectedFile.type)) {
      setError("Invalid file type");
      return;
    }

    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setPreviewUrl(reader.result as string);
      }
    };
    reader.readAsDataURL(selectedFile);

    setUpload(0);
  };

  const handleUpload = async (uploadUrl: string): Promise<void> => {
    if (!file) {
      setError("Please select an image to upload");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
        onUploadProgress: (event) => {
          const progress = Math.round((event.loaded * 100) / event.total);
          setUpload(progress);
        },
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      // Handle successful upload response (e.g., clear state)
      setFile(null);
      setPreviewUrl(null);
      setError(null);
      setUpload(0);
    } catch (error) {
      setError(error.message || "Upload failed");
    }
  };
  return { file, previewUrl, error, upload, handlFileChange, handleUpload };
};

export default useImageUpload;

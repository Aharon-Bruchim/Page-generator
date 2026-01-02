import { useState, useCallback } from 'react';

interface UseFileUploadOptions {
  maxSizeInMB?: number;
}

interface FileUploadResult {
  content: string;
  fileName: string;
  mimeType: string;
  size: number;
}

interface UseFileUploadReturn {
  uploadFile: (file: File) => Promise<FileUploadResult>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

export function useFileUpload(options: UseFileUploadOptions = {}): UseFileUploadReturn {
  const { maxSizeInMB = 10 } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = useCallback(
    (file: File): Promise<FileUploadResult> => {
      return new Promise((resolve, reject) => {
        setIsLoading(true);
        setError(null);

        // Validate file size
        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
        if (file.size > maxSizeInBytes) {
          const errorMsg = `גודל הקובץ חורג מהמותר (${maxSizeInMB}MB)`;
          setError(errorMsg);
          setIsLoading(false);
          reject(new Error(errorMsg));
          return;
        }

        const reader = new FileReader();

        reader.onload = (event) => {
          const result = event.target?.result as string;
          // Extract base64 content (remove data URL prefix)
          const base64Content = result.split(',')[1] || result;

          setIsLoading(false);
          resolve({
            content: base64Content,
            fileName: file.name,
            mimeType: file.type || 'application/octet-stream',
            size: file.size,
          });
        };

        reader.onerror = () => {
          const errorMsg = 'שגיאה בקריאת הקובץ';
          setError(errorMsg);
          setIsLoading(false);
          reject(new Error(errorMsg));
        };

        reader.readAsDataURL(file);
      });
    },
    [maxSizeInMB]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { uploadFile, isLoading, error, clearError };
}

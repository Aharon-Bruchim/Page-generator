import { useState, useCallback } from 'react';

interface UseImageUploadOptions {
  maxSizeInMB?: number;
  acceptedFormats?: string[];
}

interface UseImageUploadReturn {
  uploadImage: (file: File) => Promise<string>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

export function useImageUpload(options: UseImageUploadOptions = {}): UseImageUploadReturn {
  const { maxSizeInMB = 5, acceptedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = useCallback(
    (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        setIsLoading(true);
        setError(null);

        // Validate file type
        if (!acceptedFormats.includes(file.type)) {
          const errorMsg = `פורמט קובץ לא נתמך. פורמטים נתמכים: ${acceptedFormats.join(', ')}`;
          setError(errorMsg);
          setIsLoading(false);
          reject(new Error(errorMsg));
          return;
        }

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
          setIsLoading(false);
          resolve(result);
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
    [maxSizeInMB, acceptedFormats]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { uploadImage, isLoading, error, clearError };
}

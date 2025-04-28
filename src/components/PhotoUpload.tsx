
import React, { useState, useRef } from 'react';
import { Camera, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PhotoUploadProps {
  onPhotoUploaded: (url: string | null) => void;
  existingUrl: string | null;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onPhotoUploaded, existingUrl }) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(existingUrl);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      // In a real app, you would upload to a server
      // For this demo, we'll create a local object URL
      const localUrl = URL.createObjectURL(file);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPhotoUrl(localUrl);
      onPhotoUploaded(localUrl);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoUrl(null);
    onPhotoUploaded(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {photoUrl ? (
        <div className="relative rounded-lg overflow-hidden border border-gray-200">
          <img
            src={photoUrl}
            alt="Uploaded issue"
            className="w-full h-auto object-cover max-h-64"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full"
            onClick={handleRemovePhoto}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          className={cn(
            "w-full h-24 border-dashed border-2 flex flex-col items-center justify-center gap-2",
            isUploading && "opacity-50 cursor-not-allowed"
          )}
          disabled={isUploading}
          onClick={triggerFileInput}
        >
          <Camera className="h-6 w-6 text-gray-400" />
          <span className="text-sm text-gray-500">
            {isUploading ? "Uploading..." : "Tap to upload photo"}
          </span>
        </Button>
      )}
    </div>
  );
};

export default PhotoUpload;

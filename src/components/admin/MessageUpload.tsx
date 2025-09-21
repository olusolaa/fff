'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  Upload, 
  X, 
  Music, 
  AlertCircle, 
  CheckCircle, 
  Loader2,
  Calendar,
  User,
  Tag,
  Star,
  FileText,
  Image
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { adminApi } from '@/lib/api-client';

interface MessageUploadProps {
  onSuccess?: (message: any) => void;
  onCancel?: () => void;
}

interface UploadedFile {
  file: File;
  preview?: string;
  duration?: number;
  size: number;
}

const categories = [
  'Discipleship Class',
  'Marriage Forum',
  'Singles Club',
  'Family Life',
  'Youth',
  'Others'
];

const preachers = [
  'Dr. Evelyn Reed',
  'Rev. Michael Chen', 
  'Pastor Sarah Jones',
  'Guest Speaker'
];

export default function MessageUpload({ onSuccess, onCancel }: MessageUploadProps) {
  const { toast } = useToast();
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    preacher: '',
    date_preached: '',
    series: '',
    category: 'Others',
    status: 'draft',
    transcript: '',
    summary: '',
    featured_image_url: '',
    tags: '',
    featured: false,
    download_enabled: true,
    meta_description: '',
    keywords: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    
    if (!file) return;

    // Validate file type
    if (!file.type.includes('audio/mpeg') && !file.name.toLowerCase().endsWith('.mp3')) {
      toast({
        variant: "destructive",
        title: "Invalid File Type",
        description: "Please upload an MP3 audio file.",
      });
      return;
    }

    // Validate file size (max 500MB)
    if (file.size > 500 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File Too Large",
        description: "Maximum file size is 500MB.",
      });
      return;
    }

    // Create audio element to get duration
    const audio = new Audio();
    const url = URL.createObjectURL(file);
    audio.src = url;
    
    audio.addEventListener('loadedmetadata', () => {
      setUploadedFile({
        file,
        duration: Math.floor(audio.duration),
        size: file.size
      });
      URL.revokeObjectURL(url);
    });

    audio.addEventListener('error', () => {
      setUploadedFile({
        file,
        size: file.size
      });
      URL.revokeObjectURL(url);
    });

  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/mpeg': ['.mp3']
    },
    multiple: false,
    maxSize: 500 * 1024 * 1024 // 500MB
  });

  const removeFile = () => {
    setUploadedFile(null);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.preacher.trim()) {
      newErrors.preacher = 'Preacher is required';
    }
    if (!formData.date_preached) {
      newErrors.date_preached = 'Date preached is required';
    }
    if (!uploadedFile) {
      newErrors.file = 'Audio file is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fix the errors and try again.",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Create FormData for multipart upload
      const uploadData = new FormData();
      
      // Add audio file
      uploadData.append('audio_file', uploadedFile!.file);
      
      // Add form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          uploadData.append(key, value.toString());
        }
      });

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const result = await adminApi.uploadMessage(uploadData);

      clearInterval(progressInterval);
      setUploadProgress(100);
      
      toast({
        title: "Upload Successful",
        description: `Message "${formData.title}" has been uploaded successfully.`,
      });

      // Reset form
      setFormData({
        title: '',
        preacher: '',
        date_preached: '',
        series: '',
        category: 'Others',
        status: 'draft',
        transcript: '',
        summary: '',
        featured_image_url: '',
        tags: '',
        featured: false,
        download_enabled: true,
        meta_description: '',
        keywords: ''
      });
      setUploadedFile(null);
      setErrors({});

      if (onSuccess) {
        onSuccess(result);
      }

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "There was an error uploading your message. Please try again.",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Upload New Message</h1>
          <p className="text-gray-600">Upload MP3 audio file with message details</p>
        </div>
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Music className="h-5 w-5" />
              <span>Audio File</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!uploadedFile ? (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive 
                    ? 'border-primary bg-primary/5' 
                    : 'border-gray-300 hover:border-primary hover:bg-gray-50'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">
                  {isDragActive ? 'Drop MP3 file here...' : 'Drag & drop MP3 file here'}
                </p>
                <p className="text-gray-600 mb-4">or click to browse files</p>
                <p className="text-sm text-gray-500">Maximum file size: 500MB</p>
              </div>
            ) : (
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded">
                      <Music className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{uploadedFile.file.name}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{formatFileSize(uploadedFile.size)}</span>
                        {uploadedFile.duration && (
                          <span>{formatDuration(uploadedFile.duration)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={removeFile}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            {errors.file && (
              <p className="text-red-600 text-sm mt-2 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.file}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Message Details */}
        <Card>
          <CardHeader>
            <CardTitle>Message Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Title */}
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter message title"
                className={errors.title ? 'border-red-500' : ''}
              />
              {errors.title && (
                <p className="text-red-600 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Preacher and Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="preacher">Preacher *</Label>
                <Select
                  value={formData.preacher}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, preacher: value }))}
                >
                  <SelectTrigger className={errors.preacher ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select preacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {preachers.map((preacher) => (
                      <SelectItem key={preacher} value={preacher}>
                        {preacher}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.preacher && (
                  <p className="text-red-600 text-sm mt-1">{errors.preacher}</p>
                )}
              </div>

              <div>
                <Label htmlFor="date_preached">Date Preached *</Label>
                <Input
                  id="date_preached"
                  type="datetime-local"
                  value={formData.date_preached}
                  onChange={(e) => setFormData(prev => ({ ...prev, date_preached: e.target.value }))}
                  className={errors.date_preached ? 'border-red-500' : ''}
                />
                {errors.date_preached && (
                  <p className="text-red-600 text-sm mt-1">{errors.date_preached}</p>
                )}
              </div>
            </div>

            {/* Category and Series */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="series">Series (Optional)</Label>
                <Input
                  id="series"
                  value={formData.series}
                  onChange={(e) => setFormData(prev => ({ ...prev, series: e.target.value }))}
                  placeholder="Enter series name"
                />
              </div>
            </div>

            {/* Summary */}
            <div>
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                placeholder="Brief description of the message"
                rows={3}
              />
            </div>

            {/* Tags */}
            <div>
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                placeholder="Enter tags separated by commas (e.g., grace, faith, hope)"
              />
              <p className="text-sm text-gray-600 mt-1">Separate multiple tags with commas</p>
            </div>
          </CardContent>
        </Card>

        {/* Publishing Options */}
        <Card>
          <CardHeader>
            <CardTitle>Publishing Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                  />
                  <Label htmlFor="featured" className="flex items-center space-x-1">
                    <Star className="h-4 w-4" />
                    <span>Featured Message</span>
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="download_enabled"
                    checked={formData.download_enabled}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, download_enabled: checked }))}
                  />
                  <Label htmlFor="download_enabled">Allow Downloads</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upload Progress */}
        {isUploading && (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Uploading...</span>
                  <span className="text-sm text-gray-600">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button
            type="submit"
            disabled={isUploading || !uploadedFile}
            className="min-w-[120px]"
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload Message
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

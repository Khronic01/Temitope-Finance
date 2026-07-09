'use client'

import React, { useState, useRef } from 'react'
import { Upload, X, FileText } from 'lucide-react'

interface DocumentUploadProps {
  label: string
  onFileSelect: (file: File) => void
  acceptedFormats?: string[]
  maxSize?: number
  error?: string
  required?: boolean
  file?: File | null
}

export default function DocumentUpload({
  label,
  onFileSelect,
  acceptedFormats = ['pdf', 'jpg', 'png'],
  maxSize = 10 * 1024 * 1024,
  error,
  required,
  file,
}: DocumentUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true)
    } else if (e.type === 'dragleave') {
      setIsDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFile(files[0])
    }
  }

  const handleFile = (selectedFile: File) => {
    const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase()

    if (!fileExtension || !acceptedFormats.includes(fileExtension)) {
      return
    }

    if (selectedFile.size > maxSize) {
      return
    }

    onFileSelect(selectedFile)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}

      {!file ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
            isDragActive
              ? 'border-primary bg-blue-50'
              : error
                ? 'border-red-500 bg-red-50'
                : 'border-border bg-background hover:border-primary'
          }`}
        >
          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground mb-1">Drop your file here or click to browse</p>
          <p className="text-xs text-muted-foreground">
            Accepted formats: {acceptedFormats.join(', ').toUpperCase()}
          </p>
          <p className="text-xs text-muted-foreground">Max file size: {(maxSize / 1024 / 1024).toFixed(0)}MB</p>
        </div>
      ) : (
        <div className="border border-border rounded-lg p-4 bg-background flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-primary" />
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">{file.name}</p>
              <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(0)} KB</p>
            </div>
          </div>
          <button
            onClick={() => onFileSelect(null as any)}
            className="text-muted-foreground hover:text-red-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleInputChange}
        className="hidden"
        accept={acceptedFormats.map((fmt) => `.${fmt}`).join(',')}
      />

      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
    </div>
  )
}

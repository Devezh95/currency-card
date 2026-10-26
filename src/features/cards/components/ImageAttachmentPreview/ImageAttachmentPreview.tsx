import { useCallback } from 'react'

interface ImageAttachmentPreviewProps {
  file: File
  alt: string
  className?: string
}

export function ImageAttachmentPreview({ file, alt, className }: ImageAttachmentPreviewProps) {
  const attach = useCallback(
    (img: HTMLImageElement | null) => {
      if (!img) return
      const url = URL.createObjectURL(file)
      img.src = url
      return () => {
        URL.revokeObjectURL(url)
      }
    },
    [file],
  )

  return <img ref={attach} alt={alt} className={className} />
}

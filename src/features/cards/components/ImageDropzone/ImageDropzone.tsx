import { useRef, useState, type DragEvent } from 'react'
import { flushSync } from 'react-dom'
import { Plus, Trash2 } from 'lucide-react'
import { clsx } from 'clsx'
import { Emoji, FormField, fieldErrorId } from '@/shared/ui'
import { LIMITS } from '../../model/constants'
import { acceptImages } from '../../model/images'
import type { CardImage } from '../../model/types'
import { ImageAttachmentPreview } from '../ImageAttachmentPreview'
import styles from './ImageDropzone.module.scss'

interface ImageDropzoneProps {
  id: string
  images: readonly CardImage[]
  onChange: (images: CardImage[]) => void
  onBlur?: () => void

  buttonRef?: (element: HTMLButtonElement | null) => void
  error?: string
}

const hasFiles = (event: DragEvent) => event.dataTransfer.types.includes('Files')

export function ImageDropzone({
  id,
  images,
  onChange,
  onBlur,
  buttonRef,
  error,
}: ImageDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const pickerRef = useRef<HTMLButtonElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [addError, setAddError] = useState<string | null>(null)
  const shownError = addError ?? error
  const canAdd = images.length < LIMITS.images

  const addFiles = (files: readonly File[]) => {
    const { added, error: problem } = acceptImages(files, images)
    setAddError(problem)
    if (added.length > 0) onChange([...images, ...added])
  }

  const removeImage = (imageId: string) => {
    setAddError(null)
    flushSync(() => {
      onChange(images.filter((image) => image.id !== imageId))
    })
    pickerRef.current?.focus()
  }

  const openDialog = () => inputRef.current?.click()

  const dragHandlers = {
    onDragEnter: (event: DragEvent) => {
      if (!hasFiles(event)) return
      event.preventDefault()
      setIsDragging(true)
    },
    onDragOver: (event: DragEvent) => {
      if (!hasFiles(event)) return
      event.preventDefault()
      event.dataTransfer.dropEffect = 'copy'
    },
    onDragLeave: (event: DragEvent) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsDragging(false)
    },
    onDrop: (event: DragEvent) => {
      event.preventDefault()
      setIsDragging(false)
      addFiles([...event.dataTransfer.files])
    },
  }

  const pickerButton = {
    ref: (element: HTMLButtonElement | null) => {
      pickerRef.current = element
      buttonRef?.(element)
    },
    id,
    type: 'button' as const,
    'aria-describedby': shownError ? fieldErrorId(id) : undefined,
    onClick: openDialog,
    onBlur,
  }

  return (
    <FormField
      id={id}
      label={images.length > 0 ? `Images (${String(images.length)})` : 'Images'}
      error={shownError}
    >
      <div className={clsx(styles.root, isDragging && styles.dragging)} {...dragHandlers}>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(event) => {
            addFiles([...(event.target.files ?? [])])
            event.target.value = ''
          }}
        />

        {images.length === 0 ? (
          <button {...pickerButton} className={clsx(styles.dropzone, shownError && styles.invalid)}>
            <Emoji name="cloud" size={28} className={styles.cloud} />
            <span className={styles.hint}>Drag &amp; drop images here</span>
            <span className={styles.browse}>or click to browse</span>
          </button>
        ) : (
          <ul className={styles.grid}>
            {images.map(({ id: imageId, file }) => (
              <li key={imageId} className={styles.preview}>
                <div className={styles.thumb}>
                  <ImageAttachmentPreview file={file} alt={file.name} className={styles.image} />
                  <button
                    type="button"
                    className={styles.remove}
                    aria-label={`Remove ${file.name}`}
                    onClick={() => {
                      removeImage(imageId)
                    }}
                  >
                    <Trash2 size={12} aria-hidden />
                  </button>
                </div>
                <span className={styles.name} title={file.name}>
                  {file.name}
                </span>
              </li>
            ))}
            {canAdd && (
              <li>
                <button
                  {...pickerButton}
                  className={clsx(styles.addTile, shownError && styles.invalid)}
                  aria-label="Add images"
                >
                  <Plus size={16} aria-hidden />
                  Add
                </button>
              </li>
            )}
          </ul>
        )}
      </div>
    </FormField>
  )
}

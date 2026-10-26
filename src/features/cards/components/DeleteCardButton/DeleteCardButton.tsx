import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Button, ConfirmDialog } from '@/shared/ui'
import type { Card } from '../../model/types'
import { useCards } from '../../useCards'

interface DeleteCardButtonProps {
  card: Pick<Card, 'id' | 'title'>

  onDeleted: (remaining: number) => void

  'aria-describedby'?: string
  className?: string
}

export function DeleteCardButton({
  card,
  onDeleted,
  'aria-describedby': describedBy,
  className,
}: DeleteCardButtonProps) {
  const { cards, deleteCard } = useCards()
  const [confirming, setConfirming] = useState(false)

  return (
    <>
      <Button
        variant="dangerOutline"
        className={className}
        aria-describedby={describedBy}
        aria-haspopup="dialog"
        onClick={() => {
          setConfirming(true)
        }}
      >
        <Trash2 size={16} aria-hidden />
        Delete
      </Button>
      {confirming && (
        <ConfirmDialog
          title="Delete this card?"
          description={`“${card.title}” will be permanently deleted.`}
          confirmLabel="Delete"
          onCancel={() => {
            setConfirming(false)
          }}
          onConfirm={() => {
            setConfirming(false)
            deleteCard(card.id)
            onDeleted(cards.filter((item) => item.id !== card.id).length)
          }}
        />
      )}
    </>
  )
}

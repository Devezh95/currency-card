import { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router'
import { Check, Plus } from 'lucide-react'
import { getCardSaved, TaskCard, useCards, type CardSavedKind } from '@/features/cards'
import { PageHeader } from '@/shared/layout/PageHeader'
import { Badge, ButtonLink, type BadgeTone } from '@/shared/ui'
import styles from './CardsPage.module.scss'

const SAVED_BADGE: Record<CardSavedKind, { label: string; tone: BadgeTone }> = {
  created: { label: 'Card Created', tone: 'success' },
  saved: { label: 'Card Saved', tone: 'success' },
  deleted: { label: 'Card Deleted', tone: 'danger' },
}

export function CardsPage() {
  const { cards, getImages } = useCards()
  const location = useLocation()
  const navigate = useNavigate()
const [saved] = useState(() => getCardSaved(location.state))


  useEffect(() => {
    if (location.state != null) void navigate('.', { replace: true, state: null })
  }, [location.state, navigate])


  if (cards.length === 0) return <Navigate to="/cards/new" replace />

  const badge = saved && SAVED_BADGE[saved]

  return (
    <>
      <PageHeader
        title="Card Preview"
        aside={
          badge && (
            <Badge tone={badge.tone} size="md" icon={<Check size={14} strokeWidth={3} />}>
              <span role="status">{badge.label}</span>
            </Badge>
          )
        }
      />
      <div>
        <ButtonLink to="/cards/new" >
          <Plus size={16} aria-hidden />
          New Card
        </ButtonLink>
      </div>
      <ul className={styles.list}>
        {cards.map((card) => (
          <li key={card.id}>
            <TaskCard
              card={card}
              images={getImages(card.id)}
            />
          </li>
        ))}
      </ul>
    </>
  )
}

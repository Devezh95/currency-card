
import { useId } from 'react'
import { formatLongDate } from '@/shared/lib/format'
import { ButtonLink } from '@/shared/ui'
import { ASSIGNEE_NAMES } from '../../model/constants'
import type { Card, CardImage } from '../../model/types'
import { PriorityBadge, StatusBadge } from '../CardBadges'
import { ImageAttachmentPreview } from '../ImageAttachmentPreview'
import { TagChip } from '../TagChip'
import styles from './TaskCard.module.scss'

interface TaskCardProps {
  card: Card
  images: readonly CardImage[]
}

export function TaskCard({ card, images }: TaskCardProps) {
  const titleId = useId()
  const { id, title, description, priority, status, assignee, deadline, tags } = card
  const hasMeta = Boolean(assignee ?? deadline)

  return (
    <article className={styles.card} aria-labelledby={titleId}>
      <div className={styles.badges}>
        {status && <StatusBadge status={status} />}
        <PriorityBadge priority={priority} />
      </div>

      <h2 id={titleId} className={styles.title}>
        {title}
      </h2>

      <p className={styles.description}>{description}</p>

      {hasMeta && (
        <dl className={styles.meta}>
          {assignee && (
            <div className={styles.metaItem}>
              <dt className={styles.metaLabel}>Assignee</dt>
              <dd className={styles.metaValue}>
                {ASSIGNEE_NAMES[assignee]}
              </dd>
            </div>
          )}

          {deadline && (
            <div className={styles.metaItem}>
              <dt className={styles.metaLabel}>Deadline</dt>
              <dd className={styles.metaValue}>
                <time dateTime={deadline}>
                  {formatLongDate(deadline)}
                </time>
              </dd>
            </div>
          )}
        </dl>
      )}

      {tags.length > 0 && (
        <ul className={styles.tags} aria-label="Tags">
          {tags.map((tag, index) => (
            <li key={index}>
              <TagChip tag={tag} index={index} />
            </li>
          ))}
        </ul>
      )}

      {images.length > 0 && (
        <ul className={styles.images} aria-label="Images">
          {images.map(({ id: imageId, file }) => (
            <li key={imageId}>
              <ImageAttachmentPreview
                file={file}
                alt={file.name}
                className={styles.image}
              />
            </li>
          ))}
        </ul>
      )}

      <div className={styles.actions}>
         <ButtonLink
          to="/cards/new"
          aria-describedby={titleId}
          className={styles.backButton}
        >
          ← Back to Form
        </ButtonLink>
        <ButtonLink
          to={`/cards/${id}/edit`}
          aria-describedby={titleId}
        >
          Edit Card
        </ButtonLink>

      </div>
    </article>
  )
}

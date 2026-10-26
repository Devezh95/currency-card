import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router'
import { clsx } from 'clsx'
import { Emoji } from '@/shared/ui'
import { NAV_ITEMS } from '../navigation'
import styles from './Sidebar.module.scss'

interface SidebarProps {
  expanded: boolean
  onExpand: () => void
  onCollapse: () => void

  onNavigate: () => void
  onLogout: () => void
  className?: string
}

export function Sidebar({
  expanded,
  onExpand,
  onCollapse,
  onNavigate,
  onLogout,
  className,
}: SidebarProps) {
  const collapsedRef = useRef<HTMLDivElement>(null)
  const expandedRef = useRef<HTMLDivElement>(null)
  const expandButtonRef = useRef<HTMLButtonElement>(null)
  const collapseButtonRef = useRef<HTMLButtonElement>(null)
  const previousExpanded = useRef(expanded)
  useEffect(() => {
    if (previousExpanded.current === expanded) return
    previousExpanded.current = expanded
    const inactivePanel = expanded ? collapsedRef.current : expandedRef.current
    const active = document.activeElement
    if (active === document.body || inactivePanel?.contains(active)) {
      const toggle = expanded ? collapseButtonRef.current : expandButtonRef.current
      toggle?.focus({ preventScroll: true })
    }
  }, [expanded])

  return (
    <aside className={clsx(styles.sidebar, expanded && styles.sidebarExpanded, className)}>
      <div
        ref={collapsedRef}
        className={clsx(styles.panel, styles.collapsed, !expanded && styles.panelActive)}
        inert={expanded}
        aria-hidden={expanded || undefined}
      >
        <button
          type="button"
          ref={expandButtonRef}
          className={styles.logo}
          aria-label="Expand menu"
          aria-expanded={false}
          onClick={onExpand}
        >
          <Emoji name="money-bag" size={24} className={styles.logoIcon} />
          <PanelLeftOpen size={22} className={styles.expandIcon} aria-hidden />
        </button>

        <nav aria-label="Main" className={styles.compactNav}>
          <ul>
            {NAV_ITEMS.map(({ to, shortLabel, emoji }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    clsx(styles.compactItem, isActive && styles.compactItemActive)
                  }
                >
                  <Emoji name={emoji} size={22} />
                  {shortLabel}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className={clsx(styles.compactItem, styles.compactLogout)}
          onClick={onLogout}
        >
          <Emoji name="door" size={18} />
          Logout
        </button>
      </div>

      <div
        ref={expandedRef}
        className={clsx(styles.panel, styles.expanded, expanded && styles.panelActive)}
        inert={!expanded}
        aria-hidden={!expanded || undefined}
      >
        <div className={styles.header}>
          <Emoji name="money-bag" size={28} />
          <span className={styles.brand}>Dashboard</span>
          <button
            type="button"
            ref={collapseButtonRef}
            className={styles.collapse}
            aria-label="Collapse menu"
            aria-expanded
            onClick={onCollapse}
          >
            <PanelLeftClose size={20} aria-hidden />
          </button>
        </div>

        <hr className={styles.divider} />
        <p className={styles.menuLabel} id="sidebar-menu-label">
          Menu
        </p>

        <nav aria-labelledby="sidebar-menu-label">
          <ul className={styles.list}>
            {NAV_ITEMS.map(({ to, label, emoji }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={onNavigate}
                  className={({ isActive }) => clsx(styles.item, isActive && styles.itemActive)}
                >
                  <Emoji name={emoji} size={20} />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <hr className={clsx(styles.divider, styles.bottomDivider)} />
        <button type="button" className={clsx(styles.item, styles.logout)} onClick={onLogout}>
          <Emoji name="door" size={20} />
          Logout
        </button>
      </div>
    </aside>
  )
}

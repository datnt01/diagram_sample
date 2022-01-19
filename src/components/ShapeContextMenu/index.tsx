import React, { useRef, useEffect, MouseEventHandler } from 'react'
import styles from './style.module.scss'

interface ContextMenuActionItem {
	text: string
	onClick(shapeId: string): void
}

export interface ContextMenuProp {
	shapeId: string
	offsetX: number
	offsetY: number
	actions: ContextMenuActionItem[]
	onClose(): void
}

const ShapeContextMenu = (props: ContextMenuProp) => {
	const handleClick = (actionItem: ContextMenuActionItem) => {
		actionItem.onClick(props.shapeId)
	}

	const contextMenuRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		function disabledBrowserContextMenu(e: MouseEvent) {
			e.preventDefault()
		}

		function handleClickOutside(event: any) {
			if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
				props.onClose()
			}
		}

		// Bind the event listener
		contextMenuRef.current!.addEventListener('contextmenu', disabledBrowserContextMenu)

		setTimeout(() => {
			document.addEventListener('mousedown', handleClickOutside)
		}, 500)

		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [contextMenuRef])

	return (
		<div
			data-testid="context-menu"
			ref={contextMenuRef}
			className={styles.container}
			style={{ position: 'fixed', top: props.offsetY + 'px', left: props.offsetX + 'px' }}
		>
			{props.actions.map((actionItem, index) => {
				return (
					<div className={styles.actionItem} key={index} onClick={() => handleClick(actionItem)}>
						{actionItem.text}
					</div>
				)
			})}
		</div>
	)
}

export default ShapeContextMenu

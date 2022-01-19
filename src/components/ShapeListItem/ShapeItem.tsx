import React from 'react'
import { useDispatch } from 'react-redux'
import { ShapeMetadata } from 'src/interfaces/Shape'
import styles from './style.module.scss'
import { setDragItem } from 'src/stores/editor/editorSlice'

function ShapeItem(props: ShapeMetadata) {
	const dispatch = useDispatch()
	
	const onDragStart = (e: any) => {
		dispatch(setDragItem({ name: props.name, defaultText: props.defaultText }))
	}

	const onDragEnd = (e: any) => {
		dispatch(setDragItem(undefined))
	}

	return (
		<span data-testid="shape-item" draggable title={props.defaultText} className={styles.shapeItem} onDragStart={onDragStart} onDragEnd={onDragEnd}>
			<props.icon />
		</span>
	)
}

export default ShapeItem

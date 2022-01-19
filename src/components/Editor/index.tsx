import React, { useEffect, useRef, useState } from 'react'
import CanvasContainer from 'src/components/CanvasContainer'
import ShapeListItem from 'src/components/ShapeListItem'
import styles from './style.module.scss'
import { ShapeFactoryProps } from 'src/interfaces/Shape'

interface Props extends ShapeFactoryProps {}

function Editor(props: Props) {
	return (
		<div className={styles.editor}>
			<div className={styles.listItem}>
				<ShapeListItem />
			</div>
			<div className={styles.canvas}>
				<CanvasContainer shapeFactory={props.shapeFactory} />
			</div>
		</div>
	)
}

export default Editor

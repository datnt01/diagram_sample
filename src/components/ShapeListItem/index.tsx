import React, { useEffect } from 'react'
import { ShapeMetadata } from '../../interfaces/Shape'
import { ReactComponent as ReactangleIcon } from 'src/assets/icons/rectangular-shape-outline.svg'
import { ReactComponent as FlowIcon } from 'src/assets/icons/right-outlined-arrow.svg'
import { ReactComponent as DocumentIcon } from 'src/assets/icons/document.svg'

import ShapeItem from './ShapeItem'
import { DefaultShapeType } from 'src/shapes'

import styles from './style.module.scss'

const shapesMetadata: ShapeMetadata[] = [
	{
		name: DefaultShapeType.Rectangle,
		defaultText: DefaultShapeType.Rectangle,
		icon: () => <ReactangleIcon />,
		description: ''
	},
	{
		name: DefaultShapeType.Flow,
		defaultText: DefaultShapeType.Flow,
		icon: () => <FlowIcon />,
		description: ''
	},
	{
		name: DefaultShapeType.Document,
		defaultText: DefaultShapeType.Document,
		icon: () => <DocumentIcon />,
		description: ''
	},
	{
		name: DefaultShapeType.Circle,
		defaultText: DefaultShapeType.Circle,
		icon: () => <DocumentIcon />,
		description: ''
	}
]

const ShapeListItem = () => {
	return (
		<div style={{ width: '100%' }}>
			<h3>List Shapes</h3>

			{shapesMetadata.map((itemMeta, index) => {
				return (
					<div key={index} className={styles.icon}>
						<ShapeItem {...itemMeta} />
					</div>
				)
			})}
		</div>
	)
}

export default ShapeListItem

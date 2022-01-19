import React, { useRef, useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { DefaultShapeType } from 'src/shapes'
import { useAppSelector } from 'src/stores'
import { setDragItem } from 'src/stores/editor/editorSlice'
import { saveJsonContent } from 'src/utils/exportUtil'
import { CanvasContext } from '../../base/CanvasContext'
import { ShapeInfo, ShapePosition, ShapeFactoryProps, ShapeInstance } from '../../interfaces/Shape'
import ShapeContextMenu, { ContextMenuProp } from '../ShapeContextMenu'
import ShapeTextInput, { TextInputProps } from '../ShapeTextInput'

import styles from './style.module.scss'

const shapes: ShapeInfo[] = [
	{
		name: DefaultShapeType.Rectangle,
		text: 'Rectangle 1',
		positionX: 100,
		positionY: 100
	},
	{
		name: DefaultShapeType.Flow,
		text: 'Flow 1',
		positionX: 250,
		positionY: 300
	},
	{
		name: DefaultShapeType.Document,
		text: 'Document 1',
		positionX: 300,
		positionY: 400
	}
]

interface Props extends ShapeFactoryProps {}

const CanvasContainer = (props: Props) => {
	const dispatch = useDispatch()
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const [context, setContext] = useState<CanvasContext | undefined>(undefined)

	const dragItem = useAppSelector(state => state.editor.dragItem)
	const [isOpenContextMenu, setIsOpenContextMenu] = useState(false)

	const [isOpenTextInput, setIsOpenTextInput] = useState(false)

	useEffect(() => {
		const canvas = canvasRef.current!
		const context = new CanvasContext(canvas, props.shapeFactory, {
			onRightClickShape: onRightClickShape,
			defaultTheme: {
				borderColor: 'yellow',
				font: '20px roboto',
				shapeColor: '#1262db',
				textColor: 'white',
				borderWidth: 4
			}
		})
		shapes.forEach(shapeInfo => {
			context!.addShape(shapeInfo)
		})

		setContext(context)
	}, [])

	const closeContextMenu = () => {
		setIsOpenContextMenu(false)
	}

	const [contextMenuOptions, setContextMenuOptions] = useState<ContextMenuProp>({
		offsetX: 0,
		offsetY: 0,
		shapeId: '',
		actions: [],
		onClose: closeContextMenu
	})

	const closeTextInput = () => {
		setIsOpenTextInput(false)
	}

	const [textInputOption, setTextInputOptions] = useState<TextInputProps>({
		shapeId: '',
		onClose: closeTextInput,
		offsetX: 0,
		offsetY: 0,
		text: ''
	} as TextInputProps)

	const onRightClickShape = useCallback((event: MouseEvent, shape: ShapeInstance, context: CanvasContext) => {
		const options = {
			offsetX: event.x,
			offsetY: event.y,
			shapeId: shape.id,
			actions: [
				{
					text: 'Edit text',
					onClick: () => {
						setTextInputOptions({
							...textInputOption,
							shapeId: shape.id,
							offsetX: event.x,
							offsetY: event.y,
							text: shape.shape.props.text,
							onSave: (shapeId: string, newValue: string) => {
								context.updateShapeText(shapeId, newValue)
								closeTextInput()
							}
						})
						setIsOpenTextInput(true)
						closeContextMenu()
					}
				},
				{
					text: 'Remove',
					onClick: (shapeId: string) => {
						context.removeShape(shapeId)
						closeContextMenu()
					}
				}
			]
		}
		setContextMenuOptions({ ...contextMenuOptions, ...options })

		setIsOpenContextMenu(true)
	}, [])

	const handleDrop = (e: any) => {
		e.preventDefault()

		if (dragItem != undefined) {
			const position = getCusorPositionInCanvas(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
			context!.addShape({
				text: dragItem.defaultText,
				name: dragItem.name,
				positionX: position.positionX,
				positionY: position.positionY
			})

			// remove drag item from store
			dispatch(setDragItem(undefined))
		}
	}

	const handleDragOver = (e: any) => {
		e.preventDefault()
		e.dataTransfer.dropEffect = 'move'
	}

	const getCusorPositionInCanvas = (offsetX: number, offsetY: number): ShapePosition => {
		return {
			positionX: offsetX - canvasRef.current!.clientLeft,
			positionY: offsetY - canvasRef.current!.clientTop
		}
	}

	const handleExportData = () => {
		var data = context!.exportData()
		saveJsonContent('shapes.json', JSON.stringify(data))
	}

	return (
		<div className={styles.container}>
			<canvas
				className={styles.canvas}
				width={900}
				height={700}
				onDrop={handleDrop}
				onDragOver={handleDragOver}
				ref={canvasRef}
			/>
			<button data-testid="export-button" className={styles.exportButton} onClick={handleExportData}>
				Export
			</button>
			{isOpenContextMenu && <ShapeContextMenu {...contextMenuOptions} />}
			{isOpenTextInput && <ShapeTextInput {...textInputOption} />}
		</div>
	)
}

export default CanvasContainer

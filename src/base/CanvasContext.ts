import { Guid } from 'guid-typescript'
import { ShapeInfo, ShapeInstance, ShapePosition, ShapeThemeOptions } from '../interfaces/Shape'
import { ShapeFactory } from './ShapeFactory'

interface CanvasContextOptions {
	onRightClickShape?(event: MouseEvent, shape: ShapeInstance, context: CanvasContext): void
	defaultTheme: ShapeThemeOptions
}

export class CanvasContext {
	constructor(
		canvas: HTMLCanvasElement,
		factory: ShapeFactory,
		options: CanvasContextOptions
	) {
		this.canvas = canvas
		this.context = canvas.getContext('2d')!
		this.shapeFactory = factory

		
		this.options = options
		this.canvas.onmousedown = this.handleMouseDown
		this.canvas.onmouseup = this.handleMouseUp
		this.canvas.onmousemove = this.handleMouseMove
		this.canvas.onmouseout = this.handleMouseOut
		this.canvas.addEventListener('contextmenu', e => e.preventDefault())
	}

	private options: CanvasContextOptions

	private shapeFactory: ShapeFactory
	private context: CanvasRenderingContext2D
	private canvas: HTMLCanvasElement

	private shapes: ShapeInstance[] = []

	private selectedShapeId: string | null = null
	private isMouseLeftDown: boolean = false

	/**
	 * Save current position of cusor in canvas window
	 */
	private currentCursor: ShapePosition = { positionX: 0, positionY: 0 }

	/**
	 *
	 * @param shape data to specify new shape
	 * @returns ShapeInstance
	 */
	addShape(shape: ShapeInfo): ShapeInstance {
		const shapeItem = this.shapeFactory.CreateShape(shape.name, {
			text: shape.text,
			positionX: shape.positionX,
			positionY: shape.positionY,
			theme: shape.theme || this.options.defaultTheme
		})

		if (shapeItem != null) {
			let shapeInstance = { id: Guid.create().toString(), name: shape.name, shape: shapeItem }
			this.shapes.push(shapeInstance)

			this.draw()

			return JSON.parse(JSON.stringify(shapeInstance))
		} else {
			throw new Error('Shape is not valid!')
		}
	}

	/**
	 * Remove shape instance by `id`
	 * @param id ShapeInstance Id
	 */
	removeShape(id: string) {
		var itemIndex = this.shapes.findIndex(i => i.id == id)
		if (itemIndex >= 0) {
			this.shapes.splice(itemIndex, 1)
			this.draw()
		} else {
			console.log('Item is not exists')
		}
	}

	/**
	 * Change position of shape instance
	 * @param id shape instance id
	 * @param dx change positionX of shape instance relative with current positionX
	 * @param dy change positionY of shape instance relative with current positionY
	 */
	moveShape(id: string, dx: number, dy: number) {
		const instance = this.getShape(id)
		if (instance != undefined) {
			instance.shape.props.positionX += dx
			instance.shape.props.positionY += dy
		}

		this.draw()
	}

	/**
	 *
	 * @param position
	 * @returns Return hitted shape id at specific position
	 */
	getHitShape(position: ShapePosition): string | null {
		let targetShape: ShapeInstance | null = null

		// Search latest shape from end to start element in shapes array
		for (let i = this.shapes.length - 1; i >= 0; i--) {
			const instance = this.shapes[i]
			if (instance.shape.isHit(position, this.context)) {
				targetShape = instance
				break
			}
		}

		if (targetShape != null) {
			return targetShape.id
		}

		return null
	}

	/**
	 * Update Text of Shape by instance shapeId
	 * @param shapeId
	 * @param newValue NewValue of Shape will be updated
	 */
	updateShapeText(shapeId: string, newValue: string) {
		const instance = this.getShape(shapeId)
		if (instance) {
			instance.shape.props.text = newValue
			this.draw()
		}
	}

	/**
	 *
	 * @returns List of ShapeInfo data of canvasContext
	 */
	exportData(): ShapeInfo[] {
		return this.shapes.map(item => {
			const props = item.shape.props
			return {
				name: item.name,
				text: props.text,
				positionX: props.positionX,
				positionY: props.positionY
			} as ShapeInfo
		})
	}

	/**
	 * Redraw canvasContext
	 */
	private draw() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
		this.shapes.map(i => i.shape.draw(this.context))
	}

	/**
	 *
	 * @param id shape instance id
	 * @returns ShapeInstance or undefined if not found
	 */
	private getShape(id: string): ShapeInstance | undefined {
		return this.shapes.find(i => i.id === id)
	}

	private getCusorPositionInCanvas = (offsetX: number, offsetY: number): ShapePosition => {
		return {
			positionX: offsetX - this.canvas.clientLeft,
			positionY: offsetY - this.canvas.clientTop
		}
	}

	private handleMouseDown = (e: MouseEvent) => {
		// Detect left mouse click
		if (e.button === 0) {
			this.isMouseLeftDown = true
		}

		var cursorPosition = this.getCusorPositionInCanvas(e.offsetX, e.offsetY)
		this.selectedShapeId = this.getHitShape(cursorPosition)

		this.currentCursor = cursorPosition

		// Right mouse click
		if (e.button == 2 && this.selectedShapeId) {
			if (this.options.onRightClickShape) {
				const shape = JSON.parse(JSON.stringify(this.getShape(this.selectedShapeId)))
				this.options.onRightClickShape(e, shape, this)
			}
		}
	}

	private handleMouseMove = (e: MouseEvent) => {
		if (this.isMouseLeftDown && this.selectedShapeId) {
			const cursor = this.getCusorPositionInCanvas(e.offsetX, e.offsetY)
			const dx = cursor.positionX - this.currentCursor.positionX
			const dy = cursor.positionY - this.currentCursor.positionY
			this.currentCursor = cursor
			this.moveShape(this.selectedShapeId, dx, dy)
		}
	}

	private handleMouseUp = (e: MouseEvent) => {
		this.selectedShapeId = null
		this.isMouseLeftDown = false
	}

	private handleMouseOut = (e: MouseEvent) => {
		this.handleMouseUp(e)
	}
}

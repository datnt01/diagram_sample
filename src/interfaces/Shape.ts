import { ShapeFactory } from 'src/base/ShapeFactory';

export interface ShapeFactoryProps {
	shapeFactory: ShapeFactory
}

export interface IShape {
	props: ShapeProps

	/**
	 * Render shape in context
	 * @param context Canvas contenxt where shape will be rendered
	 */
	draw(context: CanvasRenderingContext2D): void

	/**
	 * Check is position inside shape or not
	 * @param position 
	 */
	isHit(position: ShapePosition, context: CanvasRenderingContext2D): boolean
}

export interface ShapeInstance {
	id: string,
	name: string,
	shape: IShape
}

export interface ShapePosition {
	/**
	 * Relative position x in canvas
	 */
	positionX: number
	/**
	 * Relative postion y in canvas
	 */
	positionY: number
}

export interface CreateShapeProps extends ShapePosition {
	text: string,
	theme: ShapeThemeOptions
}

export interface ShapeThemeOptions {
	font: string,
	textColor: string,
	shapeColor: string,
	borderWidth: number,
	borderColor: string
}

export interface ShapeProps extends ShapePosition {
	text: string,
	theme: ShapeThemeOptions
}

export interface ShapeInfo {
	/**
	 * Name of shape
	 */
	name: string
	
	text: string
	/**
	 * IX position to render shape in canvas
	 */
	positionX: number

	/**
	 * Y position to render shape in canvas
	 */
	positionY: number

	theme?: ShapeThemeOptions
}

export interface ShapeMetadata {
	name: string
	defaultText: string
	description: string
	icon: React.FunctionComponent<any>
}

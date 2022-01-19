import { ShapeProps, IShape, ShapePosition } from '../../interfaces/Shape'

export class DocumentShape implements IShape {
	props: ShapeProps

	private shapePath: Path2D

	constructor(props: ShapeProps) {
		this.props = props
		this.shapePath = new Path2D()
	}

	isHit(position: ShapePosition, context: CanvasRenderingContext2D): boolean {
		return context.isPointInPath(this.shapePath, position.positionX, position.positionY)
	}

	draw(context: CanvasRenderingContext2D): void {
		const x = this.props.positionX
		const y = this.props.positionY

		const width = 150
		const height = 100

		const path = new Path2D()

		path.moveTo(x, y)
		path.lineTo(x + width, y)
		path.lineTo(x + width, y + height)
		path.moveTo(x + width, y + height)
		path.bezierCurveTo(x + 0.5 * width, y + 0.5 * height, x + 0.5 * width, y + 1.5*height, x, y + height)
		path.lineTo(x, y)

		context.fillStyle = this.props.theme.shapeColor
		context.fill(path)

		// Draw stoke
		context.lineWidth = this.props.theme.borderWidth
        context.strokeStyle = this.props.theme.borderColor
        context.stroke(path)

		// Draw Text
		context.font = this.props.theme.font
		context.fillStyle = this.props.theme.textColor
		context.textAlign = 'center'
		context.fillText(this.props.text, this.props.positionX + width/2, this.props.positionY + height/2)

		this.shapePath = path
	}
}

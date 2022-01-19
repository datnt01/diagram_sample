import { ShapeProps, IShape, ShapePosition } from 'src/interfaces/Shape'

const WIDTH = 150
const HEIGHT = 100

export class RectangleShape implements IShape {
	props: ShapeProps

	constructor(props: ShapeProps) {
		this.props = props
	}

	isHit(position: ShapePosition, context: CanvasRenderingContext2D): boolean {
		if (
			position.positionX > this.props.positionX &&
			position.positionY > this.props.positionY &&
			position.positionX < this.props.positionX + WIDTH &&
			position.positionY < this.props.positionY + HEIGHT
		) {
			return true
		}
		return false
	}

	draw(context: CanvasRenderingContext2D): void {
		// Draw Rectangle
		context.fillStyle = this.props.theme.shapeColor
		context.fillRect(this.props.positionX, this.props.positionY, WIDTH, HEIGHT)

		context.lineWidth = this.props.theme.borderWidth
		context.strokeStyle = this.props.theme.borderColor
		context.lineWidth = this.props.theme.borderWidth
		context.strokeRect(this.props.positionX, this.props.positionY, WIDTH, HEIGHT)

		// Draw Text
		context.font = this.props.theme.font
		context.fillStyle = this.props.theme.textColor
		context.textAlign = 'center'
		context.fillText(this.props.text, this.props.positionX + WIDTH / 2, this.props.positionY + HEIGHT / 2 + 5)
	}
}

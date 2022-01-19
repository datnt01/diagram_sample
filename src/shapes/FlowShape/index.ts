import { ShapeProps, IShape, ShapePosition } from '../../interfaces/Shape'

export class FlowShape implements IShape {
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

        const headWidth = 50
        const headHeight = 100
        const bodyWidth = 100
        const bodyHeight = 50
        
        const path = new Path2D()

        // Draw path
        path.moveTo(x, y - bodyHeight/2)
        path.lineTo(x + bodyWidth, y - bodyHeight/2)
        path.lineTo(x + bodyWidth, y - headHeight/2)
        path.lineTo(x + bodyWidth + headWidth, y)
        path.lineTo(x + bodyWidth, y + headHeight/2)
        path.lineTo(x + bodyWidth, y + bodyHeight/2)
        path.lineTo(x, y + bodyHeight/2)
        path.lineTo(x, y - bodyHeight/2)

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
		context.fillText(this.props.text, this.props.positionX + (bodyWidth + headWidth/2)/2, this.props.positionY + 5)

        this.shapePath = path
	}
}

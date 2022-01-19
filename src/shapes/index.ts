import { IShape } from 'src/interfaces/Shape'
import { Constructor, Dictionary } from 'src/interfaces/types'
import { DocumentShape } from './DocumentShape'
import { CircleShape } from './CircleShape'
import { FlowShape } from './FlowShape'
import { RectangleShape } from './RectangleShape'

export enum DefaultShapeType {
	Rectangle = 'Rectangle',
	Document = 'Document',
	Flow = 'Flow',
	Circle = 'Circle'
}

export const DefaultShapes: Dictionary<Constructor<IShape>> = {
	[DefaultShapeType.Rectangle]: RectangleShape,
	[DefaultShapeType.Circle]: CircleShape,
	[DefaultShapeType.Flow]: FlowShape,
	[DefaultShapeType.Document]: DocumentShape
}

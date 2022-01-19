import { IShape, CreateShapeProps } from '../interfaces/Shape'
import { Constructor, Dictionary } from 'src/interfaces/types'

export class ShapeFactory {
	constructor(shapes?: Dictionary<Constructor<IShape>>) {
		if (shapes)
		{
			this.shapes = shapes
		}
	}

	private shapes: Dictionary<Constructor<IShape>> = {}

	Register<T extends Constructor<IShape>>(name: string, shapeClass: T) {
		if (this.shapes[name]) {
			throw new Error(`Shape name: '${name}' already registered!`)
		}

		this.shapes[name] = shapeClass
	}

	CreateShape(name: string, props: CreateShapeProps): IShape | null {
		if ( this.shapes[name]) {
			return new this.shapes[name](props)
		}
		return null
	}
}
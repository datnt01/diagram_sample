import { ShapeInfo } from 'src/interfaces/Shape'
import { DefaultShapes, DefaultShapeType } from '../shapes'
import { CanvasContext } from './CanvasContext'
import { ShapeFactory } from './ShapeFactory'

describe('CanvasContext', () => {
	let canvas: any
	let context: CanvasContext

	let shape1: ShapeInfo
	let shape2: ShapeInfo

	const defaultTheme = {
		borderColor: '',
		borderWidth: 2,
		font: '',
		shapeColor: '',
		textColor: ''
	}
	beforeEach(function () {
		canvas = document.createElement('canvas')
		context = new CanvasContext(canvas, new ShapeFactory(DefaultShapes), {
			defaultTheme: defaultTheme
		})

		shape1 = {
			name: DefaultShapeType.Rectangle,
			text: 'Rectangle 1',
			positionX: 100,
			positionY: 100
		}

		shape2 = {
			name: DefaultShapeType.Rectangle,
			text: 'Rectangle 1',
			positionX: 200,
			positionY: 100
		}
	})

	it('Should have one shape', function () {
		context.addShape(shape1)
		const jsonData = context.exportData()

		expect(jsonData.length).toBe(1)
	})

	it('Should have two shapes', function () {
		context.addShape(shape1)
		context.addShape(shape2)

		const jsonData = context.exportData()
		expect(jsonData.length).toBe(2)
	})

	it('Should return error "Shape is not valid!" with wrong shape type "abc"', function () {
		try {
			context.addShape({
				name: 'abc', text: 'shape 1', positionX: 100, positionY: 100, theme: defaultTheme
			})
		} catch (e: any) {
			expect(e.message).toBe('Shape is not valid!')
		}
	})

	it('Should remove one shape correctly', function () {
		const instance1 = context.addShape(shape1)
		const instance2 = context.addShape(shape2)

		context.removeShape(instance2.id)

		const jsonData = context.exportData()
		expect(jsonData.length).toBe(1)
	})
})

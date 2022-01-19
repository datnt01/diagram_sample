import { CircleShape } from './index'

interface ContextEvent {
	type: string
	props: any
}

const WIDTH = 150
const HEIGHT = 100

describe('Draw RectangleShape { x:0, y:0, width: 150, height: 100 }', () => {
	let canvas: any
	let ctx: any
	let events: ContextEvent[]
	var rectangle: CircleShape

	var recProps = { x: 0, y: 0, width: WIDTH, height: HEIGHT }

	beforeEach(function () {
		canvas = document.createElement('canvas')
		ctx = canvas.getContext('2d')

		rectangle = new CircleShape({
			text: 'Rectangle',
			positionX: 0,
			positionY: 0,
			theme: {
				borderColor: '',
				borderWidth: 2,
				font: '',
				shapeColor: '',
				textColor: ''
			}
		})
		rectangle.draw(ctx)
		events = ctx.__getEvents()
	})

	it('Should draw Rectangle with width 150', function () {
		const fillRectProp = events.find(i => i.type == 'fillRect')?.props
		expect(fillRectProp).toMatchObject(recProps)
	})

	it('Should draw one Rectangle at top-left position x:0, y:0', function () {
		const fillRectEvents = events.filter(i => i.type == 'fillRect')
		expect(fillRectEvents.length).toBe(1)
		expect(fillRectEvents[0].props.x).toBe(0)
		expect(fillRectEvents[0].props.y).toBe(0)
	})

	it('Should draw Rectangle with text `Rectangle`', function () {
		const fillTextProp = events.find(i => i.type == 'fillText')?.props
		expect(fillTextProp.text).toBe('Rectangle')
	})

	it('Should hit Rectangle at position x: 1, y: 1', function () {
		expect(rectangle.isHit({ positionX: 1, positionY: 1 }, ctx)).toBe(true)
	})

	it("Shouldn't hit Rectangle at position x: 0, y: 0", function () {
		expect(rectangle.isHit({ positionX: 0, positionY: 0 }, ctx)).toBe(false)
	})
})

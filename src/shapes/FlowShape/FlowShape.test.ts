import { FlowShape } from './index'

interface ContextEvent {
	type: string
	props: any
}

const WIDTH = 150
const HEIGHT = 100

describe('Draw DocumentShape { x:0, y:0 }', () => {
	let canvas: any
	let ctx: any
	let events: ContextEvent[]
	var flowShape: FlowShape

	var flowProps = {
		text: 'Flow 1', positionX: 0, positionY: 0, 
		theme: {
			borderColor: '',
			borderWidth: 4,
			font: '',
			shapeColor: '',
			textColor: ''
		}
	}

	beforeEach(function () {
		canvas = document.createElement('canvas')
		ctx = canvas.getContext('2d')

		flowShape = new FlowShape(flowProps)
		flowShape.draw(ctx)
		events = ctx.__getEvents()
	})

	it(`Should draw FlowShape with text "${flowProps.text}`, function () {
		const fillTextProp = events.find(i => i.type == 'fillText')?.props
		expect(fillTextProp.text).toBe(flowProps.text)
	})

	it(`Should draw FlowShape with borderWidth "${flowProps.theme.borderWidth}"`, function () {
		const lineProps = events.find(i => i.type == 'lineWidth')?.props
		expect(lineProps.value).toBe(flowProps.theme.borderWidth)
	})
})

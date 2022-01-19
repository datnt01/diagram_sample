import { DocumentShape } from './index'

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
	var documentShape: DocumentShape

	var documentProps = {
		text: 'Document 1', positionX: 0, positionY: 0, theme: {
			borderColor: '',
			borderWidth: 2,
			font: '',
			shapeColor: '',
			textColor: ''
		}
	}

	beforeEach(function () {
		canvas = document.createElement('canvas')
		ctx = canvas.getContext('2d')

		documentShape = new DocumentShape(documentProps)
		documentShape.draw(ctx)
		events = ctx.__getEvents()
	})

	it(`Should draw Document with text "${documentProps}`, function () {
		const fillTextProp = events.find(i => i.type == 'fillText')?.props
		expect(fillTextProp.text).toBe(documentProps.text)
	})
})

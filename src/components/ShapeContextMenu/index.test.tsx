import React from 'react'
import ShapeContextMenu, { ContextMenuProp } from './index'

import { fireEvent, render, RenderResult } from '@testing-library/react'
import { Guid } from 'guid-typescript'

describe('ShapeContextMenu', () => {
	let element: RenderResult
	const shapeId = Guid.create().toString()
	const props: ContextMenuProp = {
		shapeId: shapeId,
		offsetX: 10,
		offsetY: 100,
		actions: [
			{
				text: 'Action 1',
				onClick: () => {}
			}
		],
		onClose: () => {}
	}
	beforeEach(() => {
		element = render(<ShapeContextMenu {...props} />)
	})

	test(`Should render ContextMenu with correct style: top ${props.offsetY}px, left: ${props.offsetX}px`, function () {
		var styles = window.getComputedStyle(element.getByTestId('context-menu'))
		expect(styles.position).toBe('fixed')

		expect(styles.top).toBe(`${props.offsetY}px`)
		expect(styles.left).toBe(`${props.offsetX}px`)
	})

	test(`Should render Action with with text ${props.actions[0].text}`, function () {
		expect(element.getAllByText('Action 1').length).toBe(1)
	})
})

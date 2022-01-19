import React from 'react'
import ShapeTextInput, { TextInputProps } from './index'

import { fireEvent, render, RenderResult } from '@testing-library/react'
import { Guid } from 'guid-typescript'

describe('ShapeTextInput', () => {
	let element: RenderResult
	const handleSave = jest.fn()
	const shapeId = Guid.create().toString()

	beforeEach(() => {
		const props: TextInputProps = {
			text: 'shape 1',
			offsetX: 0,
			offsetY: 0,
			shapeId: shapeId,
			onSave: handleSave,
			onClose: () => {}
		}
	
		element = render(<ShapeTextInput {...props} />)
	})

	test('Should render input with value "shape 1"', function () {
		expect(element.getByTestId('input')).toHaveValue('shape 1')
	})

	test('Calls onSave prop when click on Save button', function () {
		const buttonSave = element.getByText('Save')
		fireEvent(buttonSave, new MouseEvent('click', {
			bubbles: true,
			cancelable: true
		}))

		expect(handleSave).toHaveBeenCalledTimes(1)
		expect(handleSave).toHaveBeenCalledWith(shapeId, 'shape 1')
	})

	test('Calls onSave prop with param shapeId and newValue', function () {
		const buttonSave = element.getByText('Save')
		const input = element.getByTestId('input')
		
		fireEvent.change(input, { target: { value: 'new shape text' } })

		fireEvent(buttonSave, new MouseEvent('click', {
			bubbles: true,
			cancelable: true
		}))

		expect(handleSave).toHaveBeenCalledWith(shapeId, 'new shape text')
	})
})

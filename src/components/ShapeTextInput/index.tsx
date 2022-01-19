import React, { useRef, useEffect, useState } from 'react'
import styles from './style.module.scss'

export interface TextInputProps {
	shapeId: string
	text: string
	offsetX: number
	offsetY: number
	onSave(shapeId: string, newValue: string): void
	onClose(): void
}

const ShapeTextInput = (props: TextInputProps) => {
	const [value, setValue] = useState(props.text)
	const inputRef = useRef<HTMLInputElement>(null)

	function onChangeValue(e: any) {
		setValue(e.target.value)
	}

	function handleSave() {
		props.onSave(props.shapeId, value)
	}

	function handleClose() {
		props.onClose()
	}

	useEffect(() => {
		inputRef.current!.focus()
	}, [])

	return (
		<div
			className={styles.container}
			style={{ position: 'fixed', top: props.offsetY + 'px', left: props.offsetX + 'px' }}
		>
			<input data-testid="input" ref={inputRef} value={value} onChange={onChangeValue} />
			<button onClick={handleSave}>Save</button>
			<button onClick={handleClose}>Cancel</button>
		</div>
	)
}

export default ShapeTextInput

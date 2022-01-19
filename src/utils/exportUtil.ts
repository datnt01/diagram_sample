

export function saveJsonContent(filename: string, content: string) {
	var element = document.createElement('a')
	var file = new Blob([content], { type: 'text/plain' })
	element.href = URL.createObjectURL(file)
	element.setAttribute('download', filename)

	element.style.display = 'none'
	document.body.appendChild(element)
	element.click()
	document.body.removeChild(element)
}
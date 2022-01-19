import React from 'react'
import ReactDOM from 'react-dom'
import Editor from 'src/components/Editor'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { store } from 'src/stores'
import { ShapeFactory } from 'src/base/ShapeFactory'
import { DefaultShapes } from 'src/shapes'
import './index.scss'

const shapeFactory = new ShapeFactory(DefaultShapes)

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Editor shapeFactory={shapeFactory} />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(null)

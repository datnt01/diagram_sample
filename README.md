## Required Softwares
- nodejs: https://nodejs.org/en/download/

## Available Scripts

In the project directory, you can run:

### `yarn`

install packages

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Code Base Structure

### Folder structure
`base` folder contains
- `CanvasContext`: Manage list of shapes on canvas, handle event move, add, remove shape, export JSON
- `ShapeFactory`: Manage list of pre-defined shapes, handle create new Shape with `shape name`, Allow to register new shape type dynamically. Each CanvasContainer will have a ShapeFactory instance to handle create shape instances.

`shapes` folder contains list of pre-defined shape type: RectangeShape, DocumentShape, FlowShape

`components` folder contains react base components
- `Editor`: Includes ShapeListItem, CanvasContainer
- `CanvasContainer`: Canvas element that handle events: Show MenuContext, Drag and Drop shapes into canvas
- `ShapeListItem`: List of registered Shapes
- `ShapeContextMenu`: Action menu item for each Shape
- `ShapeTextInput`: Input component that handles updating shape text

### Define new shape
Define new shape by implement `IShape` interface

```javascript
export class RectangleShape implements IShape {

}
```

### Register new Shape dynamically and create shape
```javascript
const shapeFactory = new ShapeFactory()
shapeFactory.Register('Rectangle', RectangleShape)

const recInstance = shapeFactory.CreateShape('Rectangle', shapeProps)
```



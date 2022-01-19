import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ShapeInfo, ShapeMetadata } from 'src/interfaces/Shape'


export interface DragItemData {
  name: string
  defaultText: string
}

export interface EditorState {
  dragItem?: DragItemData
}

const initialState: EditorState = {
    dragItem: undefined,
}

export const editorSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setDragItem: (state, action: PayloadAction<DragItemData | undefined>) => {
      state.dragItem = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setDragItem } = editorSlice.actions

export default editorSlice.reducer
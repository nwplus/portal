/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useRef, useState } from 'react'
import { ReactSketchCanvas } from 'react-sketch-canvas'
import { SketchPicker } from 'react-color'
import trashcanIcon from '../../assets/icons/trashcan.svg'
import colorpickerIcon from '../../assets/icons/colorpicker.svg'
import undoIcon from '../../assets/icons/undo.svg'
import redoIcon from '../../assets/icons/redo.svg'
import { mergeRefs, useDebounce } from '../../utility/utilities'
import styled from 'styled-components'

const CanvasContainer = styled.div`
  background: #f3f3f3;
  display: flex;
  flex-direction: column;
  position: relative;
`

const ErrorMessage = styled.p`
  position: absolute;
  top: 0px;
  left: 0px;
  padding: 5px;
  padding-left: 8px;
  padding-right: 8px;
  margin: 0px;
  background: #ffaaaa;
  color: red;
  z-index: 10;
  box-sizing: border-box;
`

const Stroke4Button = styled.div`
  background: #333333;
  border-radius: 999px;
  cursor: pointer;
  width: 8px;
  height: 8px;
`

const Stroke6Button = styled.div`
  background: #333333;
  border-radius: 999px;
  cursor: pointer;
  width: 12px;
  height: 12px;
`

const Stroke8Button = styled.div`
  background: #333333;
  border-radius: 999px;
  cursor: pointer;
  width: 16px;
  height: 16px;
`

const CanvasIcon = styled.img`
  width: 20px;
  height: 25px;
  cursor: pointer;
`

const HistoryIcons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
`

const ColorPickerWrapper = styled.div`
  position: absolute;
  z-index: 100;
  top: 0;
  right: 0;
`

const LeftIcons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`

const ToolBar = styled.div`
  display: flex;
  flex-direction: row;
  padding: 3px;
  padding-left: 7px;
  padding-right: 7px;
  justify-content: space-between;
  user-select: none;
`
/**
 * @param width number, width of the entire component
 * @param height number, height of the entire component
 * @param invalid boolean, indicates dissatisfaction with current value
 * @param errorMsg string, indicates some error
 * @param onChange (result: string) => void, triggers with result (SVG or Base64) on change. Has debouncing.
 * @param customRef a ref directly to the canvas component
 * @param exportAsBase64 boolean, onChange() will return a base64 string instead of svg if true
 */
export default ({ width, height, invalid, errorMsg, onChange, customRef, exportAsBase64 }) => {
  const [strokeWidth, setStrokeWidth] = useState(4)
  const [strokeColor, setStrokeColor] = useState('black')
  const [showPicker, setShowPicker] = useState(false)
  const canvasRef = useRef()

  const loadedRef = useRef(false)

  useEffect(() => {
    loadedRef.current = true
    return () => {
      loadedRef.current = false
    }
  }, [])

  const debounceUpdate = useDebounce(async () => {
    if (!loadedRef.current) return

    if (exportAsBase64) {
      const newBase64 = await canvasRef.current.exportImage('jpeg')
      onChange(newBase64)
    } else {
      const newSVG = await canvasRef.current.exportSvg()
      onChange(newSVG)
    }
  }, 500)

  const handleChange = e => {
    if (!onChange) return

    debounceUpdate()
  }

  const handleClear = () => {
    if (canvasRef.current) canvasRef.current.clearCanvas()
  }

  const handleUndo = () => {
    if (canvasRef.current) canvasRef.current.undo()
  }

  const handleRedo = () => {
    if (canvasRef.current) canvasRef.current.redo()
  }

  return (
    <CanvasContainer
      style={{
        width: width,
        height: height,
        border: invalid ? '3px solid red' : '',
      }}
      onClick={() => {
        setShowPicker(false)
      }}
    >
      {errorMsg && <ErrorMessage style={{ width: width }}>{errorMsg}</ErrorMessage>}

      <ReactSketchCanvas
        width={'100%'}
        height={'100%'}
        ref={mergeRefs(canvasRef, customRef)}
        strokeWidth={strokeWidth}
        strokeColor={strokeColor}
        onChange={handleChange}
        style={{ border: 'none' }}
      />

      <ToolBar>
        <LeftIcons>
          <CanvasIcon
            src={colorpickerIcon}
            style={{
              marginRight: 10,
              filter: showPicker
                ? 'invert(31%) sepia(79%) saturate(7412%) hue-rotate(241deg) brightness(84%) contrast(127%)'
                : 'invert(72%) sepia(0%) saturate(237%) hue-rotate(137deg) brightness(86%) contrast(87%)',
            }}
            alt="Color Picker Icon"
            onClick={e => {
              e.stopPropagation()
              setShowPicker(!showPicker)
            }}
          />
          <Stroke4Button
            onClick={() => {
              setStrokeWidth(4)
            }}
          />
          <Stroke6Button
            onClick={() => {
              setStrokeWidth(6)
            }}
          />
          <Stroke8Button
            onClick={() => {
              setStrokeWidth(8)
            }}
          />
        </LeftIcons>

        <HistoryIcons>
          <CanvasIcon src={undoIcon} alt="Undo Icon" onClick={handleUndo} />
          <CanvasIcon src={redoIcon} alt="Redo Icon" onClick={handleRedo} />
        </HistoryIcons>

        <CanvasIcon
          src={trashcanIcon}
          style={{
            filter:
              'invert(61%) sepia(100%) saturate(6853%) hue-rotate(344deg) brightness(124%) contrast(108%)',
          }}
          alt="Trashcan Icon"
          onClick={handleClear}
        />

        {showPicker && (
          <ColorPickerWrapper
            onClick={e => {
              e.stopPropagation()
            }}
          >
            <SketchPicker
              color={strokeColor}
              onChange={e => {
                setStrokeColor(e.hex)
              }}
            />
          </ColorPickerWrapper>
        )}
      </ToolBar>
    </CanvasContainer>
  )
}

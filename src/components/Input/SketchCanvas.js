/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useRef, useState } from 'react'
import { ReactSketchCanvas } from 'react-sketch-canvas'
import { SketchPicker } from 'react-color'
import trashcanIcon from '../../assets/icons/trashcan.svg'
import colorpickerIcon from '../../assets/icons/colorpicker.svg'
import undoIcon from '../../assets/icons/undo.svg'
import redoIcon from '../../assets/icons/redo.svg'
import { mergeRefs } from '../../utility/utilities'

export default ({ width, height, invalid, errorMsg, onChange, customRef }) => {
  const [strokeWidth, setStrokeWidth] = useState(4)
  const [strokeColor, setStrokeColor] = useState('black')
  const [showPicker, setShowPicker] = useState(false)
  const canvasRef = useRef()

  const [debounceTimerId, setDebounceTimerId] = useState(null)
  const loadedRef = useRef(false)

  useEffect(() => {
    loadedRef.current = true
    return () => {
      loadedRef.current = false
    }
  }, [])

  const handleChange = e => {
    if (!onChange) return

    if (debounceTimerId) clearTimeout(debounceTimerId)
    const newTimerId = setTimeout(async () => {
      if (!loadedRef.current) return
      const newSVG = await canvasRef.current.exportSvg()
      onChange(newSVG)
    }, 500)

    setDebounceTimerId(newTimerId)
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
    <div
      style={{
        background: '#f3f3f3',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        width: width,
        height: height,
        border: invalid ? '3px solid red' : '',
      }}
      onClick={() => {
        setShowPicker(false)
      }}
    >
      {errorMsg && (
        <p
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: width,
            padding: 5,
            paddingLeft: 8,
            paddingRight: 8,
            background: '#ffaaaa',
            color: 'red',
            zIndex: 10,
            margin: 0,
            boxSizing: 'border-box',
          }}
        >
          {errorMsg}
        </p>
      )}

      <ReactSketchCanvas
        width={'100%'}
        height={'100%'}
        ref={mergeRefs(canvasRef, customRef)}
        strokeWidth={strokeWidth}
        strokeColor={strokeColor}
        onChange={handleChange}
        style={{ border: 'none' }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: 3,
          paddingLeft: 7,
          paddingRight: 7,
          justifyContent: 'space-between',
          userSelect: 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <img
            src={colorpickerIcon}
            style={{
              marginRight: 10,
              width: 20,
              height: 25,
              cursor: 'pointer',
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
          <div
            style={{
              background: '#333333',
              borderRadius: 999,
              cursor: 'pointer',
              width: 8,
              height: 8,
            }}
            onClick={() => {
              setStrokeWidth(4)
            }}
          />
          <div
            style={{
              background: '#333333',
              borderRadius: 999,
              cursor: 'pointer',
              width: 12,
              height: 12,
            }}
            onClick={() => {
              setStrokeWidth(6)
            }}
          />
          <div
            style={{
              background: '#333333',
              borderRadius: 999,
              cursor: 'pointer',
              width: 16,
              height: 16,
            }}
            onClick={() => {
              setStrokeWidth(8)
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
          }}
        >
          <img
            src={undoIcon}
            style={{
              width: 20,
              height: 25,
              cursor: 'pointer',
            }}
            alt="Undo Icon"
            onClick={handleUndo}
          />
          <img
            src={redoIcon}
            style={{
              width: 20,
              height: 25,
              cursor: 'pointer',
            }}
            alt="Redo Icon"
            onClick={handleRedo}
          />
        </div>

        <img
          src={trashcanIcon}
          style={{
            width: 20,
            height: 25,
            cursor: 'pointer',
            filter:
              'invert(61%) sepia(100%) saturate(6853%) hue-rotate(344deg) brightness(124%) contrast(108%)',
          }}
          alt="Trashcan Icon"
          onClick={handleClear}
        />

        {showPicker && (
          <div
            style={{ position: 'absolute', zIndex: 100, top: 0, right: 0 }}
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
          </div>
        )}
      </div>
    </div>
  )
}

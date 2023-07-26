import React, { useRef, useState } from 'react'
import { ReactSketchCanvas } from 'react-sketch-canvas'
import { SketchPicker } from 'react-color'
import trashcanIcon from '../../assets/icons/trashcan.svg'
import colorpickerIcon from '../../assets/icons/colorpicker.svg'

export default ({ width, height, value, invalid, errorMsg, onChange, customRef }) => {
  const [strokeWidth, setStrokeWidth] = useState(4)
  const [strokeColor, setStrokeColor] = useState('black')
  const [showPicker, setShowPicker] = useState(false)
  const canvasRef = useRef()

  const handleChange = async () => {
    const newSVG = await canvasRef.current.exportSvg()
    onChange(newSVG)
  }

  const handleClear = () => {
    if (canvasRef.current) canvasRef.current.clearCanvas()
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
      }}
    >
      <ReactSketchCanvas
        width={'100%'}
        height={'100%'}
        ref={canvasRef}
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
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <img
            src={colorpickerIcon}
            style={{
              marginRight: 10,
              width: 20,
              height: 25,
              cursor: 'pointer',
              filter:
                'invert(72%) sepia(0%) saturate(237%) hue-rotate(137deg) brightness(86%) contrast(87%)',
            }}
            alt="Color Picker Icon"
            onClick={() => {
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
          <div style={{ position: 'absolute', zIndex: 100, top: 0, right: 0 }}>
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

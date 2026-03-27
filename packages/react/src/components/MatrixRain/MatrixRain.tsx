import React, { useRef, useEffect } from 'react'
import { rainPresets } from '@matrixui/tokens'
import type { MatrixRainProps } from './MatrixRain.types'

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]|/\\+=~'

export const MatrixRain = React.forwardRef<HTMLCanvasElement, MatrixRainProps>(
  (
    {
      preset = 'diff',
      opacity,
      speed,
      fontSize,
      headColor,
      brightColor,
      dimColor,
      fadeAlpha,
      className,
      style,
    },
    ref,
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    // Merge ref
    const setRef = (node: HTMLCanvasElement | null) => {
      ;(canvasRef as React.MutableRefObject<HTMLCanvasElement | null>).current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) (ref as React.MutableRefObject<HTMLCanvasElement | null>).current = node
    }

    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const presetConfig = rainPresets[preset] ?? rainPresets['diff']!
      const cfg = {
        speed:       speed       ?? presetConfig.speed,
        fontSize:    fontSize    ?? presetConfig.fontSize,
        opacity:     opacity     ?? presetConfig.opacity,
        headColor:   headColor   ?? presetConfig.headColor,
        brightColor: brightColor ?? presetConfig.brightColor,
        dimColor:    dimColor    ?? presetConfig.dimColor,
        fadeAlpha:   fadeAlpha   ?? presetConfig.fadeAlpha,
      }

      const dpr = window.devicePixelRatio || 1
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      let columns: number[] = []
      let animId = 0
      let lastFrame = 0

      function init() {
        if (!canvas) return
        const w = canvas.offsetWidth
        const h = canvas.offsetHeight
        canvas.width  = Math.floor(w * dpr)
        canvas.height = Math.floor(h * dpr)
        ctx!.scale(dpr, dpr)
        const colCount = Math.floor(w / cfg.fontSize)
        columns = Array.from({ length: colCount }, () => Math.floor(Math.random() * (h / cfg.fontSize)) * -1)
      }

      function draw(timestamp: number) {
        animId = requestAnimationFrame(draw)
        if (timestamp - lastFrame < cfg.speed) return
        lastFrame = timestamp

        if (!canvas) return
        const w  = canvas.offsetWidth
        const h  = canvas.offsetHeight

        ctx!.fillStyle = `rgba(0, 0, 0, ${cfg.fadeAlpha})`
        ctx!.fillRect(0, 0, w, h)

        ctx!.font = `${cfg.fontSize}px monospace`

        columns.forEach((y, i) => {
          const x = i * cfg.fontSize

          // head glyph
          ctx!.fillStyle = cfg.headColor
          ctx!.shadowColor = cfg.headColor
          ctx!.shadowBlur  = 8
          const headChar = CHARS[Math.floor(Math.random() * CHARS.length)] ?? 'A'
          ctx!.fillText(headChar, x, y * cfg.fontSize)

          // bright glyph just behind
          if (y > 1) {
            ctx!.fillStyle = cfg.brightColor
            ctx!.shadowColor = cfg.brightColor
            ctx!.shadowBlur  = 4
            const brightChar = CHARS[Math.floor(Math.random() * CHARS.length)] ?? 'A'
            ctx!.fillText(brightChar, x, (y - 1) * cfg.fontSize)
          }

          ctx!.shadowBlur = 0

          // advance column
          if (y * cfg.fontSize > h && Math.random() > 0.975) {
            columns[i] = 0
          } else {
            columns[i] = y + 1
          }
        })
      }

      init()
      animId = requestAnimationFrame(draw)

      const observer = new ResizeObserver(() => {
        cancelAnimationFrame(animId)
        init()
        animId = requestAnimationFrame(draw)
      })
      observer.observe(canvas.parentElement ?? canvas)

      return () => {
        cancelAnimationFrame(animId)
        observer.disconnect()
      }
    }, [preset, opacity, speed, fontSize, headColor, brightColor, dimColor, fadeAlpha])

    const presetConfig = rainPresets[preset] ?? rainPresets['diff']!
    const resolvedOpacity = opacity ?? presetConfig.opacity

    return (
      <canvas
        ref={setRef}
        data-matrixui-matrix-rain
        className={className}
        style={{
          position:      'absolute',
          inset:         0,
          width:         '100%',
          height:        '100%',
          pointerEvents: 'none',
          opacity:       resolvedOpacity,
          display:       'block',
          ...style,
        }}
      />
    )
  },
)

MatrixRain.displayName = 'MatrixRain'

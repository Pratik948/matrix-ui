import { useEffect } from 'react'
import type { RefObject } from 'react'
import { rainPresets } from '@matrixui/tokens'
import type { RainPreset } from '@matrixui/tokens'

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]|/\\+=~'

export interface UseMatrixRainConfig extends Partial<RainPreset> {
  preset?: keyof typeof rainPresets
}

export function useMatrixRain(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  config: UseMatrixRainConfig = {},
): void {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const presetKey  = config.preset ?? 'diff'
    const presetCfg  = rainPresets[presetKey] ?? rainPresets['diff']!
    const cfg = {
      speed:       config.speed       ?? presetCfg.speed,
      fontSize:    config.fontSize    ?? presetCfg.fontSize,
      opacity:     config.opacity     ?? presetCfg.opacity,
      headColor:   config.headColor   ?? presetCfg.headColor,
      brightColor: config.brightColor ?? presetCfg.brightColor,
      dimColor:    config.dimColor    ?? presetCfg.dimColor,
      fadeAlpha:   config.fadeAlpha   ?? presetCfg.fadeAlpha,
    }

    const dpr = window.devicePixelRatio || 1
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let columns: number[] = []
    let animId   = 0
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
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight

      ctx!.fillStyle = `rgba(0, 0, 0, ${cfg.fadeAlpha})`
      ctx!.fillRect(0, 0, w, h)
      ctx!.font = `${cfg.fontSize}px monospace`

      columns.forEach((y, i) => {
        const x = i * cfg.fontSize

        ctx!.fillStyle   = cfg.headColor
        ctx!.shadowColor = cfg.headColor
        ctx!.shadowBlur  = 8
        const head = CHARS[Math.floor(Math.random() * CHARS.length)] ?? 'A'
        ctx!.fillText(head, x, y * cfg.fontSize)

        if (y > 1) {
          ctx!.fillStyle   = cfg.brightColor
          ctx!.shadowColor = cfg.brightColor
          ctx!.shadowBlur  = 4
          const bright = CHARS[Math.floor(Math.random() * CHARS.length)] ?? 'A'
          ctx!.fillText(bright, x, (y - 1) * cfg.fontSize)
        }
        ctx!.shadowBlur = 0

        if (y * cfg.fontSize > h && Math.random() > 0.975) columns[i] = 0
        else columns[i] = y + 1
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef, config.preset, config.speed, config.fontSize, config.headColor, config.brightColor, config.dimColor, config.fadeAlpha])
}

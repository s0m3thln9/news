import { Image } from "@tiptap/extension-image"
import {
  type NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react"
import React, { useRef, useState, useEffect, useCallback } from "react"

export const ExtendedImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      alignment: {
        default: "left",
        parseHTML: (element) => element.getAttribute("data-align") || "left",
        renderHTML: (attributes) => {
          const { alignment } = attributes
          let style = ""
          if (alignment === "left") {
            style = "float: left; margin: 0 1em 1em 0;"
          } else if (alignment === "right") {
            style = "float: right; margin: 0 0 1em 1em;"
          } else if (alignment === "center") {
            style = "display: block; margin: 0 auto 1em;"
          } else if (alignment === "justify") {
            style = "display: block; margin: 0 auto 1em; width: 100%;"
          }
          return { style, "data-align": alignment }
        },
      },
      width: {
        default: null,
        parseHTML: (element) => element.getAttribute("width"),
        renderHTML: (attributes) =>
          attributes.width ? { width: attributes.width } : {},
      },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImage)
  },
})

export const ResizableImage: React.FC<NodeViewProps> = ({
  node,
  updateAttributes,
  selected,
  editor,
  getPos,
}) => {
  const { src, alt, width, alignment } = node.attrs as {
    src: string
    alt?: string
    width?: string
    alignment?: "left" | "center" | "right" | "justify"
  }

  const [isResizing, setIsResizing] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const tempWidthRef = useRef<number>(0)
  const startXRef = useRef<number>(0)
  const startWidthRef = useRef<number>(0)
  const handleMouseUpRef = useRef<(e: MouseEvent) => void>(() => {})
  const handleTouchEndRef = useRef<(e: TouchEvent) => void>(() => {})

  useEffect(() => {
    const img = imgRef.current
    if (img && !width) {
      const handleLoad = () => {
        const naturalW = Math.min(img.naturalWidth || 300, 800)
        updateAttributes({ width: `${naturalW}px` })
      }
      if (img.complete) {
        handleLoad()
      } else {
        img.addEventListener("load", handleLoad)
        return () => img.removeEventListener("load", handleLoad)
      }
    }
  }, [src, width, updateAttributes])

  const selectImageNode = useCallback(() => {
    const pos = getPos()
    if (pos !== undefined) {
      editor.commands.setNodeSelection(pos)
    } else {
      editor.commands.focus()
    }
  }, [editor, getPos])

  const handleWrapperClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      selectImageNode()
    },
    [selectImageNode],
  )

  const handleWrapperKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        selectImageNode()
      }
    },
    [selectImageNode],
  )

  const handleResizeKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        const currentW = imgRef.current?.clientWidth || 300
        const newW = Math.max(100, currentW - 5)
        updateAttributes({ width: `${newW}px` })
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        const currentW = imgRef.current?.clientWidth || 300
        const newW = Math.min(800, currentW + 5)
        updateAttributes({ width: `${newW}px` })
      }
    },
    [updateAttributes],
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (!isResizing) return
      const deltaX = e.clientX - startXRef.current
      const newWidth = Math.max(
        100,
        Math.min(800, startWidthRef.current + deltaX),
      )
      tempWidthRef.current = newWidth
      if (imgRef.current) {
        imgRef.current.style.width = `${newWidth}px`
        imgRef.current.style.maxWidth = "800px"
      }
    },
    [isResizing],
  )

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (!isResizing) return
      const deltaX = e.touches[0].clientX - startXRef.current
      const newWidth = Math.max(
        100,
        Math.min(800, startWidthRef.current + deltaX),
      )
      tempWidthRef.current = newWidth
      if (imgRef.current) {
        imgRef.current.style.width = `${newWidth}px`
        imgRef.current.style.maxWidth = "800px"
      }
    },
    [isResizing],
  )

  const finishResize = useCallback(() => {
    const finalWidth = tempWidthRef.current
    if (finalWidth !== startWidthRef.current) {
      updateAttributes({ width: `${finalWidth}px` })
    }
    if (imgRef.current) {
      imgRef.current.style.removeProperty("width")
      imgRef.current.style.maxWidth = "800px"
    }
    setIsResizing(false)
  }, [updateAttributes])

  handleMouseUpRef.current = useCallback(
    (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (!isResizing) return
      finishResize()
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUpRef.current)
    },
    [isResizing, finishResize, handleMouseMove],
  )

  handleTouchEndRef.current = useCallback(
    (e: TouchEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (!isResizing) return
      finishResize()
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEndRef.current)
    },
    [isResizing, finishResize, handleTouchMove],
  )

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      selectImageNode()
      setIsResizing(true)
      startXRef.current = e.clientX
      startWidthRef.current = imgRef.current?.clientWidth || 300
      tempWidthRef.current = startWidthRef.current
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUpRef.current)
    },
    [selectImageNode, handleMouseMove],
  )

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault()
      e.stopPropagation()
      selectImageNode()
      setIsResizing(true)
      startXRef.current = e.touches[0].clientX
      startWidthRef.current = imgRef.current?.clientWidth || 300
      tempWidthRef.current = startWidthRef.current
      document.addEventListener("touchmove", handleTouchMove)
      document.addEventListener("touchend", handleTouchEndRef.current)
    },
    [selectImageNode, handleTouchMove],
  )

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUpRef.current)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEndRef.current)
    }
  }, [handleMouseMove, handleTouchMove])

  const isBlock = alignment === "center" || alignment === "justify"
  const showHandle = isHovered || selected || isResizing

  return (
    <NodeViewWrapper
      as={isBlock ? "div" : "span"}
      role="figure"
      tabIndex={0}
      aria-label={alt || "Resizable image"}
      className="resizable-image-wrapper"
      contentEditable={false}
      style={{
        position: "relative",
        display: isBlock ? "block" : "inline-block",
        float:
          alignment === "left"
            ? "left"
            : alignment === "right"
              ? "right"
              : "none",
        margin: isBlock
          ? "0 auto 1em"
          : alignment === "left"
            ? "0 1em 1em 0"
            : alignment === "right"
              ? "0 0 1em 1em"
              : "0",
        width: alignment === "justify" ? "100%" : "auto",
        outline: selected || isResizing ? "1px dashed #2196f3" : "none",
        cursor: isResizing ? "nwse-resize" : "default",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleWrapperClick}
      onKeyDown={handleWrapperKeyDown}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        draggable={false}
        style={{
          maxWidth: "800px",
          height: "auto",
          display: isBlock ? "block" : "inline-block",
          margin: isBlock ? "0 auto" : "0",
          pointerEvents: isResizing ? "none" : "auto",
          width: isResizing ? `${tempWidthRef.current}px` : width || "auto",
        }}
      />
      <div
        role="slider"
        tabIndex={0}
        aria-label="Resize image width"
        aria-valuenow={tempWidthRef.current}
        aria-valuemin={100}
        aria-valuemax={800}
        className="resize-handle"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onKeyDown={handleResizeKeyDown}
        style={{
          position: "absolute",
          bottom: "0",
          right: "0",
          width: "28px",
          height: "28px",
          background: "#2196f3",
          border: "2px solid white",
          borderRadius: "50%",
          cursor: "nwse-resize",
          opacity: showHandle ? 1 : 0,
          transition: "opacity 0.2s",
          zIndex: 20,
          boxShadow: showHandle ? "0 0 4px rgba(0, 0, 0, 0.2)" : "none",
        }}
      />
    </NodeViewWrapper>
  )
}

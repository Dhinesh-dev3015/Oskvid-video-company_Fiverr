"use client"

import { useEffect, useState, useRef } from "react"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Heading3,
  LinkIcon,
  ImageIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [editorRef, setEditorRef] = useState<HTMLDivElement | null>(null)
  const [linkUrl, setLinkUrl] = useState("")
  const [linkPopoverOpen, setLinkPopoverOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [imagePopoverOpen, setImagePopoverOpen] = useState(false)
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  useEffect(() => {
    if (editorRef && isMountedRef.current) {
      try {
        editorRef.innerHTML = value
      } catch (error) {
        console.warn("Error setting innerHTML:", error)
      }
    }
  }, [editorRef, value])

  const handleEditorChange = () => {
    if (editorRef && isMountedRef.current) {
      try {
        onChange(editorRef.innerHTML)
      } catch (error) {
        console.warn("Error reading innerHTML:", error)
      }
    }
  }

  // Modern alternatives to execCommand
  const execCommand = (command: string, value = "") => {
    if (typeof document === "undefined" || !editorRef) return

    try {
      // Use modern Selection API instead of deprecated execCommand
      const selection = window.getSelection()
      if (!selection || selection.rangeCount === 0) return

      const range = selection.getRangeAt(0)
      
      switch (command) {
        case "bold":
          document.execCommand("insertHTML", false, `<strong>${range.toString()}</strong>`)
          break
        case "italic":
          document.execCommand("insertHTML", false, `<em>${range.toString()}</em>`)
          break
        case "underline":
          document.execCommand("insertHTML", false, `<u>${range.toString()}</u>`)
          break
        case "insertUnorderedList":
          document.execCommand("insertHTML", false, `<ul><li>${range.toString()}</li></ul>`)
          break
        case "insertOrderedList":
          document.execCommand("insertHTML", false, `<ol><li>${range.toString()}</li></ol>`)
          break
        case "justifyLeft":
          document.execCommand("justifyLeft", false)
          break
        case "justifyCenter":
          document.execCommand("justifyCenter", false)
          break
        case "justifyRight":
          document.execCommand("justifyRight", false)
          break
        case "createLink":
          if (value) {
            document.execCommand("insertHTML", false, `<a href="${value}" target="_blank" rel="noopener noreferrer">${range.toString()}</a>`)
          }
          break
        case "insertImage":
          if (value) {
            document.execCommand("insertHTML", false, `<img src="${value}" alt="Image" style="max-width: 100%; height: auto;" />`)
          }
          break
        default:
          // Fallback to execCommand for other commands
          document.execCommand(command, false, value)
      }
      
      handleEditorChange()
    } catch (error) {
      console.warn("Error executing command:", error)
    }
  }

  const handleFormat = (format: string) => {
    execCommand(format)
  }

  const handleHeading = (level: string) => {
    if (typeof document === "undefined" || !editorRef) return

    try {
      const selection = window.getSelection()
      if (!selection || selection.rangeCount === 0) return

      const range = selection.getRangeAt(0)
      const headingElement = document.createElement(level)
      headingElement.textContent = range.toString()
      
      range.deleteContents()
      range.insertNode(headingElement)
      handleEditorChange()
    } catch (error) {
      console.warn("Error creating heading:", error)
    }
  }

  const handleLink = () => {
    if (linkUrl) {
      execCommand("createLink", linkUrl)
      setLinkUrl("")
      setLinkPopoverOpen(false)
    }
  }

  const handleImage = () => {
    if (imageUrl) {
      execCommand("insertImage", imageUrl)
      setImageUrl("")
      setImagePopoverOpen(false)
    }
  }

  return (
    <div className="w-full">
      <div className="bg-muted p-2 rounded-t-md flex flex-wrap gap-1 border-b">
        <Button type="button" variant="ghost" size="sm" onClick={() => handleFormat("bold")} className="h-8 w-8 p-0">
          <Bold className="h-4 w-4" />
          <span className="sr-only">Bold</span>
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => handleFormat("italic")} className="h-8 w-8 p-0">
          <Italic className="h-4 w-4" />
          <span className="sr-only">Italic</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat("underline")}
          className="h-8 w-8 p-0"
        >
          <Underline className="h-4 w-4" />
          <span className="sr-only">Underline</span>
        </Button>
        <div className="w-px h-8 bg-border mx-1" />
        <Button type="button" variant="ghost" size="sm" onClick={() => handleHeading("h1")} className="h-8 w-8 p-0">
          <Heading1 className="h-4 w-4" />
          <span className="sr-only">Heading 1</span>
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => handleHeading("h2")} className="h-8 w-8 p-0">
          <Heading2 className="h-4 w-4" />
          <span className="sr-only">Heading 2</span>
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => handleHeading("h3")} className="h-8 w-8 p-0">
          <Heading3 className="h-4 w-4" />
          <span className="sr-only">Heading 3</span>
        </Button>
        <div className="w-px h-8 bg-border mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat("insertUnorderedList")}
          className="h-8 w-8 p-0"
        >
          <List className="h-4 w-4" />
          <span className="sr-only">Bullet List</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat("insertOrderedList")}
          className="h-8 w-8 p-0"
        >
          <ListOrdered className="h-4 w-4" />
          <span className="sr-only">Numbered List</span>
        </Button>
        <div className="w-px h-8 bg-border mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("justifyLeft")}
          className="h-8 w-8 p-0"
        >
          <AlignLeft className="h-4 w-4" />
          <span className="sr-only">Align Left</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("justifyCenter")}
          className="h-8 w-8 p-0"
        >
          <AlignCenter className="h-4 w-4" />
          <span className="sr-only">Align Center</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("justifyRight")}
          className="h-8 w-8 p-0"
        >
          <AlignRight className="h-4 w-4" />
          <span className="sr-only">Align Right</span>
        </Button>
        <div className="w-px h-8 bg-border mx-1" />
        <Popover open={linkPopoverOpen} onOpenChange={setLinkPopoverOpen}>
          <PopoverTrigger asChild>
            <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
              <LinkIcon className="h-4 w-4" />
              <span className="sr-only">Insert Link</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <Label htmlFor="link-url">Link URL</Label>
              <div className="flex space-x-2">
                <Input
                  id="link-url"
                  placeholder="https://example.com"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                />
                <Button type="button" onClick={handleLink}>
                  Insert
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Popover open={imagePopoverOpen} onOpenChange={setImagePopoverOpen}>
          <PopoverTrigger asChild>
            <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ImageIcon className="h-4 w-4" />
              <span className="sr-only">Insert Image</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <Label htmlFor="image-url">Image URL</Label>
              <div className="flex space-x-2">
                <Input
                  id="image-url"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <Button type="button" onClick={handleImage}>
                  Insert
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div
        ref={setEditorRef}
        className="min-h-[200px] p-4 focus:outline-none bg-white"
        contentEditable
        onInput={handleEditorChange}
        onBlur={handleEditorChange}
      />
    </div>
  )
}

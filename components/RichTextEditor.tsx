"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Code,
  Minus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link as LinkIcon,
  Image as ImageIcon,
  Quote,
  Undo,
  Redo,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder,
  className,
  minHeight = "min-h-[200px]",
}: RichTextEditorProps) {
  const [isLinkOpen, setIsLinkOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [textColor, setTextColor] = useState("#EC4E02");
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-[#EC4E02] underline cursor-pointer",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-h-[300px] object-contain",
        },
      }),
      Placeholder.configure({
        placeholder: placeholder ?? "Start writing...",
        emptyEditorClass:
          "before:content-[attr(data-placeholder)] before:text-white/30 before:float-left before:h-0 before:pointer-events-none",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color,
    ],
    content: value,
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm prose-invert max-w-none w-full bg-transparent focus:outline-none p-4 leading-relaxed",
          "[&_h1]:text-3xl [&_h1]:leading-tight [&_h1]:mt-6 [&_h1]:mb-3",
          "[&_h2]:text-2xl [&_h2]:leading-tight [&_h2]:mt-5 [&_h2]:mb-2",
          "[&_p]:my-3 [&_ul]:my-3 [&_ol]:my-3 [&_li]:my-1",
          "[&_blockquote]:border-l-2 [&_blockquote]:border-[#EC4E02] [&_blockquote]:pl-4 [&_blockquote]:text-white/70",
          "[&_code]:bg-white/10 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded",
          "[&_hr]:border-white/10",
          minHeight,
        ),
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  const wordCount = useMemo(() => {
    if (!editor) return 0;
    const text = editor.getText().trim();
    if (!text) return 0;
    return text.split(/\s+/).length;
  }, [editor, value]);

  const charCount = useMemo(
    () => (editor ? editor.getText().length : 0),
    [editor, value],
  );

  if (!editor) {
    return null;
  }

  const openLinkModal = () => {
    const previousUrl = editor.getAttributes("link").href ?? "";
    setLinkUrl(previousUrl);
    setIsLinkOpen(true);
  };

  const openImageModal = () => {
    setImageUrl("");
    setIsImageOpen(true);
  };

  const applyLink = () => {
    const url = linkUrl.trim();
    if (!url) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      setIsLinkOpen(false);
      return;
    }

    if (editor.state.selection.empty) {
      editor
        .chain()
        .focus()
        .insertContent(url)
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
    setIsLinkOpen(false);
  };

  const applyImageUrl = () => {
    const url = imageUrl.trim();
    if (!url) return;
    editor.chain().focus().setImage({ src: url }).run();
    setIsImageOpen(false);
  };

  const applyImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      if (result) {
        editor.chain().focus().setImage({ src: result }).run();
        setIsImageOpen(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={cn("flex flex-col w-full h-full", className)}>
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-2 p-2 border-b border-white/10 bg-[#0A0A0A]/90 backdrop-blur">
        <div className="flex items-center gap-1">
          <Toggle
            size="sm"
            pressed={editor.isActive("bold")}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
            aria-label="Toggle bold"
            className="data-[state=on]:bg-[#EC4E02] data-[state=on]:text-white hover:bg-white/10 hover:text-white text-white/50"
          >
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive("italic")}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            aria-label="Toggle italic"
            className="data-[state=on]:bg-[#EC4E02] data-[state=on]:text-white hover:bg-white/10 hover:text-white text-white/50"
          >
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive("heading", { level: 1 })}
            onPressedChange={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            aria-label="Toggle heading 1"
            className="data-[state=on]:bg-[#EC4E02] data-[state=on]:text-white hover:bg-white/10 hover:text-white text-white/50"
          >
            <Heading1 className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive("heading", { level: 2 })}
            onPressedChange={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            aria-label="Toggle heading 2"
            className="data-[state=on]:bg-[#EC4E02] data-[state=on]:text-white hover:bg-white/10 hover:text-white text-white/50"
          >
            <Heading2 className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive("codeBlock")}
            onPressedChange={() =>
              editor.chain().focus().toggleCodeBlock().run()
            }
            aria-label="Toggle code block"
            className="data-[state=on]:bg-[#EC4E02] data-[state=on]:text-white hover:bg-white/10 hover:text-white text-white/50"
          >
            <Code className="h-4 w-4" />
          </Toggle>
        </div>

        <div className="w-px h-6 bg-white/10" />

        <div className="flex items-center gap-1">
          <Toggle
            size="sm"
            pressed={editor.isActive("bulletList")}
            onPressedChange={() =>
              editor.chain().focus().toggleBulletList().run()
            }
            aria-label="Toggle bullet list"
            className="data-[state=on]:bg-[#EC4E02] data-[state=on]:text-white hover:bg-white/10 hover:text-white text-white/50"
          >
            <List className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive("orderedList")}
            onPressedChange={() =>
              editor.chain().focus().toggleOrderedList().run()
            }
            aria-label="Toggle ordered list"
            className="data-[state=on]:bg-[#EC4E02] data-[state=on]:text-white hover:bg-white/10 hover:text-white text-white/50"
          >
            <ListOrdered className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive("blockquote")}
            onPressedChange={() =>
              editor.chain().focus().toggleBlockquote().run()
            }
            aria-label="Toggle quote"
            className="data-[state=on]:bg-[#EC4E02] data-[state=on]:text-white hover:bg-white/10 hover:text-white text-white/50"
          >
            <Quote className="h-4 w-4" />
          </Toggle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="hover:bg-white/10 hover:text-white text-white/50"
          >
            <Minus className="h-4 w-4" />
          </Button>
        </div>

        <div className="w-px h-6 bg-white/10" />

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={cn(
              "hover:bg-white/10 hover:text-white text-white/50",
              editor.isActive({ textAlign: "left" }) &&
                "bg-[#EC4E02] text-white hover:bg-[#EC4E02]/90",
            )}
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={cn(
              "hover:bg-white/10 hover:text-white text-white/50",
              editor.isActive({ textAlign: "center" }) &&
                "bg-[#EC4E02] text-white hover:bg-[#EC4E02]/90",
            )}
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={cn(
              "hover:bg-white/10 hover:text-white text-white/50",
              editor.isActive({ textAlign: "right" }) &&
                "bg-[#EC4E02] text-white hover:bg-[#EC4E02]/90",
            )}
          >
            <AlignRight className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={cn(
              "hover:bg-white/10 hover:text-white text-white/50",
              editor.isActive({ textAlign: "justify" }) &&
                "bg-[#EC4E02] text-white hover:bg-[#EC4E02]/90",
            )}
          >
            <AlignJustify className="h-4 w-4" />
          </Button>
        </div>

        <div className="w-px h-6 bg-white/10" />

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={openLinkModal}
            className={cn(
              "hover:bg-white/10 hover:text-white text-white/50",
              editor.isActive("link") &&
                "bg-[#EC4E02] text-white hover:bg-[#EC4E02]/90",
            )}
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={openImageModal}
            className="hover:bg-white/10 hover:text-white text-white/50"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
          <input
            type="color"
            value={textColor}
            onChange={(e) => {
              const next = e.target.value;
              setTextColor(next);
              editor.chain().focus().setColor(next).run();
            }}
            className="h-8 w-8 rounded border border-white/10 bg-transparent"
            aria-label="Text color"
          />
        </div>

        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="hover:bg-white/10 hover:text-white text-white/50 disabled:opacity-30"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="hover:bg-white/10 hover:text-white text-white/50 disabled:opacity-30"
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <EditorContent editor={editor} className="flex-1 overflow-y-auto" />
      <div className="flex items-center justify-between px-3 py-2 border-t border-white/10 text-xs text-white/40 bg-white/[0.02]">
        <span>Autosave on</span>
        <span>
          {wordCount} words | {charCount} chars
        </span>
      </div>
      <Dialog open={isLinkOpen} onOpenChange={setIsLinkOpen}>
        <DialogContent className="bg-[#0B0B0B] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Add a link</DialogTitle>
            <DialogDescription className="text-white/50">
              Paste a URL to link the selected text.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://..."
            className="h-11 bg-white/5 border-white/10 focus-visible:ring-0 focus-visible:border-[#EC4E02] text-white"
          />
          <DialogFooter>
            <Button
              variant="ghost"
              type="button"
              onClick={() => setIsLinkOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-[#EC4E02] hover:bg-[#D94500]"
              onClick={applyLink}
            >
              Apply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isImageOpen} onOpenChange={setIsImageOpen}>
        <DialogContent className="bg-[#0B0B0B] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Add an image</DialogTitle>
            <DialogDescription className="text-white/50">
              Upload a file or paste an image URL.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <label className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-white/20 bg-white/5 px-4 py-6 hover:bg-white/10 cursor-pointer transition-all">
              <ImageIcon className="h-4 w-4 text-white/70" />
              <span className="text-white/80 font-medium">Choose image</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) applyImageFile(file);
                }}
              />
            </label>
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-white/30 uppercase">or</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://image-url.com/..."
              className="h-11 bg-white/5 border-white/10 focus-visible:ring-0 focus-visible:border-[#EC4E02] text-white"
            />
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              type="button"
              onClick={() => setIsImageOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-[#EC4E02] hover:bg-[#D94500]"
              onClick={applyImageUrl}
            >
              Insert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


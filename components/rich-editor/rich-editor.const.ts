import Highlight from '@tiptap/extension-highlight';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';

export const RICH_EDITOR_EXTENSIONS_CLIENT = [
  StarterKit,
  Underline,
  Superscript,
  SubScript,
  Highlight,
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
];

export const RICH_EDITOR_EXTENSIONS_SERVER = [
  StarterKit,
  Underline,
  Superscript,
  SubScript,
  Highlight,
  TextAlign,
];

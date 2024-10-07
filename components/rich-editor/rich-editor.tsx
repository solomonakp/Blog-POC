'use client';

import { useEditor } from '@tiptap/react';
import { InputWrapper } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { RICH_EDITOR_EXTENSIONS_CLIENT } from './rich-editor.const';
import { EditorProps as Props } from './rich-editor.props';

export const Editor = (props: Props) => {
  const { value, label, error, description, onFocus, onBlur, onChange } = props;

  const editor = useEditor({
    extensions: RICH_EDITOR_EXTENSIONS_CLIENT,
    content: JSON.parse(value || ''),
  });

  editor?.on('focus', () => {
    onFocus?.();
  });

  editor?.on('blur', () => {
    onBlur?.();
  });

  editor?.on?.('update', ({ editor: upDateEditor }) => {
    onChange?.(JSON.stringify(upDateEditor?.getJSON()));
  });

  return (
    <InputWrapper label={label} description={description} error={error} mb="lg" withAsterisk>
      <RichTextEditor editor={editor} mih="200px">
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
    </InputWrapper>
  );
};

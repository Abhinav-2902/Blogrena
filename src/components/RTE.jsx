import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {label}
        </label>
      )}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition">
            <Editor
              apiKey="oeolqyxs6qgri4ev0b5ts2aivjgfx0fp0r93uprk13of2xbh"
              initialValue={defaultValue}
              init={{
                height: 400,
                menubar: true,
                plugins: [
                  "advlist autolink lists link image charmap preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table help wordcount"
                ],
                toolbar:
                  "undo redo | formatselect | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; color: #111 }"
              }}
              onEditorChange={onChange}
            />
          </div>
        )}
      />
    </div>
  );
}

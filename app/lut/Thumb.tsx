import React from 'react';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

interface Props {
  preview: string | undefined;
}

export function Thumb({ preview }: Props) {
  if (!preview) {
    return null;
  }

  return (
    <div style={thumbsContainer}>
      <div style={thumb}>
        <div style={thumbInner}>
          <img src={preview} style={img} alt="eslint" />
        </div>
      </div>
    </div>
  );
}

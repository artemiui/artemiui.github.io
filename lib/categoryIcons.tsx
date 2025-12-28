import React from 'react';

export const categoryIcons = {
  Knowledge: (props: { className?: string }) => (
    <img src="/knowledge.svg" alt="Knowledge" className={props.className} />
  ),
  Media: (props: { className?: string }) => (
    <img src="/media.svg" alt="Media" className={props.className} />
  ),
  Hobby: (props: { className?: string }) => (
    <img src="/hobby.svg" alt="Hobby" className={props.className} />
  ),
  Design: (props: { className?: string }) => (
    <img src="/design.svg" alt="Design" className={props.className} />
  ),
};
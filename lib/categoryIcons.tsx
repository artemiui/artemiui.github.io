import React from 'react';

export const categoryIcons = {
  Research: (props: { className?: string }) => (
    <img src="/design.svg" alt="Research" className={props.className} />
  ),
  "Knowledge Sharing": (props: { className?: string }) => (
    <img src="/knowledge.svg" alt="Knowledge Sharing" className={props.className} />
  ),
  Culture: (props: { className?: string }) => (
    <img src="/media.svg" alt="Culture" className={props.className} />
  ),
  Commentary: (props: { className?: string }) => (
    <img src="/hobby.svg" alt="Commentary" className={props.className} />
  ),
};
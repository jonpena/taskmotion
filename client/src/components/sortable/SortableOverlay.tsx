import { PropsWithChildren } from 'react';
import { DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core';
import { DropAnimation } from '@dnd-kit/core';

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.25',
      },
    },
  }),
};

export function SortableOverlay(props: PropsWithChildren) {
  return (
    <DragOverlay dropAnimation={dropAnimationConfig}>
      {props.children}
    </DragOverlay>
  );
}

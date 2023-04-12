import { useIds } from '@chakra-ui/hooks';
import { mergeRefs, PropGetter } from '@chakra-ui/react-utils';
import { callAllHandlers } from '@chakra-ui/utils';
import { useCallback, useRef, useState } from 'react';

export interface UseContentLayoutProps {
  /**
   * The `id` of the content layout
   */
  id?: string;
}

/**
 * Content layout hook that manages all the logic for the content layout
 * and returns prop getters, state and actions.
 *
 * @param id
 */
export function useContentLayout({ id }: UseContentLayoutProps = {}) {
  const [contentLayoutId, titleId, descriptionId, headerId, bodyId, footerId] = useIds(
    id,
    'content-layout',
    'content-layout--title',
    'content-layout--description',
    'content-layout--header',
    'content-layout--body',
    'content-layout--footer'
  );

  const contentLayoutRef = useRef<HTMLElement>(null);

  // Parts states
  const [isTitleMounted, setTitleMounted] = useState(false);
  const [isDescriptionMounted, setDescriptionMounted] = useState(false);

  const getContentLayoutProps: PropGetter = useCallback(
    (props = {}, ref = null) => ({
      ...props,
      ref: mergeRefs(ref, contentLayoutRef),
      id: contentLayoutId,
      tabIndex: -1,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'aria-labelledby': isTitleMounted ? titleId : undefined,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'aria-describedby': isDescriptionMounted ? descriptionId : undefined,
      onClick: callAllHandlers(props.onClick, (event) => event.stopPropagation()),
      /**
             Prevent content layout from receiving focus
             @see https://stackoverflow.com/a/71244654
             */
      onMouseDown: props?.onMouseDown ?? ((event) => event.preventDefault()),
    }),
    [descriptionId, isDescriptionMounted, contentLayoutId, titleId, isTitleMounted]
  );
  return {
    contentLayoutId,
    titleId,
    headerId,
    descriptionId,
    bodyId,
    footerId,
    isTitleMounted,
    setTitleMounted,
    isDescriptionMounted,
    setDescriptionMounted,
    contentLayoutRef,
    getContentLayoutProps,
  };
}

export type UseContentLayoutReturn = ReturnType<typeof useContentLayout>;

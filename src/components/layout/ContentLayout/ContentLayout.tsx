import {
  Box,
  BoxProps,
  chakra,
  forwardRef,
  Heading,
  HeadingProps,
  StackProps,
  Text,
  TextProps,
  VStack,
} from '@chakra-ui/react';
import { createContext } from '@chakra-ui/react-utils';
import { __DEV__ } from '@chakra-ui/utils';
import { useEffect } from 'react';
import { useContentLayout, UseContentLayoutReturn } from './useContentLayout';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ContentLayoutOptions {}

interface ContentLayoutContext extends ContentLayoutOptions, UseContentLayoutReturn {}

const [ContentLayoutContextProvider, useContentLayoutContext] = createContext<ContentLayoutContext>({
  strict: true,
  name: 'ContentLayoutContext',
  errorMessage:
    'useContentLayoutContext: `context` is undefined. Seems you forgot to wrap content layout components in `<ContentLayout />`',
});

/* -------------------------------------------------------------------------------------------------
 * ContentLayout - The wrapper that provides context for all content layout children
 * -----------------------------------------------------------------------------------------------*/

type ContentLayoutProps = {
  children?: React.ReactNode;
} & StackProps;

export const ContentLayout = forwardRef<ContentLayoutProps, 'section'>(({ children, ...rest }, ref) => {
  // Id management
  const contentLayout = useContentLayout(rest);
  const { contentLayoutId } = contentLayout;

  const context = {
    ...contentLayout,
  };

  return (
    <ContentLayoutContextProvider value={context}>
      <chakra.main
        ref={ref}
        w={'full'}
        maxWidth={'62rem'}
        pb={12}
        pt={{ base: 8, md: 12 }}
        id={contentLayoutId}
        {...rest}
      >
        <VStack spacing={10} h={'full'}>
          {children}
        </VStack>
      </chakra.main>
    </ContentLayoutContextProvider>
  );
});

if (__DEV__) {
  ContentLayout.displayName = 'ContentLayout';
}

/* -------------------------------------------------------------------------------------------------
 * Content Layout Header
 * -----------------------------------------------------------------------------------------------*/

type ContentHeaderProps = {
  children?: React.ReactNode;
} & BoxProps;
export const ContentHeader = forwardRef<ContentHeaderProps, 'div'>(({ children, ...rest }, ref) => {
  const { headerId } = useContentLayoutContext();

  return <Box ref={ref} children={children} id={headerId} px={{ base: 6, md: 12 }} width={'full'} {...rest} />;
});

if (__DEV__) {
  ContentHeader.displayName = 'ContentHeader';
}

/* -------------------------------------------------------------------------------------------------
 * Content Layout Body
 * -----------------------------------------------------------------------------------------------*/

type ContentBodyProps = {
  children?: React.ReactNode;
} & BoxProps;
export const ContentBody = forwardRef<ContentBodyProps, 'div'>(({ children, ...rest }, ref) => {
  const { bodyId } = useContentLayoutContext();

  return (
    <Box ref={ref} children={children} id={bodyId} px={{ base: 6, md: 12 }} width={'full'} flexGrow={1} {...rest} />
  );
});

if (__DEV__) {
  ContentBody.displayName = 'ContentBody';
}

/* -------------------------------------------------------------------------------------------------
 * Content Layout Footer
 * -----------------------------------------------------------------------------------------------*/

type ContentFooterProps = {
  children?: React.ReactNode;
} & BoxProps;
export const ContentFooter = forwardRef<ContentFooterProps, 'div'>(({ children, ...rest }, ref) => {
  const { footerId } = useContentLayoutContext();

  return <Box ref={ref} children={children} id={footerId} px={{ base: 6, md: 12 }} width={'full'} {...rest} />;
});

if (__DEV__) {
  ContentFooter.displayName = 'ContentFooter';
}

/* -------------------------------------------------------------------------------------------------
 * Content Layout Title
 * -----------------------------------------------------------------------------------------------*/

type ContentTitleProps = {
  children?: React.ReactNode;
} & HeadingProps;
export const ContentTitle = forwardRef<ContentTitleProps, 'h2'>(({ children, ...rest }, ref) => {
  const { setTitleMounted, titleId } = useContentLayoutContext();

  /**
   * Notify us if this component was rendered or used
   */
  useEffect(() => {
    setTitleMounted(true);
    return () => setTitleMounted(false);
  }, [setTitleMounted]);

  return <Heading ref={ref} children={children} id={titleId} size={'2xl'} color={'primary.500'} {...rest} />;
});

if (__DEV__) {
  ContentTitle.displayName = 'ContentTitle';
}

/* -------------------------------------------------------------------------------------------------
 * Content Layout Description
 * -----------------------------------------------------------------------------------------------*/

type ContentDescriptionProps = {
  children?: React.ReactNode;
} & TextProps;
export const ContentDescription = forwardRef<ContentDescriptionProps, 'p'>(({ children, ...rest }, ref) => {
  const { setDescriptionMounted, descriptionId } = useContentLayoutContext();

  /**
   * Notify us if this component was rendered or used
   */
  useEffect(() => {
    setDescriptionMounted(true);
    return () => setDescriptionMounted(false);
  }, [setDescriptionMounted]);

  return <Text ref={ref} children={children} id={descriptionId} mt={2} {...rest} />;
});

if (__DEV__) {
  ContentDescription.displayName = 'ContentDescription';
}

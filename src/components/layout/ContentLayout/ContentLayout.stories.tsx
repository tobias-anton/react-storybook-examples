import { Box, Heading } from '@chakra-ui/react';
import { Meta, Story } from '@storybook/react';
import {
  ContentBody,
  ContentDescription,
  ContentFooter,
  ContentHeader,
  ContentLayout,
  ContentTitle,
} from './ContentLayout';

export default {
  title: 'components/layout/ContentLayout',
  args: {
    showHeaderSection: true,
    showBodySection: true,
    showFooterSection: true,
    showTitle: false,
    showDescription: false,
  },
  argTypes: {
    showHeaderSection: {
      control: 'boolean',
    },
    showBodySection: {
      control: 'boolean',
    },
    showFooterSection: {
      control: 'boolean',
    },
    showTitle: {
      control: 'boolean',
    },
    showDescription: {
      control: 'boolean',
    },
  },
} as Meta;

type ContentLayoutComponentProps = {
  showHeaderSection: boolean;
  showBodySection: boolean;
  showFooterSection: boolean;
  showTitle?: boolean;
  showDescription?: boolean;
};
const ContentLayoutComponent: React.FC<ContentLayoutComponentProps> = ({
  showHeaderSection,
  showBodySection,
  showFooterSection,
  showTitle,
  showDescription,
}) => {
  const showHeaderContent = showTitle || showDescription;

  return (
    <>
      <Box minW={'full'} display={'flex'} justifyContent={'center'} height={'600px'} backgroundColor={'white'}>
        <ContentLayout backgroundColor={'primary.50'}>
          {showHeaderSection && (
            <ContentHeader minH={showHeaderContent ? 'unset' : '100px'}>
              <Box
                backgroundColor={showHeaderContent ? 'white' : 'teal.500'}
                border={showHeaderContent ? '1px solid black' : 'unset'}
                borderColor={'teal.500'}
                width={'full'}
                height={'full'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                flexDirection={'column'}
              >
                {showHeaderContent && (
                  <>
                    {showTitle && <ContentTitle children={'Title'} />}
                    {showDescription && <ContentDescription children={'Description'} />}
                  </>
                )}
                {!showHeaderContent && <Heading size={'3xl'} children={'Header'} color={'white'} />}
              </Box>
            </ContentHeader>
          )}
          {showBodySection && (
            <ContentBody minH={'100px'}>
              <Box
                backgroundColor={'teal.500'}
                width={'full'}
                height={'full'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Heading size={'3xl'} children={'Body'} color={'white'} />
              </Box>
            </ContentBody>
          )}
          {showFooterSection && (
            <ContentFooter minH={'100px'}>
              <Box
                backgroundColor={'teal.500'}
                width={'full'}
                height={'full'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Heading size={'3xl'} children={'Footer'} color={'white'} />
              </Box>
            </ContentFooter>
          )}
        </ContentLayout>
      </Box>
    </>
  );
};

export const WithAllSections: Story<ContentLayoutComponentProps> = (args) => <ContentLayoutComponent {...args} />;

export const WithoutFooter: Story<ContentLayoutComponentProps> = (args) => <ContentLayoutComponent {...args} />;
WithoutFooter.args = {
  showFooterSection: false,
};

export const WithoutFooterAndHeader: Story<ContentLayoutComponentProps> = (args) => (
  <ContentLayoutComponent {...args} />
);
WithoutFooterAndHeader.args = {
  showFooterSection: false,
  showHeaderSection: false,
};

export const WithoutTitleAndDescription: Story<ContentLayoutComponentProps> = (args) => (
  <ContentLayoutComponent {...args} />
);
WithoutTitleAndDescription.args = {
  showTitle: true,
  showDescription: true,
};

export const WithoutDescription: Story<ContentLayoutComponentProps> = (args) => <ContentLayoutComponent {...args} />;
WithoutDescription.args = {
  showTitle: true,
};

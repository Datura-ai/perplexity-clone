import { useState } from 'react';
import { Tooltip } from '@chakra-ui/react';
import { CheckIcon, CopyIcon } from '@chakra-ui/icons';

export const CopyButton = ({ text }: {
  text: string;
}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  return (
    <>
      {isCopied ? (
        <Tooltip
          aria-label='Copied!'
          hasArrow
          label='Copied'
          placement='left-end'
          px={1}
          rounded='md'
        >
          <CheckIcon
            bottom={-9}
            boxSize={8}
            p={2}
            position='absolute'
            right={2}
          />
        </Tooltip>
      ) : (
        <Tooltip
          aria-label='Copy to clipboard'
          hasArrow
          label='Copy to clipboard'
          placement='left-end'
          px={1}
          openDelay={100}
          rounded='md'
        >
          <CopyIcon
            bottom={-9}
            boxSize={8}
            cursor='pointer'
            p={2}
            position='absolute'
            right={2}
            rounded='full'
            _hover={{ bg: 'gray.600' }}
            onClick={() => {
              navigator.clipboard.writeText(text);
              setIsCopied(true)
              setTimeout(() => {
                setIsCopied(false);
              }, 2000);
            }}
          />
        </Tooltip>
      )}
    </>
  );
};

import { Group, Text, rem } from '@mantine/core';
import { IconUpload, IconFileDots, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';


export default (props) => {
  return (
    
      <Dropzone
      onDrop={(files) => console.log('accepted files', files)}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      style={{
        border: '2px dashed #718096', // Example color, adjust as needed
        borderRadius: '12px', // Optional: if you want rounded corners
        padding: '20px', // Optional: for internal spacing
        textAlign: 'center', // Optional: if you want the text aligned to the center
        margin: "3em"
        // Add other styling as needed
      }}
      {...props}
    >
      <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
            stroke={1.5}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconFileDots
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
            stroke={1.5}
          />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag a file with your genetic information here
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            The file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>
    
  );
}
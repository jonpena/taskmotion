export const calculateHeight = (
  textareaRef: React.MutableRefObject<HTMLTextAreaElement>
) => {
  textareaRef.current.style.height = 'auto';
  textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
};

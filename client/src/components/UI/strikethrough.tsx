type strikethroughProps = {
  checked: boolean;
  children: React.ReactNode;
};

export const Strikethrough = ({ checked, children }: strikethroughProps) => {
  return (
    <span
      className={`${
        checked && 'after:scale-x-100'
      } relative after:absolute after:block
    after:w-full after:border-b after:-mt-2.5 after:bg-foreground after:scale-x-0 after:origin-bottom-left
    after:transition-all after:duration-500 after:delay-150 after:ease-strikethrough
    `}
    >
      {children}
    </span>
  );
};

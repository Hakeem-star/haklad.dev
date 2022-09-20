import {
  SquareCornerWhiteHoverBlock,
  SquareCornerWhiteHoverBlockBG,
} from "../MiddleColumn.style";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  onClick?(): void;
}

export const WitcherStyle4CornerContainer = ({
  className,
  children,
  onClick,
}: Props) => {
  return (
    <SquareCornerWhiteHoverBlock onClick={onClick} className={className}>
      <SquareCornerWhiteHoverBlockBG />
      {children}
    </SquareCornerWhiteHoverBlock>
  );
};

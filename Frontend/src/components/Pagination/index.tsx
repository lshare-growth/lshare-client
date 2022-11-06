import * as S from './style';

type PaginationProps = {
  // eslint-disable-next-line react/require-default-props
  className?: string;
  showingPageButtonNum: number;
  totalPageNum: number;
  selectedPage: number;
  // eslint-disable-next-line no-unused-vars
  handleClickPageButton: (selectedButton: number) => void;
  handleClickLeftButton: () => void;
  handleClickRightButton: () => void;
};

const Pagination = ({ className, showingPageButtonNum, totalPageNum, selectedPage, handleClickPageButton, handleClickLeftButton, handleClickRightButton }: PaginationProps) => {
  const pageButtons = Array.from({ length: totalPageNum }, (_, index) => index + 1);

  let offset = 0;

  if (selectedPage % showingPageButtonNum === 0) {
    offset = (Math.floor(selectedPage / showingPageButtonNum) - 1) * showingPageButtonNum;
  } else {
    offset = Math.floor(selectedPage / showingPageButtonNum) * showingPageButtonNum;
  }

  const limit = offset + showingPageButtonNum;
  const isFirstPage = selectedPage === 1;
  const isLastPage = selectedPage === totalPageNum;
  // <Icon mode="left" size="xsmall" />
  return (
    <S.Containter className={className}>
      <S.Button disabled={isFirstPage} handleClick={handleClickLeftButton}>
        ◁
      </S.Button>
      <S.ItemContainer>
        {pageButtons.slice(offset, limit).map((num, index) => (
          <S.Item key={`pagination-${index}`}>
            <S.PageButton type="button" onClick={() => handleClickPageButton(num)} isSelected={selectedPage === num}>
              {num}
            </S.PageButton>
          </S.Item>
        ))}
      </S.ItemContainer>
      <S.Button disabled={isLastPage} handleClick={handleClickRightButton}>
        ▷
      </S.Button>
    </S.Containter>
  );
};
export default Pagination;

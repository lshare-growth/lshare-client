import styled, { css } from 'styled-components';

const moreRightModal = css`
  height: 50%;
  width: 52%;
  right: 0;
`;

const rightModal = css`
  height: 7%;
  /* width: 65%; */
  right: 0;
  position: fixed;
  top: 0;
  z-index: 200;
  margin: 0 16px 0 0;
`;

const middleModal = css`
  height: 100%;
  width: 100%;
  left: 0;
  text-align: center;
  ${({ theme }) => theme.mixins.flexBox({})}
  position: fixed;
  top: 0;
`;

const sizes = {
  middle: middleModal,
  right: rightModal,
  moreRight: moreRightModal,
};

export const Background = styled.div<{ position?: 'right' | 'middle' | 'moreRight' }>`
  ${({ position }) => position && sizes[position]};
  ${({ theme }) => theme.mixins.flexBox({})};
`;
/* ${({ position }) => position === 'right' && rightModal};
  ${({ position }) => position === 'moreRight' && moreRightModal};
  ${({ position }) => position === 'middle' && middleModal}; */
export const Content = styled.div`
  background: ${({ theme }) => theme.colors.modal};
  box-shadow: 1px 1px 1px 1px ${({ theme }) => theme.colors.line};
  border-radius: 4px;
`;

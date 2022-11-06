import styled from 'styled-components';
import IconCountBox from '@components/IconCountBox';
import Label from '@components/common/Label';
import CommentLabel from '@components/common/CommentLabel';
import LabelList from '@components/LabelList';
import CommentWrite from '@components/CommentWrite';
import Button from '@components/common/Button';
import Avatar from '@components/common/Avatar';
import Divider from '@components/common/Divider';

export const CustomIconCountBox = styled(IconCountBox)`
  margin: 0 auto;
`;

export const CustomLikeIconCountBox = styled(IconCountBox)`
  margin: 0 auto;
`;

export const CustomLabel = styled(Label)`
  margin: 0 16px 0 0;
`;

export const CustomCommentLabel = styled(CommentLabel)`
  margin: 0 16px 0 0;
`;

export const Day = styled.span`
  margin: 0 16px 0 0;
  color: ${({ theme }) => theme.colors.subTitle};
  font-size: 12.8px;
`;

export const Count = styled(IconCountBox)`
  margin: 0 16px 0 0;
`;

export const CustomLabelList = styled(LabelList)`
  margin: 0 0 16px 0;
`;

export const CustomCommentWrite = styled(CommentWrite)`
  margin: 32px 0;
`;

export const CustomButton = styled(Button)`
  :active:enabled {
    transform: none;
  }
`;

export const ControllButton = styled(Button)`
  margin: 0 0 0 8px;
`;

export const PopUp = styled.ul<{ isHovered: boolean }>`
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.line};
  position: absolute;
  border-radius: 4px;
  top: -64px;
  right: 8px;
  display: ${({ isHovered }) => (isHovered ? 'flex' : 'none')};
`;

export const EmojiItem = styled.li`
  margin: 0 0 0 8px;
`;

export const CustomAvatar = styled(Avatar)`
  margin: 0 8px 0 0;
`;

export const CommentCount = styled.span`
  margin: 16px 0;
`;

export const UserContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox({ justify: 'stretch' })};
`;
/* display: flex;
flex-direction: column;
height: 100%; */

export const ReplyContainer = styled.ul`
  margin: 32px 0 0 0;
`;

export const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 32px 0 32px 0;
`;

export const Content = styled.div`
  margin: 0 0 32px 0;
  line-height: 160%;
`;

export const FlexBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 16px 0;
`;

export const Title = styled.span`
  line-height: 160%;
  font-weight: bold;
  font-size: 16px;
`;

export const TitleContainer = styled.div`
  margin: 64px 0 16px 0;
`;

export const Container = styled.div`
  margin: 0 auto;
  width: 1000px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const CustomLikeButton = styled(Button)<{ isSelected: boolean }>`
  margin: 0 0 0 16px;
  filter: ${({ isSelected }) => isSelected && 'brightness(90%)'};
`;

export const DeleteButton = styled(Button)`
  margin: 0 0 0 16px;
`;

export const HorizontalDivider = styled(Divider)`
  margin: 16px 0;
`;

export const Flex = styled.div`
  margin: 64px 0 16px 0;
  ${({ theme }) => theme.mixins.flexBox({ justify: 'space-between', align: 'center' })}
`;

export const LoadingContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox({})};
  margin: 8px 0;
`;

export const CommentItem = styled.li`
  margin: 16px 0;
`;

export const OrganizerAvatar = styled(Avatar)`
  margin: 0 8px 0 0;
`;

export const ButtonContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox({})};
`;

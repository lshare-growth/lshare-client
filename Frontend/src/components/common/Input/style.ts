import styled from 'styled-components';
import Tag from '@common/Tag';

export const CustomTag = styled(Tag)`
  margin: 0 0 0 8px;
`;

export const Container = styled.div`
  ${({ theme }) => theme.mixins.flexBox({ justify: 'space-between' })}
`;

export const InputContainer = styled.div<{
  width: string;
  height: string;
  isFocused: boolean;
}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: 0 16px;
  ${({ theme }) => theme.mixins.flexBox({ justify: 'flex-start' })}
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 6px;
  border: 1px solid ${({ isFocused, theme }) => (isFocused ? theme.colors.accent.initial : theme.colors.default.border)};
  cursor: text;
  :focus-within {
    border: 1px solid ${({ theme }) => theme.colors.accent.initial};
  }
  overflow-y: auto;
  overflow-x: hidden;
  flex-wrap: wrap;
`;

export const DefaultInput = styled.input<{
  width: string;
  height: string;
}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: 0 16px;
  border: 1px solid ${({ theme }) => theme.colors.default.border};
  border-radius: 6px;
  outline: 0;
  :focus {
    border: 1px solid ${({ theme }) => theme.colors.accent.initial};
  }
`;

export const Input = styled.input`
  border: 0;
  height: 14px;
  margin: 0 0 0 8px;
  outline: 0;
`;

export const SearchForm = styled.form``;

export const SearchLabel = styled.label<{ hasLabel: boolean }>`
  margin: ${({ hasLabel }) => hasLabel && '0 0 16px 0'};
`;

export const TagsContainer = styled.ul`
  display: flex;
`;

export const Tags = styled.li``;

export const LabelContainer = styled.div`
  display: flex;
  vertical-align: center;
  margin: 0 8px 0 0;
`;

export const HighlightLabel = styled.h3`
  color: ${({ theme }) => theme.colors.accent.initial};
`;

export const LabelInputContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox({ justify: 'flex-start' })}
`;

export const CalendarInputContainer = styled.span`
  position: relative;
`;

export const CalendarInput = styled.input<{
  width: string;
  height: string;
}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: 0 16px;
  border: 1px solid ${({ theme }) => theme.colors.default.border};
  border-radius: 4px;
  outline: 0;
  :focus {
    border: 1px solid ${({ theme }) => theme.colors.accent.initial};
  }
`;

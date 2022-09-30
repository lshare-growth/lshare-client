import { ReactNode } from 'react';
import StyledArticle from './style';

type ArticleProps = {
  children: ReactNode;
  // eslint-disable-next-line react/require-default-props
  className?: string;
};

const Article = ({ className, children }: ArticleProps) => <StyledArticle className={className}>{children}</StyledArticle>;

export default Article;

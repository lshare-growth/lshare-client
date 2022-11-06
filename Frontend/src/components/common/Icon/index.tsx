// TODO: require-default-props eslint off
/* eslint-disable react/require-default-props */
import Alert from '@assets/icons/alert.svg';
import Calendar from '@assets/icons/calendar.svg';
import Comment from '@assets/icons/comment.svg';
import Down from '@assets/icons/down.svg';
import Edit from '@assets/icons/edit.svg';
import Emoji from '@assets/icons/emoji.svg';
import Home from '@assets/icons/home.svg';
import Back from '@assets/icons/back.svg';
import Left from '@assets/icons/left.svg';
import Moon from '@assets/icons/moon.svg';
import Right from '@assets/icons/right.svg';
import Sun from '@assets/icons/sun.svg';
import ThumbsUp from '@assets/icons/thumbsUp.svg';
import Up from '@assets/icons/up.svg';
import User from '@assets/icons/user.svg';
import Users from '@assets/icons/users.svg';
import Views from '@assets/icons/views.svg';
import Cancel from '@assets/icons/cancel.svg';
import Hash from '@assets/icons/hash.svg';
import Logo from '@assets/icons/logo.svg';
import Github from '@assets/icons/github.svg';
import TodoList from '@assets/icons/todoList.svg';
import Avatar from '@assets/icons/avatar.svg';
import Notification from '@assets/icons/notification.svg';
import Delete from '@assets/icons/delete.svg';
import Check from '@assets/icons/check.svg';
import District from '@assets/icons/district.svg';
import Link from '@assets/icons/link.svg';
import GithubUrl from '@assets/icons/githubUrl.svg';
import theme from '@style/theme';
import { VscBellDot, VscBell, VscHome } from 'react-icons/vsc';

type iconsKeyType =
  | 'alert'
  | 'calendar'
  | 'comment'
  | 'down'
  | 'edit'
  | 'emoji'
  | 'home'
  | 'back'
  | 'left'
  | 'moon'
  | 'right'
  | 'sun'
  | 'thumbsUp'
  | 'up'
  | 'user'
  | 'users'
  | 'views'
  | 'cancel'
  | 'hash'
  | 'logo'
  | 'github'
  | 'todoList'
  | 'avatar'
  | 'notification'
  | 'delete'
  | 'check'
  | 'unReadAlert'
  | 'readAlert'
  | 'district'
  | 'link'
  | 'githubUrl';

type IconsType = Record<iconsKeyType, any>;

const icons: IconsType = {
  alert: Alert,
  calendar: Calendar,
  comment: Comment,
  down: Down,
  edit: Edit,
  emoji: Emoji,
  home: VscHome,
  back: Back,
  left: Left,
  moon: Moon,
  right: Right,
  sun: Sun,
  thumbsUp: ThumbsUp,
  up: Up,
  user: User,
  users: Users,
  views: Views,
  cancel: Cancel,
  hash: Hash,
  logo: Logo,
  github: Github,
  todoList: TodoList,
  avatar: Avatar,
  notification: Notification,
  delete: Delete,
  check: Check,
  unReadAlert: VscBellDot,
  readAlert: VscBell,
  district: District,
  link: Link,
  githubUrl: GithubUrl,
};

type IconProps = {
  mode: iconsKeyType;
  color?: string;
  className?: string;
  // eslint-disable-next-line react/no-unused-prop-types
  handleClick?: () => void;
};

type colorType = Record<string, any>;

const colors: colorType = {
  default: theme.colors.title,
  accent: theme.colors.accent.initial,
  disabled: theme.colors.default.disabled,
  subTitle: theme.colors.subTitle,
};

const Icon = ({ mode, color = 'default', className, handleClick }: IconProps) => {
  const TargetIcon = icons[mode];
  const stroke = colors[color] || color;
  const size = (mode === 'unReadAlert' || mode === 'readAlert' || mode === 'home') && '18';

  return <TargetIcon stroke={stroke} color={stroke} size={size} className={className} onClick={handleClick} />;
  // return <TargetIcon stroke={stroke} color={stroke} className={className} onClick={handleClick} />;
};

export default Icon;

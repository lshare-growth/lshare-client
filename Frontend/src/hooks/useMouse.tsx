import { useState } from 'react';

type UseMouseType = {
  isMouseOvered: boolean;
  isActive: boolean;
  isClicked: boolean;
  handleMouseOver: () => void;
  handleMouseOut: () => void;
  handleMouseDown: () => void;
  handleMouseUp: () => void;
  handleClick: () => void;
  resetClick: () => void;
};

const useMouse = (inintialState = false): UseMouseType => {
  const [isMouseOvered, setIsMouseOvered] = useState(inintialState);
  const [isActive, setIsActive] = useState(inintialState);
  const [isClicked, setIsClicked] = useState(inintialState);

  const handleMouseOver = () => {
    setIsMouseOvered(true);
  };

  const handleMouseOut = () => {
    setIsMouseOvered(false);
  };

  const handleMouseDown = () => {
    setIsMouseOvered(false);
    setIsActive(true);
  };

  const handleMouseUp = () => {
    setIsMouseOvered(false);
    setIsActive(false);
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const resetClick = () => {
    setIsClicked(false);
  };

  return {
    isMouseOvered,
    isActive,
    isClicked,
    handleMouseOver,
    handleMouseOut,
    handleMouseDown,
    handleMouseUp,
    handleClick,
    resetClick,
  };
};

export default useMouse;

const SwitchButton = ({ isAnd, setIsAnd, isDisabled = false }) => {
  const handleClick = (value) => {
    if (!isDisabled) setIsAnd(value);
  };

  const commonStyle = isDisabled ? { cursor: "not-allowed" } : {};

  return (
    <>
      <p
        className={isAnd ? "active" : ""}
        onClick={() => handleClick(true)}
        style={commonStyle}
      >
        All
      </p>
      <div className="mx-1"></div>
      <p
        className={!isAnd ? "active" : ""}
        onClick={() => handleClick(false)}
        style={commonStyle}
      >
        Any
      </p>
    </>
  );
};

export default SwitchButton;

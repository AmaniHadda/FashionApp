
import "./input.css";
const Input = ({
  icon,
  handleClick,
  type,
  name,
  handleChangeInput,
  defaultValue,
  disabled,
  
}) => {
  return (
    <div className="input">
      <label>
        <div className="input_icon" onClick={handleClick}>
          {" "}
          {icon}{" "}
        </div>
        <input
          type={type}
          name={name}
          onChange={handleChangeInput}
          defaultValue={defaultValue}
          disabled={disabled}
          placeholder="Mot de passe"
          autoComplete="off"
        />
        
      </label>
    </div>
  );
};

export default Input;

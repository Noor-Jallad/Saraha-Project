import React from "react";

const CustomInput = ({text,type,name,onChange,error}) => {
  return (
    <>
      <input
        className="form-control mt-4"
        placeholder={text}
        type={type}
        name={name}
        onChange={onChange}
      />
      {error && (
        <div class="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </>
  );
};

export default CustomInput;

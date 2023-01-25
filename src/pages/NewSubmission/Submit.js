const Submit = ({ validate }) => {
  return (
    <input
      id="new-submission"
      onChange={() => null}
      onClick={() => {
        validate();
        window.scrollTo(0, 0);
      }}
      name="submit"
      type="submit"
      value="Submit"
      className="pink-button form-button"
    />
  );
};

export default Submit;

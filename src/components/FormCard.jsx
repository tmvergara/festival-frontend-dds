const FormCard = ({ children, title }) => {
  return (
    <div className="mt-10">
      <div className="card w-full bg-base-100 shadow-xl mb-14">
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormCard;

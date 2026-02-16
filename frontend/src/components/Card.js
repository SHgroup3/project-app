const Card = ({ children, title, badgeText, badgeColor = "bg-green-400" }) => {
  return (
    <div className="bg-white rounded-[30px] shadow-lg overflow-hidden border border-blue-100 h-full">
      <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
        <span className="font-bold text-sm">{title}</span>
        {badgeText && (
          <span className={`${badgeColor} text-[10px] px-2 py-1 rounded-full uppercase font-bold text-white`}>
            {badgeText}
          </span>
        )}
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;
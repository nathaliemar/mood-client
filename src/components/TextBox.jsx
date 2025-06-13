function TextBox({ title, text }) {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6 max-w-md mx-auto flex flex-col items-center text-center">
      <div className="font-bold text-lg mb-2">
        <span role="img" aria-label="lightbulb" className="mr-2">
          💡
        </span>
        {title}
      </div>
      <div className="text-gray-700 text-base">{text}</div>
    </div>
  );
}

export { TextBox };

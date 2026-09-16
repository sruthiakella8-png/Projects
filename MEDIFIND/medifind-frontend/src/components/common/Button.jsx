function Button({ text, type = 'submit', loading, onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
    >
      {loading ? 'Please wait...' : text}
    </button>
  );
}

export default Button;
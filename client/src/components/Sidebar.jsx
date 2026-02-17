const Sidebar = () => {
  return (
    <div className="w-72 bg-gray-900 text-white p-4 hidden md:block">
      <h2 className="text-xl font-semibold mb-4">Chats</h2>

      <div className="space-y-3">
        <div className="p-3 rounded-lg bg-gray-800 hover:bg-gray-700 cursor-pointer">
          Abhinav
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
const Sidebar = () => {
  return (
    <div className="w-72 bg-white border-r hidden md:flex flex-col">
      <div className="h-16 flex items-center px-6 border-b shadow-sm">
        <h2 className="text-lg font-semibold">Chats</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-100 hover:bg-gray-200 cursor-pointer transition">
          <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
            A
          </div>
          <div>
            <p className="font-medium">Test User</p>
            <p className="text-xs text-gray-400">Last message preview</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

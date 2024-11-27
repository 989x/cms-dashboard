export default function Navbar() {
    const user = { name: "Admin", status: "Online" }; // ตัวอย่างข้อมูลผู้ใช้ (Mock Data)
  
    return (
      <nav className="w-full py-4 px-8 shadow">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <h1 className="text-lg font-bold">CMS Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm">Status: {user.status}</span>
            <span className="text-sm font-semibold">{user.name}</span>
          </div>
        </div>
      </nav>
    );
  }
  
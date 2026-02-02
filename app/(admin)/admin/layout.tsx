import Sidebar from '@/components/admin/sidebar'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gray-100">
            <Sidebar />
            <div className="pl-64">
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}

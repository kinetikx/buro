import { FileText, Eye, MessageSquare, CheckCircle } from 'lucide-react'

// Mock Stats
const stats = [
    { name: 'Toplam Yazı', value: '12', icon: FileText, change: '+2 bu ay', color: 'bg-blue-500' },
    { name: 'Yayında', value: '8', icon: CheckCircle, change: 'Aktif', color: 'bg-green-500' },
    { name: 'Görüntülenme', value: '24.5k', icon: Eye, change: '+%18', color: 'bg-purple-500' },
    { name: 'Yeni Mesaj', value: '3', icon: MessageSquare, change: '1 saat önce', color: 'bg-orange-500' },
]

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-navy-900">Dashboard</h1>
                <p className="text-gray-500">Hoşgeldiniz, Av. Kürşat Komlu</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                                <p className="text-3xl font-bold text-navy-900 mt-1">{stat.value}</p>
                            </div>
                            <div className={`w-12 h-12 rounded-lg ${stat.color} bg-opacity-10 flex items-center justify-center text-${stat.color.replace('bg-', '')}`}>
                                <stat.icon className={`w-6 h-6 text-${stat.color.replace('bg-', '')}`} />
                            </div>
                        </div>
                        <div className="mt-4 text-sm text-gray-500">
                            <span className="text-green-600 font-medium">{stat.change}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Recent Posts */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-lg mb-4">Son Yazılar</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4 py-2 border-b last:border-0 border-gray-50">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg shrink-0" />
                                <div>
                                    <div className="font-medium text-navy-900">Erzurum'da Boşanma Davası {i}</div>
                                    <div className="text-xs text-gray-500">12 Ekim 2025 • Aile Hukuku</div>
                                </div>
                                <div className="ml-auto text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded">
                                    Yayında
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Messages */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-lg mb-4">Son Mesajlar</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex gap-4 py-2 border-b last:border-0 border-gray-50">
                                <div className="w-10 h-10 bg-navy-100 rounded-full flex items-center justify-center text-navy-700 font-bold shrink-0">
                                    AK
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-navy-900">Ahmet K.</span>
                                        <span className="text-xs text-gray-400">2 saat önce</span>
                                    </div>
                                    <div className="text-sm text-gray-600 line-clamp-1">
                                        Boşanma davası hakkında görüşmek istiyordum...
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

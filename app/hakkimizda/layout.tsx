import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Hakkımızda | Komlu Hukuk Bürosu',
    description: 'Deneyimli avukat kadromuzla hukuki sorunlarınıza profesyonel çözümler sunuyoruz.',
}

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}

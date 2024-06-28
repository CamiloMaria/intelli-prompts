import Nav from '@lib/components/Nav'
import '@lib/styles/globals.css'

export const metadata = {
    title: 'IntelliPrompt',
    description: 'Discover & Share AI Prompt Ideas',
}

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    return (
        <html lang='en'>
            <body>
                <div className='main'>
                    <div className='gradient' />
                </div>

                <main className='app'>
                    <Nav />
                    {children}
                </main>
            </body>
        </html>
    )
}

export default RootLayout
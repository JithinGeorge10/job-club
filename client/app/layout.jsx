import '@/assets/styles/globals.css'

function layout({ children }) {
    return (
        <html lang='en'>
            <body>
                <div>
                    {children}
                </div>
            </body>
        </html>

    )
}

export default layout

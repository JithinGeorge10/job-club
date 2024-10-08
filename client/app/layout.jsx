import '@/assets/styles/globals.css'
export const metadata = {
    title: "_Job Club. | Job search India",
    description: "Find best jobs",
};
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

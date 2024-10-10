
import '@/assets/styles/globals.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const metadata = {
    title: "_Job Club. | Job search India",
    description: "Find best jobs",
};
function layout({ children }) {
    return (
        <html lang='en'>
            <body>
                <div>
                <ToastContainer 
                position="top-center"
                
                />
                    {children}
                </div>
            </body>
        </html>

    )
}

export default layout

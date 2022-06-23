import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children } : {children:any})  {
    return <>
        <div className="">
            <Navbar />
            <main className="flex w-full min-h-screen flex-1 flex-col items-center justify-center px-3 md:px-20 text-center">
                {children}
            </main>
            <Footer />
        </div>
    </>
}
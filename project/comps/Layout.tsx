import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children } : {children:any})  {
    return <>
        <div className="">
            <Navbar />
            <main className="flex w-full min-h-screen flex-1 flex-col items-center justify-center px-3 md:px-20 pb-14 md:pb-16 lg:pb-28 text-center">
                {children}
            </main>
            <Footer />
        </div>
    </>
}
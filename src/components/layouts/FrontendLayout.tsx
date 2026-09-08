import Footer from "../general/Footer";

export default function FrontendLayout ({children} : {children : React.ReactNode}) { 
    return ( 
       <>
       {children}
       <Footer />
       </>
    )
}
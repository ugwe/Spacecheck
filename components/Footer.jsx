const Footer = () => {
    const currentYear = new Date().getFullYear();


    return ( 
        <footer className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm text-gray-600">
                    &copy; {currentYear} Space Check. Take a Tour.
                </p>
            </div>
        </footer> 
      );
};
 
export default Footer;
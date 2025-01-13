'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/images/sc_logo.svg';
import {FaSearchLocation, FaUserPlus, FaUser, FaBuilding, FaSignInAlt, FaSignOutAlt, FaDoorOpen, FaDoorClosed} from 'react-icons/fa';
import { toast } from 'react-toastify';
import destroySession from '@/app/actions/destroySession';
import { useAuth } from '@/context/authContext';

const Header = () => {

    const router = useRouter();

    const { isAuthenticated, setIsAuthenticated } = useAuth();
    

    const handleLogout = async () => {
      const { success, error } = await destroySession();
      if (success) {
        setIsAuthenticated(false);
        router.push('/login');
      } else {
        toast.error(error);
      }
    }

    return (
        <header className="bg-gray-300">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <Image className="h-12 w-12" src={logo} alt="SpaceCheck Logo" 
              priority={true}
              />
              
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-red-950 hover:text-white hover:font-bold">

                  Spaces

                </Link>


                {/* <!-- Logged In Only --> */}

                { isAuthenticated && (

                  <> 
                      <Link href="/bookings"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-red-950 hover:text-white hover:font-bold">
                      
                      Reservations

                      </Link>
                      <Link href="/spaces/add"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-red-950 hover:text-white hover:font-bold">

                      Add Space

                      </Link>
                  </>
                )}


              </div>
            </div>
          </div>


          {/* <!-- Right Side Menu --> */}
          <div className="ml-auto">
            <div className="ml-4 flex items-center md:ml-6">

              {/* <!-- Logged Out Only --> */}

              { !isAuthenticated && (
                
                <>
                    <Link href="/login"
                    className="text-gray-950 hover:text-gray-50 border border-red-950 hover:bg-red-950 hover:font-bold hover:text-white px-4 py-1 rounded w-full sm:w-auto text-center">

                    <FaDoorOpen className='inline mr-1' /> Login
                    </Link>
                    <Link href="/register"
                      className="ml-4 text-gray-950 hover:text-gray-50 border border-red-950 hover:bg-red-950 hover:font-bold hover:text-white px-2 py-1 rounded w-full sm:w-auto text-center">

                    <FaUserPlus className='inline mr-1' /> Register
                    </Link>
                
                </>

              )}





              { isAuthenticated && (

                <>
                  <Link href="/spaces/my"
                  className="text-gray-950 hover:text-gray-50 border border-red-950 hover:bg-red-950 hover:font-bold hover:text-white px-2 py-1 rounded w-full sm:w-auto text-center">
                  <FaSearchLocation className='inline mr-1' /> My Spaces
                  </Link>
                
                  <button onClick={handleLogout} className="ml-4 text-gray-950 hover:text-gray-50 border border-red-950 hover:bg-red-950 hover:font-bold hover:text-white px-4 py-1 rounded w-full sm:w-auto text-center">
                  <FaDoorClosed className='inline mr-1' /> Sign Out
                  </button>
                </>

              )}

              
              
            </div>
          </div>
        </div>
      </nav>

      {/* <!-- Mobile menu --> */}
      <div className="md:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          <Link
            href="/"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white hover:bg-red-950 hover:text-white hover:font-bold">
            
            Spaces

          </Link>
          {/* <!-- Logged In Only --> */}
          <Link
            href="/bookings"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white hover:bg-red-950 hover:text-white hover:font-bold">
            
            Reservations

          </Link>
          <Link href="/spaces/add"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white hover:bg-red-950 hover:text-white hover:font-bold">
            
            Add Space
            
          </Link>
        </div>
      </div>
    </header>

    );
};
 
export default Header;
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { GameCard } from '@/components/GameCard';
import { LiveStream } from '@/components/LiveStream';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FiCopy } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from "./UserContext";
import { fetchUserData, getReferrals } from '@/lib/apiCalls';
import { formatPeso } from '@/lib/utils';

interface SidebarProps {
  onLogout?: () => void;
}
export function Dashboard({ onLogout }: SidebarProps) {
  const navigate = useNavigate();
  const { setUserID,userID } = useUser();
  console.log(userID);
  const [balance, setBalance] = useState(0);
  const [mobile, setMobile] = useState("");
  const [referral, setReferral] = useState("");
  const [status,setStatus] = useState("");
  const [showAccountModal, setShowAccountModal] = useState(false);

  useEffect(() => {
    if (userID) {
      const handleUpdate = async () => {
        const data = await fetchUserData(userID);
        setBalance(data.balance);
        setMobile(data.mobile);
        setReferral(data.referral);
        setStatus(data.status);
        console.log(data.mobile);
      };
      handleUpdate();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const popularGames = [
    { id: 1, name: "2D", type: "Lotto", minBet: 20, maxBet: 5000, image: "/img/2d.jpeg" },
    { id: 2, name: "3D", type: "Lotto", minBet: 20, maxBet: 5000, image: "/img/3D.jpeg" },
    { id: 3, name: "STL 3D", type: "Lotto", minBet: 20, maxBet: 5000, image: "/img/3D.jpeg" },
    { id: 4, name: "4D", type: "Lotto", minBet: 20, maxBet: 5000, image: "/img/4D.png" },
  ];
  
  const newGames = [
    { id: 5, name: "Pick 3 & first 2", type: "Lotto", minBet: 5, maxBet: 300, image: "/img/pick3first2.jpeg" },
    ];
  
  const liveStreams = [
    { id: 1, title: "[LIVE] PCSO 2:00 PM Lotto Draw",live: true, viewers: 1243, streamer: "[Live] PCSO Lotto Draw", image: "https://www.youtube.com/embed/pO0BDYTq7zw?si=22s1k5ePuyKvgsy5" },
    { id: 2, title: "PCSO 2:00 PM Lotto Draw - September 17, 2024",live:false, viewers: 876, streamer: "PCSO Lotto Draw - September 17, 2024", image: "https://www.youtube.com/embed/-V27j5M_GNM?si=gZY1bCopPs6xKCMa" },
  ];
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    Home
                  </Link>
                  <Link to="#" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                    My Bets
                  </Link>
                  <Link to="#" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    Help & Support
                  </Link>
                  <Link to="#" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Profile
                  </Link>
                  <Button onClick={onLogout}  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    Logout
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
            
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="none">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
              <span className="ml-2 font-bold text-gray-800 hidden sm:inline">Numero Games</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className="text-blue-600 font-medium">Home</Link>
            <Link to="#" className="text-gray-600 hover:text-gray-900">My Bets</Link>
            <Link to="#" className="text-gray-600 hover:text-gray-900">Live</Link>
            <Link to="#" className="text-gray-600 hover:text-gray-900">Support</Link>
            <Link onClick={onLogout} className="text-gray-600 hover:text-gray-900" to={''}>Logout</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 px-3 py-1 rounded-full text-green-700 font-medium hidden sm:block">
              {formatPeso(balance)}
            </div>
            
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <button className="focus:outline-none">
                  <Avatar className="cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all">
                    <AvatarImage src="https://picsum.photos/id/823/100/100" />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center p-2">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="https://picsum.photos/id/823/100/100" />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                  <div>
                  <p className="text-sm font-medium">
                    {mobile}
                  </p>

                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={() => setShowAccountModal(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>My Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  <span>Security</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span>Transaction History</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  <Link onClick={onLogout} to={''}>Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Account Management Modal */}
        {showAccountModal && (
        <AccountManagementModal onClose={() => setShowAccountModal(false)} />
      )}
      
      <main className="container mx-auto px-4 py-6">
        {/* Balance Card (Mobile) */}
        <div className="md:hidden mb-6">
          <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Your Balance</p>
              <p className="text-2xl font-bold text-gray-800">{formatPeso(balance)}</p>
            </div>
            <Button className="bg-green-500 hover:bg-green-600">Deposit</Button>
          </div>
        </div>
        
        {/* Live Streams */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Live Now</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {liveStreams.map(stream => (
              <LiveStream key={stream.id} stream={stream} />
            ))}
          </div>
        </section>
        
        {/* Games Tabs */}
        <Tabs defaultValue="popular" className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Games</h2>
            <TabsList>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="popular" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {popularGames.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="new" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {newGames.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="favorites" className="mt-0">
            <div className="text-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-400 mb-4">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-700 mb-2">No favorites yet</h3>
              <p className="text-gray-500 mb-4">Add games to your favorites to see them here</p>
              <Button variant="outline">Browse Games</Button>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Quick Access */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-gray-800">Quick Access</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 6v6l4 2"></path>
              </svg>
              <span>History</span>
            </Button>
            <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>Tournaments</span>
            </Button>
            <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Friends</span>
            </Button>
            <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
              <span>Favorites</span>
            </Button>
          </div>
        </section>
      </main>
      
      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <div className="flex justify-around items-center py-2">
          <Link to="/dashboard" className="flex flex-col items-center p-2 text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="#" className="flex flex-col items-center p-2 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <span className="text-xs mt-1">Explore</span>
          </Link>
          <Link to="#" className="flex flex-col items-center p-2 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
            <span className="text-xs mt-1">More</span>
          </Link>
          <Link to="#" className="flex flex-col items-center p-2 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Account Management Modal Component
function AccountManagementModal({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState('profile');
  const { setUserID,userID } = useUser();
  const [mobile, setMobile] = useState("");
  const [referral, setReferral] = useState("");
  const [status,setStatus] = useState("");
  const [level1, setLevel1] = useState(0);
  const [level2, setLevel2] = useState(0);

  const currentURL = window.location.origin; // Gets the base URL
  const referralLink = `${currentURL}/create-account/?ref=${btoa(userID)}`;
  useEffect(() => {
    if (userID) {
      const handleUpdate = async () => {
        const data = await fetchUserData(userID);
        setMobile(data.mobile);
        setReferral(data.referral);
        setStatus(data.status);
        console.log(data.mobile);

        const dataRef = await getReferrals(userID);
        setLevel1(dataRef.level1);
        setLevel2(dataRef.level2);
      };
      handleUpdate();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Link copied to clipboard!", { autoClose: 1500 });
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Account Management</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="flex border-b">
          <button 
            className={`flex-1 py-3 font-medium text-sm ${activeTab === 'profile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button 
            className={`flex-1 py-3 font-medium text-sm ${activeTab === 'security' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('security')}
          >
            Security
          </button>
          <button 
            className={`flex-1 py-3 font-medium text-sm ${activeTab === 'payment' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('payment')}
          >
            Payment
          </button>
        </div>
        
        <div className="p-4">
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="https://picsum.photos/id/823/100/100" />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                  </button>
                </div>
                <h3 className="font-bold mt-2">{mobile}</h3>
              </div>
              
              <div className="space-y-3">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Referral Link</label>
                    <div className="flex items-center">
                      <Input defaultValue={referralLink} disabled className="mr-2" />
                      <button 
                        onClick={handleCopy} 
                        className="p-2 hover:bg-gray-200"
                      >
                        <FiCopy />
                      </button>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">No. of Referred Lvl 1</label>
                    <div className="flex items-center">
                      <Input readOnly value={level1} disabled className="mr-2" />
                      
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">No. of Referred Lvl 2</label>
                    <div className="flex items-center">
                      <Input readOnly value={level2} disabled className="mr-2" />
                      
                    </div>
                </div>
              </div>
              <ToastContainer />
              {/* <Button className="w-full">Save Changes</Button> */}
            </div>
          )}
          
          {activeTab === 'security' && (
            <div className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <Input name='current_password' type="password" placeholder="••••••••" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <Input name='password' type="password" placeholder="••••••••" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <Input name='con_password' type="password" placeholder="••••••••" />
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                    <p className="text-xs text-gray-500">Currently: <span className="text-red-500">Disabled</span></p>
                  </div>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>
              </div>
              
              <Button className="w-full">Update Security Settings</Button>
            </div>
          )}
          
          {activeTab === 'payment' && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-medium mb-2">Payment Methods</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-white p-2 rounded border">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                          <line x1="1" y1="10" x2="23" y2="10"></line>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-sm">GCASH ending in 4242</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </Button>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Add Payment Method
                </Button>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-medium mb-2">Transaction History</h4>
                <div className="space-y-2">
                  {/* <div className="flex items-center justify-between bg-white p-2 rounded border">
                    <div>
                      <p className="font-medium text-sm">Deposit</p>
                      <p className="text-xs text-gray-500">May 15, 2023</p>
                    </div>
                    <p className="font-medium text-green-600">+$100.00</p>
                  </div>
                  <div className="flex items-center justify-between bg-white p-2 rounded border">
                    <div>
                      <p className="font-medium text-sm">Withdrawal</p>
                      <p className="text-xs text-gray-500">May 10, 2023</p>
                    </div>
                    <p className="font-medium text-red-600">-$50.00</p>
                  </div> */}
                </div>
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  View All Transactions
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};

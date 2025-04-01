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
import { cashIn, fetchUserData, getGames, getMyBetClientsCount, getReferrals } from '@/lib/apiCalls';
import { formatPeso } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarProps {
  onLogout?: () => void;
}
export function Dashboard({ onLogout }: SidebarProps) {
  const navigate = useNavigate();
  const { setUserID,userID } = useUser();
  console.log(userID);
  const [balance, setBalance] = useState(0);
  const [winnings, setWinnings] = useState(0);
  const [commissions, setCommissions] = useState(0);
  const [mobile, setMobile] = useState("");
  const [referral, setReferral] = useState("");
  const [status,setStatus] = useState("");
  const [agent,setAgent] = useState("");
  const [clients,setClients] = useState(0);
  const [showAccountModal, setShowAccountModal] = useState(false);
  // const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCashInDialog, setShowCashInDialog] = useState(false);
  const [transLimit, setTransLimit] = useState(5000);
  const [cashInAmount, setCashInAmount] = useState(0);
  const [popularGames, setPopularGames] = useState<any[]>([]);

  useEffect(() => {
    if (userID) {
      const handleUpdate = async () => {
        const data = await fetchUserData(userID);
        setBalance(data.balance);
        setWinnings(data.wins);
        setCommissions(data.commissions);
        setMobile(data.mobile);
        setReferral(data.referral);
        setStatus(data.status);
        setAgent(data.agent);

        const dataClients = await getMyBetClientsCount(userID);
        setClients(dataClients.countClients);

        const gamesData = await getGames();
        setPopularGames(gamesData);
      };
      handleUpdate();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleCashInClick = () => {
  //   setShowSuccessModal(true);
  // };

  // const handleCloseModal = () => {
  //   setShowSuccessModal(false);
  // };

  const handleCashIn = () => {
    setShowCashInDialog(false);
  };

  const handleCloseModal = async () => {
    const data = await fetchUserData(userID);
    setBalance(data.balance);
    setMobile(data.mobile);
    setReferral(data.referral);
    setStatus(data.status);
    console.log(data.mobile);
    setShowAccountModal(false);
  };

  const cashInSubmit =  async () => {
  
    console.log(userID);
    const formData = new FormData();
    formData.append("amount", cashInAmount.toString());
    formData.append('userID', userID);
    const dataRemit = await cashIn(formData);
    console.log(dataRemit.transID);
    setCashInAmount(0);
    const data = await fetchUserData(userID);
    setBalance(data.balance);
    setWinnings(data.wins);
    setCommissions(data.commissions);
    setMobile(data.mobile);
    setReferral(data.referral);
    setStatus(data.status);
    console.log(data.mobile);
    alert("Cash In successfully! Transaction ID: " + dataRemit.transID);
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  let value = parseFloat(e.target.value); // Convert to number, fallback to 0
  if (value > transLimit) value = transLimit; // Restrict maximum value
  setCashInAmount(value);
  
};


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
                  <Link to="/transactions" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <ellipse cx="12" cy="5" rx="8" ry="3"></ellipse>
                      <path d="M4 5v6a8 3 0 0 0 16 0V5"></path>
                      <path d="M4 11v6a8 3 0 0 0 16 0v-6"></path>
                    </svg>My Transactions
                  </Link>
                  <Link to="/my-bets" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <ellipse cx="12" cy="5" rx="8" ry="3"></ellipse>
                      <path d="M4 5v6a8 3 0 0 0 16 0V5"></path>
                      <path d="M4 11v6a8 3 0 0 0 16 0v-6"></path>
                    </svg>My Bets
                  </Link>
                  <Link to="/drawhistory" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                      <path d="M4 22h16"></path>
                      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                    </svg>
                    Draws
                  </Link>
                  {/* <Link to="/support" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    Help & Support
                  </Link> */}
                  <a
                    href="https://tawk.to/chat/67ec009ce808511907a28002/1inou4plh"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    Support
                  </a>
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
              <span className="ml-2 font-bold text-gray-800 hidden sm:inline">PisoPlay</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className="text-blue-600 font-medium">Home</Link>
            <Link to="/transactions" className="text-gray-600 hover:text-gray-900">My Transactions</Link>
            <Link to="/my-bets" className="text-gray-600 hover:text-gray-900">My Bets</Link>
            <Link to="/drawhistory" className="text-gray-600 hover:text-gray-900">Draws</Link>
            {/* <Link to="/support" className="text-gray-600 hover:text-gray-900">Support</Link> */}
            <a
  href="https://tawk.to/chat/67ec009ce808511907a28002/1inou4plh"
  className="text-gray-600 hover:text-gray-900"
  target="_blank"
  rel="noopener noreferrer"
>
  Support
</a>
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
                  <ellipse cx="12" cy="5" rx="8" ry="3"></ellipse>
                  <path d="M4 5v6a8 3 0 0 0 16 0V5"></path>
                  <path d="M4 11v6a8 3 0 0 0 16 0v-6"></path>
                  </svg>
                  <span>My Bets</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/drawhistory')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                    <path d="M4 22h16"></path>
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                  </svg>
                  <span>Draws</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={() => window.open('https://tawk.to/chat/67ec009ce808511907a28002/1inou4plh', '_blank', 'noopener,noreferrer')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 17h.01"></path>
                  <path d="M12 13a3 3 0 1 0-3-3"></path>
                  </svg>
                  <span>Support</span>
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
        <AccountManagementModal onClose={handleCloseModal} />
      )}
      
      <main className="container mx-auto px-4 py-6">
        {/* Balance Card (Mobile) */}
        <div >
          <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Your Balance</p>
              <p className="text-2xl font-bold text-gray-800">{formatPeso(balance)}</p>
            </div>
            <Button className="bg-green-500 hover:bg-green-600" onClick={() => setShowCashInDialog(true)}>Cash In</Button>
          </div>
          <br/>
          <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Your Winnings and Commissions</p>
              <p className="text-2xl font-bold text-gray-800">{formatPeso(winnings + commissions)}</p>
            </div>
            <Button className="bg-green-500 hover:bg-green-600" disabled>Cash Out</Button>
          </div>

          {agent==="yes" && (
              <>
              <br/>
              <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">Betting Clients</p>
                  <p className="text-2xl font-bold text-gray-800">{clients}</p>
                </div>
                <Button className="bg-green-500 hover:bg-green-600" >Manage</Button>
              </div>
              </>
            )
          }
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
             {/*  <TabsTrigger value="new">New</TabsTrigger> */}
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
          
          {/* <TabsContent value="new" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {newGames.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </TabsContent> */}
          
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

              {/* Cash In Dialog */}
      <Dialog open={showCashInDialog} onOpenChange={setShowCashInDialog}>
        <DialogContent className="bg-gray-200 border-[#34495e]">
          <DialogHeader>
            <DialogTitle className="text-xl text-blue-600">Cash In</DialogTitle>
            <DialogDescription className="text-black-300">
              Add more coins to your balance to continue playing.
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-medium mb-2">Add Funds</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-white p-2 rounded border">
                    <div className="flex items-center">
                      <div>
                        <input
                        value={cashInAmount} 
                        onChange={handleChange}
                        type="number" 
                        className="border rounded p-1 text-sm w-full" 
                        placeholder="Enter amount" 
                        style={{ appearance: 'textfield' }}/>
                        <style>{`
                          input[type=number]::-webkit-outer-spin-button,
                          input[type=number]::-webkit-inner-spin-button {
                            -webkit-appearance: none;
                            margin: 0;
                          }
                          input[type=number] {
                            -moz-appearance: textfield;
                          }
                        `}</style>
                        {agent === "yes" && (
                          <>
                          <p className="text-sm text-blue-600">You have 20% off based on commission</p>
                          <p style={{color: 'blue'}} className="font-small mb-2">You will pay only : {formatPeso(cashInAmount - (cashInAmount * 0.2))}</p>
                          </>
                        )}
                      </div>
                    </div>
                    <Button 
                    disabled={!cashInAmount} 
                    type="button"
                     variant="outline" 
                     size="sm"
                     onClick={cashInSubmit}  
                    className="text-blue-500 bg-blue-100 hover:text-blue-700 hover:bg-green-50 rounded px-4 py-2">
                      <label>Cash In</label>
                    </Button>
                  </div>
                </div>
              </div>
          
          <DialogFooter className="flex flex-col gap-2 sm:flex-row">
            <Button 
              variant="outline" 
              onClick={() => setShowCashInDialog(false)}
              className="w-full sm:w-auto border-blue-500 text-blue-600 hover:bg-blue-900/20"
            >
              Cancel
            </Button>

          </DialogFooter>
        </DialogContent>
      </Dialog>
        
        {/* Quick Access */}
        {/* <section>
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
              <span>Game Results</span>
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
        </section> */}



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
            <Link to="/my-bets" className="flex flex-col items-center p-2 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="8" ry="3"></ellipse>
                <path d="M4 5v6a8 3 0 0 0 16 0V5"></path>
                <path d="M4 11v6a8 3 0 0 0 16 0v-6"></path>
              </svg>
              <span className="text-xs mt-1">My Bets</span>
            </Link>
            <Link to="/drawhistory" className="flex flex-col items-center p-2 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                <path d="M4 22h16"></path>
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
              </svg>
              <span className="text-xs mt-1">Draws</span>
            </Link>
            <Link to="#" className="flex flex-col items-center p-2 text-gray-500" onClick={() => window.open('https://tawk.to/chat/67ec009ce808511907a28002/1inou4plh', '_blank', 'noopener,noreferrer')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 17h.01"></path>
              <path d="M12 13a3 3 0 1 0-3-3"></path>
              </svg>
              <span className="text-xs mt-1">Support</span>
            </Link>
          </div>
        </div>

      
      {/* Success Modal */}
      {/* <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-green-600 flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5" />
              Cash In Successfully
            </DialogTitle>
            <DialogDescription>
              Your Cash In has been processed successfully.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-500">Amount:</div>
                <div className="font-medium">${balance}</div>
                <div className="text-gray-500">Transaction ID:</div>
                <div className="font-medium">{Math.random().toString(36).substring(2, 10).toUpperCase()}</div>
                <div className="text-gray-500">Date:</div>
                <div className="font-medium">{new Date().toLocaleString()}</div>
                <div className="text-gray-500">Status:</div>
                <div className="font-medium text-green-600">Processing</div>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Your Cash In request is being processed.
            </p>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleCloseModal}>
              Back to Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}

      
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
  const [level3, setLevel3] = useState(0);
  const [transLimit, setTransLimit] = useState(5000);
  const [cashInAmount, setCashInAmount] = useState(0);

  const currentURL = window.location.origin; // Gets the base URL
  const randomKey = Math.random().toString(36).substring(2, 23); // 21-character random key
  const encodedParams = btoa(`ref=${userID}&key=${randomKey}`); // Encode full params

  const referralLink = `${currentURL}/create-account?data=${encodedParams}`;
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
        setLevel3(dataRef.level3);
      };
      handleUpdate();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Link copied to clipboard!", { autoClose: 1500 });
  };


  const cashInSubmit =  async () => {
  
    console.log(userID);
    const formData = new FormData();
    formData.append("amount", cashInAmount.toString());
    formData.append('userID', userID);
    const dataRemit = await cashIn(formData);
    console.log(dataRemit.transID);
    setCashInAmount(0);
    alert("Cash In successfully! Transaction ID: " + dataRemit.transID);
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  let value = parseFloat(e.target.value); // Convert to number, fallback to 0
  if (value > transLimit) value = transLimit; // Restrict maximum value
  setCashInAmount(value);
  
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
          {/* <button 
            className={`flex-1 py-3 font-medium text-sm ${activeTab === 'payment' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('payment')}
          >
            Payment
          </button> */}
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">No. of Referred Lvl 1 (3% Rewards)</label>
                    <div className="flex items-center">
                      <Input readOnly value={level1} disabled className="mr-2" />
                      
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">No. of Referred Lvl 2 (2% Rewards)</label>
                    <div className="flex items-center">
                      <Input readOnly value={level2} disabled className="mr-2" />
                      
                    </div>
                </div>
                {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">No. of Referred Lvl 3 (2% Rewards)</label>
                    <div className="flex items-center">
                      <Input readOnly value={level3} disabled className="mr-2" />
                      
                    </div>
                </div> */}
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
                <h4 className="font-medium mb-2">Add Funds</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-white p-2 rounded border">
                    <div className="flex items-center">
                      <div>
                        <input 
                        type="number" 
                        value={cashInAmount} 
                        onChange={handleChange}
                        className="border rounded p-1 text-sm w-full" 
                        placeholder="Enter amount" 
                        style={{ appearance: 'textfield' }}/>
                        <style>{`
                          input[type=number]::-webkit-outer-spin-button,
                          input[type=number]::-webkit-inner-spin-button {
                            -webkit-appearance: none;
                            margin: 0;
                          }
                          input[type=number] {
                            -moz-appearance: textfield;
                          }
                        `}</style>
                      </div>
                    </div>
                    
                    <Button 
                    disabled={!cashInAmount} 
                    type="button"
                     variant="outline" 
                     size="sm"
                     onClick={cashInSubmit} 
                     className="text-blue-500 bg-blue-100 hover:text-blue-700 hover:bg-green-50 rounded px-4 py-2">
                      <label>Cash In</label>
                    </Button>
                  </div>
                </div>
              </div>


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
                {/* <Button variant="outline" size="sm" className="mt-2 w-full" >
                  View All Transactions
                </Button> */}
                <Link
                  to="/transactions"
                  className="inline-block w-full px-4 py-2 text-black font-semibold bg-white-300 hover:bg-gray-200 rounded shadow text-center">
                  Transactions
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};

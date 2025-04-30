import React, { useEffect, useRef, useState } from 'react';
import { getBetsWinners } from '@/lib/apiCalls'; // replace with your actual fetch
import { formatPeso } from '@/lib/utils';

const AutoScrollWinnersCarousel = () => {
  const [winners, setWinners] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchWinners = async () => {
      const data = await getBetsWinners();
      setWinners(data || []);
    };
    fetchWinners();
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || winners.length === 0) return;

    let scrollAmount = 0;
    const scrollStep = 1;
    const scrollInterval = 30;

    const scroll = () => {
      if (!container) return;

      scrollAmount += scrollStep;
      container.scrollLeft += scrollStep;

      // When we've scrolled past the original list
      if (scrollAmount >= container.scrollWidth / 2) {
        container.style.scrollBehavior = 'auto'; // disable animation for reset
        container.scrollLeft = 0;
        scrollAmount = 0;
        container.style.scrollBehavior = 'smooth'; // re-enable smooth scrolling
      }
    };

    const interval = setInterval(scroll, scrollInterval);
    return () => clearInterval(interval);
  }, [winners]);

  return (
    <div className="overflow-hidden bg-blue-50 py-3">
      <div
        ref={scrollRef}
        className="flex gap-4 whitespace-nowrap overflow-x-scroll scroll-smooth scrollbar-hide"
      >
        {[...winners, ...winners].map((winner, index) => (
          <div
            key={index}
            className="min-w-[250px] bg-white rounded-xl shadow p-4 flex-shrink-0 text-center"
          >
            <p className="text-sm text-gray-500">{winner.game_name}</p>
            <p className="text-xs text-gray-400">{winner.draw_date}<br/>{winner.draw_time}</p>
            <p className="font-bold text-lg">{winner.bets}</p>
            <p className="text-sm text-gray-500">Winner : {winner.user_mobile}</p>
            <p className="text-green-600 font-semibold mt-1">{formatPeso(winner.jackpot)}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoScrollWinnersCarousel;

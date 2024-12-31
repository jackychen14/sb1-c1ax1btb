import React from 'react';
import { RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useMatch } from '../../context/MatchContext';
import { mockToys } from '../../data/mockToys';

export function ExchangedItems() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { matches } = useMatch();

  const completedExchanges = matches
    .filter(match => 
      match.status === 'completed' && 
      (match.userId === user?.id || match.matchedUserId === user?.id)
    )
    .map(match => {
      const userToy = mockToys.find(toy => 
        toy.id === (match.userId === user?.id ? match.toyId : match.matchedToyId)
      );
      const otherToy = mockToys.find(toy => 
        toy.id === (match.userId === user?.id ? match.matchedToyId : match.toyId)
      );
      return { match, userToy, otherToy };
    })
    .filter(exchange => exchange.userToy && exchange.otherToy);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <RefreshCw className="text-green-500" size={20} />
        {t('profile.exchanges.title')}
      </h2>
      
      <div className="space-y-4">
        {completedExchanges.length === 0 ? (
          <div className="text-center text-gray-500 py-6">
            <p>{t('profile.exchanges.empty')}</p>
          </div>
        ) : (
          completedExchanges.map(({ match, userToy, otherToy }) => (
            <div key={match.id} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">
                  {new Date(match.completedAt || '').toLocaleDateString()}
                </span>
                <span className="text-sm text-green-500 font-medium">
                  Completed
                </span>
              </div>
              
              <div className="flex gap-3 items-center">
                <div className="flex-1">
                  <img
                    src={userToy?.images[0].url}
                    alt={userToy?.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <p className="text-sm font-medium mt-1">{userToy?.name}</p>
                  <p className="text-xs text-gray-500">Your toy</p>
                </div>
                
                <RefreshCw className="text-gray-400" size={20} />
                
                <div className="flex-1">
                  <img
                    src={otherToy?.images[0].url}
                    alt={otherToy?.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <p className="text-sm font-medium mt-1">{otherToy?.name}</p>
                  <p className="text-xs text-gray-500">Received toy</p>
                </div>
              </div>
              
              {match.meetupLocation && (
                <div className="mt-2 text-sm text-gray-500">
                  📍 Exchanged at: {match.meetupLocation}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
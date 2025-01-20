import React, { useState } from 'react';
import { Heart, Music, Video, Smile, Frown, Meh } from 'lucide-react';
import { Login } from './components/Login';

interface UserData {
  name: string;
  age: number;
  mood: 'happy' | 'neutral' | 'sad';
  feelings: string;
}

interface Content {
  type: 'video' | 'podcast';
  title: string;
  url: string;
  thumbnail?: string;
}

interface AuthUser {
  email: string;
}

function App() {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    age: 0,
    mood: 'neutral',
    feelings: ''
  });

  const [showRecommendations, setShowRecommendations] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  const handleLogin = (email: string, password: string) => {
    // In a real app, you would validate credentials with your backend
    // For demo purposes, we'll just set the user
    setUser({ email });
  };

  const getMoodBasedContent = (mood: string): Content[] => {
    switch (mood) {
      case 'happy':
        return [
          {
            type: 'video',
            title: 'Positive Vibes Meditation',
            url: 'https://www.youtube.com/watch?v=positive-vibes',
            thumbnail: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=400'
          },
          {
            type: 'podcast',
            title: 'Joy and Gratitude',
            url: 'https://open.spotify.com/episode/joy-gratitude'
          }
        ];
      case 'sad':
        return [
          {
            type: 'video',
            title: 'Calming Nature Sounds',
            url: 'https://www.youtube.com/watch?v=nature-sounds',
            thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'
          },
          {
            type: 'podcast',
            title: 'Overcoming Challenges',
            url: 'https://open.spotify.com/episode/challenges'
          }
        ];
      default:
        return [
          {
            type: 'video',
            title: 'Mindfulness Practice',
            url: 'https://www.youtube.com/watch?v=mindfulness',
            thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400'
          },
          {
            type: 'podcast',
            title: 'Daily Wellness',
            url: 'https://open.spotify.com/episode/wellness'
          }
        ];
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowRecommendations(true);
  };
 
  const getMoodIcon = (selectedMood: string) => {
    switch (selectedMood) {
      case 'happy':
        return <Smile className="w-6 h-6" />;
      case 'sad':
        return <Frown className="w-6 h-6" />;
      default:
        return <Meh className="w-6 h-6" />;
    }
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <Heart className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Mood & Media Matcher</h1>
            <p className="text-lg text-gray-600">Discover content that matches your mood</p>
          </div>
          <button
            onClick={() => setUser(null)}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Sign Out
          </button>
        </div>

        {!showRecommendations ? (
          <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg p-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  required
                  min="1"
                  max="120"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  value={userData.age || ''}
                  onChange={(e) => setUserData({ ...userData, age: parseInt(e.target.value) })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How are you feeling today?
                </label>
                <div className="flex space-x-4">
                  {['happy', 'neutral', 'sad'].map((mood) => (
                    <button
                      key={mood}
                      type="button"
                      className={`flex items-center justify-center p-4 rounded-lg border ${
                        userData.mood === mood
                          ? 'bg-purple-100 border-purple-500'
                          : 'border-gray-300 hover:border-purple-500'
                      }`}
                      onClick={() => setUserData({ ...userData, mood: mood as UserData['mood'] })}
                    >
                      {getMoodIcon(mood)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="feelings" className="block text-sm font-medium text-gray-700">
                  Tell us more about your feelings
                </label>
                <textarea
                  id="feelings"
                  required
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  value={userData.feelings}
                  onChange={(e) => setUserData({ ...userData, feelings: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Get Recommendations
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-white shadow-xl rounded-lg p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Hi {userData.name}, here's what we recommend for you
              </h2>
              <p className="text-gray-600">Based on your current mood: {userData.mood}</p>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Video className="w-6 h-6 mr-2" /> Recommended Videos
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {getMoodBasedContent(userData.mood)
                    .filter((content) => content.type === 'video')
                    .map((video, index) => (
                      <div key={index} className="rounded-lg overflow-hidden shadow-md">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h4 className="font-medium text-gray-900">{video.title}</h4>
                          <a
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:text-purple-700 text-sm"
                          >
                            Watch Now
                          </a>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Music className="w-6 h-6 mr-2" /> Recommended Podcasts
                </h3>
                <div className="space-y-4">
                  {getMoodBasedContent(userData.mood)
                    .filter((content) => content.type === 'podcast')
                    .map((podcast, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <h4 className="font-medium text-gray-900">{podcast.title}</h4>
                        <a
                          href={podcast.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-700"
                        >
                          Listen Now
                        </a>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowRecommendations(false)}
              className="mt-8 w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
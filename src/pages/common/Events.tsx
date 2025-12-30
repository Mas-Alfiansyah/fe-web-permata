import { Calendar, MapPin, Clock } from 'lucide-react';

export default function Events() {
  const events = [
      { id: 1, title: 'React Bootcamp 2024', date: '2024-03-15', time: '09:00 AM', type: 'Bootcamp', location: 'Online Zoom' },
      { id: 2, title: 'Guest Lecture: AI in EdTech', date: '2024-03-20', time: '02:00 PM', type: 'Webinar', location: 'Google Meet' },
      { id: 3, title: 'Permata Hackathon', date: '2024-04-01', time: '10:00 AM', type: 'Hackathon', location: 'Jakarta HQ' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Upcoming Events</h1>
          {/* Admin only button would go here */}
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700">
              Register for Event
          </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow overflow-hidden border border-gray-100 flex flex-col">
                  <div className="h-40 bg-indigo-900 flex items-center justify-center text-indigo-200">
                      <Calendar size={48} />
                  </div>
                  <div className="p-6 flex-1 flex flex-col space-y-4">
                      <div>
                          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded uppercase tracking-wide">
                              {event.type}
                          </span>
                          <h3 className="text-xl font-bold text-gray-900 mt-2">{event.title}</h3>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                              <Calendar size={16} className="text-gray-400" />
                              <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                              <Clock size={16} className="text-gray-400" />
                              <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                              <MapPin size={16} className="text-gray-400" />
                              <span>{event.location}</span>
                          </div>
                      </div>

                      <div className="pt-4 mt-auto">
                          <button className="w-full py-2 border border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors">
                              View Details
                          </button>
                      </div>
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
}

import { Award, Download, ExternalLink } from 'lucide-react';

export default function Certificates() {
  // Mock certificates
  const certificates = [
      { id: 1, title: 'React Frontend Masterclass', date: '2024-02-15', id_code: 'CERT-FE-2024-001' },
      { id: 2, title: 'UI/UX Design Fundamentals', date: '2024-01-20', id_code: 'CERT-UI-2024-045' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Certificates</h1>
      
      {certificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert) => (
                  <div key={cert.id} className="bg-white rounded-lg shadow border border-gray-100 p-6 flex flex-col items-center text-center space-y-4">
                      <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-2">
                          <Award size={32} />
                      </div>
                      <div>
                          <h3 className="font-bold text-gray-900">{cert.title}</h3>
                          <p className="text-sm text-gray-500">Issued on {cert.date}</p>
                          <p className="text-xs text-gray-400 font-mono mt-1">{cert.id_code}</p>
                      </div>
                      <div className="flex gap-3 w-full pt-4 border-t border-gray-100">
                          <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <ExternalLink size={16} /> View
                          </button>
                          <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                              <Download size={16} /> PDF
                          </button>
                      </div>
                  </div>
              ))}
          </div>
      ) : (
          <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
              <Award size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No certificates yet</p>
              <p className="text-sm">Complete courses to earn certificates!</p>
          </div>
      )}
    </div>
  );
}

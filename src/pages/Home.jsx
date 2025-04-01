import { useNavigate } from 'react-router-dom';
import { FaFlask, FaDatabase } from 'react-icons/fa';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-white flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-extrabold text-blue-700 mb-4 drop-shadow-lg">GLHD</h1>
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-10">
        Global Laser Hardening Database
      </h2>

      <div className="flex flex-col sm:flex-row gap-6">
        <button
          onClick={() => navigate('/add')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-xl transition duration-300"
        >
          <FaFlask />
          Add Experiment
        </button>

        <button
          onClick={() => navigate('/browse')}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl text-lg font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-xl transition duration-300"
        >
          <FaDatabase />
          View Database
        </button>
      </div>
    </div>
  );
}

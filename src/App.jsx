import { useEffect, useState } from 'react';
import Tours from './Tours';
import Loading from './Loading';

const url = 'https://course-api.com/react-tours-project';

const App = () => {
  const [isloading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const fetchData = async () => {
    setLoading(true);

    try {
      const resp = await fetch(url);
      const data = await resp.json();
      console.log(data);
      setTours(data);
    } catch {
      console.log('Error');
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isloading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h1>No tours left</h1>
          <button
            type="button"
            className="btn"
            onClick={fetchData}
            style={{ margin: '20px' }}
          >
            Refresh
          </button>
        </div>
      </main>
    );
  }

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => {
      return tour.id !== id;
    });
    setTours(newTours);
  };

  return (
    <main>
      <Tours tours={tours} removeTour={removeTour}></Tours>
    </main>
  );
};
export default App;

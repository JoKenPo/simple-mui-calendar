import React from 'react';
import Calendar from './components/Calendar';
import { startOfMonth } from 'date-fns';

function App() {

  const currentMonth = startOfMonth(new Date());

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <>
        <Calendar
          month={currentMonth}
        />
      </>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';

export function About() {
  const [quote, setQuote] = useState({ content: '', author: '' });

  useEffect(() => {
    fetch('https://api.quotable.io/random')
      .then(response => response.json())
      .then(data => {
        setQuote(data);
      })
      .catch(error => console.error('Error fetching quote:', error));
  }, []);

  return (
    <main className="about-background">
      <div className="centered-text translucent-box">
        <p>
          Need a new website to track your workouts? Look no further,
          this workout builder/tracker allows you to create custom workouts, and then log what you were able to do.
          Whether that be amount of time, weights, sets, or any other method of recording your workouts that you'd like.
          You can post your workouts for others to view, and you can also access workouts that were previously posted.
          No more having to write on notes, apps, or use other predetermined workouts; everything can be set by you!
          Go at your own pace, and see the growth start to build.
        </p>
        <br></br>
        <div id="quote" style={{ display: "block" }}>
          {quote.content && (
            <>
              {quote.content}
              {' - '}
              ({quote.author})
            </>
          )}
        </div>
      </div>
    </main>
  );
}
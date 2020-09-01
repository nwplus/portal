import React from 'react';
import { Card } from './Common';
import { H1, P, H3 } from './Typography';

export default ({ faq }) => {
  const categories = faq.reduce((q, a) => {
    q[a.category] = [...q[a.category] || [], a]; // group by category
    return q;
  }, {});

  return (
    <>
      <H1>Frequently Asked Questions</H1>
      {
        (Object.keys(categories)).map(category => {
          return (
            <>
              <H3>{category}</H3>
              {
                categories[category].map(q => {
                  return <Card key={q.question}>
                    <H3>{q.question}</H3>
                    <P>{q.answer}</P>
                  </Card>
                })
              }
            </>
          );
        })
      }
    </>
  );
}
import moment from 'moment';
import React from 'react'

export default function TxtCard(props) {
  const {data} = props;
  console.log('TxtCard :: props :: ', props);
  let cardDate = Object.keys(data)[0];
  let cardExpenses = data[Object.keys(data)[0]];
  console.log('TxtCard :: data :: ', data, Object.keys(data), data[Object.keys(data)[0]]);

  return (
    <>
      <div className='bold bg-blue-500 p-2 flex'>
        <p className='w-full'>{cardDate}</p>
        <p>{moment(Number(cardExpenses[0].createdAt)).format('dddd')}</p>
      </div>
      <div className='py-2' >
        {cardExpenses.map(exp => <div className='rounded m-4 ' key={exp.createdAt}>
          <div>Amount : {exp.amount} </div>
          <div>Category : {exp.category} </div>
          <div>Subcategory : {exp.subcategory} </div>
          <div>Paid By: {exp.paidBy} </div>
        </div>)}
      </div>
    </>
  )
}

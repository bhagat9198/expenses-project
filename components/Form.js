import React, {useState, useRef, useEffect} from 'react'
import { AiTwotoneCalendar, AiOutlineClockCircle } from 'react-icons/ai';
import moment from 'moment';

const paidByOptions = ['Gpay', 'Paytm', 'PhonePay', 'Cash', 'Hdfc', 'Sbi', 'Kotak', 'Rapido', 'Groww', 'Coin', 'CoinDCX']
const travellingOptions = ['Bmtc', 'Rapido', 'Ola', 'Other'];
const shoppingOptions = ['Amazone', 'Flipkart', 'Reliance', 'Vishal', 'Dmart', 'Shop', 'Subscription' ,'Other']
const householdOptions = ['Milk', 'Miscellaneous', 'Rent', 'Electricty Bill', 'Reacharge', 'To Maa', 'Other']
const foodOptions = ['Dosa', 'Shop', 'Pizzahut', 'Dominos', 'Mcdonalds', 'Other']
const investOptions = ['Groww', 'Coin', 'CoinDCX', 'Kite', 'Vested', 'Other']
const extraOptions = ['Friends', 'My', 'V']

export default function Form(props) {
  const {submitForm} = props;
  const [subCategories, setSubCategories] = useState(travellingOptions);
  const [paidBy, setPaidBy] = useState('');
  const [transactionType, setTransactionType] = useState('Expense');
  const [txtDateTime, setTxtDateTime] = useState({
    dateTime: false,
    formattedDate: false,
    formattedTime: false
  })

  const amountRef = useRef(null);
  const descriptionRef = useRef(null);
  const subcategoryRef = useRef(null);
  const categoryRef = useRef(null);
  const dateRef = useRef(null);
  const timeRef = useRef(null);
  
  useEffect(() => {
    function initDateTime() {
      const mainDate = new Date().getTime()
      const month = moment(mainDate).format('MM')
      const dayOfMonth = moment(mainDate).format('DD')
      const year = moment(mainDate).format('YYYY')
      const fDate = `${year}-${month}-${dayOfMonth}`
      const hours = moment(mainDate).format('HH')
      const minutes = moment(mainDate).format('mm')
      const seconds = moment(mainDate).format('ss')
      const am_pm = moment(mainDate).format('a');
      const fTime = `${hours}:${minutes}:${seconds}`
  
      setTxtDateTime({
        dateTime: mainDate,
        formattedDate: fDate,
        formattedTime: fTime
      })
    }
    initDateTime();
  }, [])

  const paidByHandler = (e, val) => {
    e.preventDefault()
    setPaidBy(val)
  }
  
  const txtTypeHandler = (e, val) => {
    e.preventDefault()
    setTransactionType(val)
  }

  const categoryHandler = e => {
    const cat = e.target.value;
    if (cat === 'Travelling') {
      setSubCategories(travellingOptions)
    } else if (cat === 'Shopping') {
      setSubCategories(shoppingOptions)
    } else if (cat === 'Food') {
      setSubCategories(foodOptions)
    } else if (cat === 'Household') {
      setSubCategories(householdOptions)
    } else if (cat === 'Invest') {
      setSubCategories(investOptions)
    } else if (cat === 'Extra') {
      setSubCategories(extraOptions)
    } else if (cat === 'Other') {
      setSubCategories(['Other'])
    }
  }

  const dateHandler = e => {
    let val = Number(e.target.valueAsDate);
    val = val - 19800000;
    const year = moment(val).format('YYYY')
    const month = moment(val).format('MM')
    const dayOfMonth = moment(val).format('DD')
    const formatedDate = `${year}-${month}-${dayOfMonth}`;

    const mainDate = moment(`${formatedDate} ${txtDateTime.formattedTime}`).valueOf()
    setTxtDateTime(prevState => ({
      ...prevState,
      formattedDate: formatedDate,
      dateTime: mainDate
    }))
  }

  const timeHandler = e => {
    let val = Number(e.target.valueAsDate);
    val = val - 19800000;
    const hours = moment(val).format('HH')
    const minutes = moment(val).format('mm')
    const seconds = moment(val).format('ss')
    const formatedTime = `${hours}:${minutes}:${seconds}`;
    console.log(hours, minutes, seconds);
    const mainDate = moment(`${txtDateTime.formattedDate} ${formatedTime}`).valueOf()
    setTxtDateTime(prevState => ({
      ...prevState,
      formattedTime: formatedTime,
      dateTime: mainDate
    }))
  }

  const submitFormHandler = async (e) => {
    e.preventDefault();
    const amount = amountRef.current.value;
    const category = categoryRef.current.value;
    const subcategory = subcategoryRef.current.value;
    const description = descriptionRef.current.value;
    let date = txtDateTime.dateTime
    console.log('submitFormHandler :: date :: ', txtDateTime);

    let data = {
      amount,
      category: category,
      subcategory: subcategory,
      description,
      createdAt: date,
      paidBy,
      transactionType
    }
    submitForm({ formData: data, txtDate: txtDateTime.formattedDate })
  }

  return (
    <>
      <form className="px-8 pt-6 pb-8 mb-4" onSubmit={submitFormHandler} >
        <div className='mb-4 grid place-items-center' >
          <div className='flex'>
            <button onClick={(e) => txtTypeHandler(e, 'Expense') } className={`mx-2 px-5 py-2 rounded-2xl ${transactionType === 'Expense' ? 'bg-red-700 text-white ' : 'bg-gray-400 disabled '}`} >Expenses</button>
            <button onClick={(e) => txtTypeHandler(e, 'Income')} className={`mx-2 px-5 py-2 rounded-2xl ${transactionType === 'Income' ? 'bg-green-700 text-white ' : 'bg-gray-400 disabled'}`} >Income</button>
          </div>
        </div>
        <div className='mb-4 flex '>
          <div className='relative' >
            <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2"> Date </label>
            {/* <AiTwotoneCalendar className="pointer-events-none absolute left-2" /> */}
            <input type="date" name="date" id="date" value={ txtDateTime.formattedDate} onChange={dateHandler} className="form-input w-full px-4 py-2" />
          </div>
          <div className='flex-1' ></div>
          <div className='relative' >
            <label htmlFor="time" className="block text-gray-700 text-sm font-bold mb-2" >Time </label>
            {/* <AiOutlineClockCircle className="pointer-events-none absolute left-2" /> */}
            <input type="time" name="time" id="time" value={ txtDateTime.formattedTime}  onChange={timeHandler} className="form-input w-full px-4 py-2" />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            ref={amountRef}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="amount" type="number" placeholder="XX" />
        </div>
        <div className='mb-4 px-2' >

          <label className="block text-gray-700 text-sm font-bold mb-2" >
            Paid By
          </label>

          <div className='flex gap-2 flex-wrap' >
            {paidByOptions.map(op => <button key={op} onClick={(e) => paidByHandler(e, op)} className={`bg-blue-100 p-1 mb-1 ${op == paidBy ? 'bg-blue-900 text-white' : ''} `}>{op}</button>)}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <select className='w-full py-1 px-2 rounded' id="category" onChange={categoryHandler} ref={categoryRef} >
            <option value="Travelling">Travelling</option>
            <option value="Shopping">Shopping</option>
            <option value="Food">Food</option>
            <option value="Household">Household</option>
            <option value="Invest">Invest</option>
            <option value="Extra">Extra</option>
            <option value="other">other</option>
          </select>

        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sub-category"  >
            Sub-Category
          </label>
          <select className='w-full py-1 px-2 rounded' id="sub-category" ref={subcategoryRef} >
            {subCategories.map(op => <option key={op} value={op} >{op}</option>)}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea id="description" className='w-full' ref={descriptionRef} />
        </div>
        <div className="mb-4" >
          <button className='w-full bg-green-700 text-white text-center py-2 rounded' type='submit' >Submit</button>
        </div>
        <div className="mb-4" >
          <button className='w-full bg-red-500 text-white text-center py-2 rounded' type='submit' >Cancel</button>
        </div>
      </form>
    </>
  )
}

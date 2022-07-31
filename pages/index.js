// import 'bulma/css/bulma.css';
import { useEffect, useRef, useState } from 'react';
import { collection, setDoc, doc, updateDoc, getDoc, getDocs } from 'firebase/firestore';
import firebaseConfigData from './../firenase.config'
import moment from 'moment';
import { async } from '@firebase/util';

const paidByOptions = ['Gpay', 'Paytm', 'PhonePay', 'Hdfc', 'Sbi', 'Kotak', 'Rapido', 'Groww', 'Coin', 'CoinDCX']
const travellingOptions = ['Bmtc', 'Rapido', 'Ola', 'Other'];
const shoppingOptions = ['Amazone', 'Flipkart', 'Reliance', 'Vishal', 'Dmart', 'Shop', 'Other']
const householdOptions = ['Rent', 'Electricty Bill', 'Reacharge', 'To Maa', 'Other']
const foodOptions = ['Dosa', 'Shop', 'Pizzahut', 'Dominos', 'Mcdonalds', 'Other']
const investOptions = ['Groww', 'Coin', 'CoinDCX', 'Kite', 'Vested', 'Other']
const extraOptions = ['Friends', 'My', 'V']

let userId = '9UWzjNur6XY5j6YhUT68exOPlWL2'
export default function Home() {
  console.log('firebaseConfigData :: ', firebaseConfigData);
  const [subCategories, setSubCategories] = useState([]);
  const [allRecords, setAllRecords] = useState([]);
  const [paidBy, setPaidBy] = useState('');
  const amountRef = useRef(null);
  const descriptionRef = useRef(null);
  const subcategoryRef = useRef(null);
  const categoryRef = useRef(null);
  const toastRef = useRef(null);

  useEffect(() => {

    async function asyncFun() {
      const q = collection(firebaseConfigData.db, "users", userId, 'expenses')
      const querySnapshot = await getDocs(q);
      let allDocs = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        allDocs.push({
          [doc.id]: doc.data()['expensesInDay']
        })
      });
      return allDocs;
    }
    asyncFun().then(res => {
      console.log('res :: ', res);
      setAllRecords(res)
    }).catch(error => {
      console.log('error :: ', error.message);
      toastRef.current.classList.remove("hidden");
      toastRef.current.classList.add("bg-red-500");
      toastRef.current.innerText = error.message
      setTimeout(() => {
        toastRef.current.classList.add("hidden");
      }, 3000)
    })

  }, [])

  const paidByHandler = (e, val) => {
    console.log('paidByHandler :: val :: ', e, val);
    e.preventDefault()
    setPaidBy(val)
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

  const submitForm = async (e) => {
    e.preventDefault();
    const amount = amountRef.current.value;
    const category = categoryRef.current.value;
    const subcategory = subcategoryRef.current.value;
    const description = descriptionRef.current.value;
    const date = new Date().getTime();

    const month = moment(date).format('MM')
    const datOfMonth = moment(date).format('DD')
    const year = moment(date).format('YYYY')
    const completeDate = moment(date).format('DD-MM-YYYY');
    console.log('completeDate :: ', completeDate);
    let data = {
      amount,
      category : category,
      subcategory: subcategory,
      description,
      createdAt: date,
      paidBy
    }
    
    try {
      const docRef = await doc(firebaseConfigData.db, 'users', userId, 'expenses', completeDate);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) { 
        let docData = docSnap.data();
        docData['expensesInDay'].unshift(data);
        await updateDoc(docRef, docData);
      } else {
        data = { expensesInDay: [data] }
        await setDoc(doc(firebaseConfigData.db, 'users', userId, 'expenses', completeDate), data);
      }

      toastRef.current.classList.remove("hidden");
      toastRef.current.classList.add("bg-green-500");
      toastRef.current.innerText = 'Recorded Added'
      setTimeout(() => {
        toastRef.current.classList.add("hidden");
      }, 3000)
    } catch(error) {
      toastRef.current.classList.remove("hidden");
      toastRef.current.classList.add("bg-red-500");
      toastRef.current.innerText = error.message
      setTimeout(() => {
        toastRef.current.classList.add("hidden");
      }, 3000)
    }

  }

  function cardUi({data}) {
    console.log('cardUi :: data :: ', data, Object.keys(data), data[Object.keys(data)[0]]);
    let cardDate = Object.keys(data)[0];
    let cardExpenses = data[Object.keys(data)[0]];
    return <>
      <div className='bold bg-blue-500 p-2'>{cardDate}</div>
      <div className='py-2' >
      {cardExpenses.map(exp => <div className='rounded m-2 ' key={exp.createdAt}>
        <div>Amount : {exp.amount} </div>
        <div>Category : {exp.category} </div>
        <div>Subcategory : {exp.subcategory} </div>
        <div>Paid By: {exp.paidBy} </div>
      </div>)}
      </div>
     </>
    
  }

  console.log('allRecords :: ', allRecords);
  return (
    <div className="w-full h-full bg-gray-300 p-4" >
      <div className='grid grid-cols-2 gap-4' >
        <div className="rounded-2xl bg-gray-200" >
          <form className="px-8 pt-6 pb-8 mb-4" onSubmit={submitForm} >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                Amount
              </label>
              <input
                ref={amountRef}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="amount" type="number" placeholder="XX" />
            </div>
            <div className='mb-4 flex gap-2 flex-wrap px-2' >
              <label className="block text-gray-700 text-sm font-bold mb-2" >
                Paid By
              </label>
              <div>
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
        </div>
        <div className="rounded-2xl bg-gray-200" >
          {allRecords.map((data, i) => <div key={i} >
            {cardUi({data})}
          </div>)}
        </div>
      </div>
      <div className='w-full '>
        <div className='hidden text-white text-center py-2 px-5 rounded-2xl' ref={toastRef}>

        </div>

      </div>
    </div>
  )
}

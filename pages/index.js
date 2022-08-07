// import 'bulma/css/bulma.css';
import { useEffect, useRef, useState } from 'react';
import { collection, setDoc, doc, updateDoc, getDoc, getDocs, query, orderBy, where } from 'firebase/firestore';
import firebaseConfigData from './../firenase.config'
import moment from 'moment';
import Form from '../components/Form';
import TxtCard from '../components/TxtCard';


let userId = '9UWzjNur6XY5j6YhUT68exOPlWL2';

// export async function getStaticProps() {
//   let mainResult;
//   async function asyncFun() {
//     const q = collection(firebaseConfigData.db, "users", userId, 'expenses')
//     const querySnapshot = await getDocs(q);
//     let allDocs = [];
//     querySnapshot.forEach((doc) => {
//       console.log(doc.id, " => ", doc.data());
//       allDocs.push({
//         [doc.id]: doc.data()['expensesInDay']
//       })
//     });
//     return allDocs;
//   }
//   asyncFun().then(res => {
//     console.log('res :: ', res, JSON.stringify(res));
//     // setAllRecords(res)
//     mainResult = JSON.stringify(res);
//   }).catch(error => {
//     console.log('error :: ', error.message);
//     // toastRef.current.classList.remove("hidden");
//     // toastRef.current.classList.add("bg-red-500");
//     // toastRef.current.innerText = error.message
//     // setTimeout(() => {
//     //   toastRef.current.classList.add("hidden");
//     // }, 3000)
//   })

//   return {
//     props: {
//       result: mainResult
//     }
//   }
// }

export default function Home() {
  // console.log('Home :: result :: ', result);
  const [allRecords, setAllRecords] = useState([]);
  const toastRef = useRef(null);

  useEffect(() => {
    async function asyncFun() {
      const q = collection(firebaseConfigData.db, "users", userId, 'transactions')
      const querySnapshot = await getDocs(q);
      let allDocs = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        allDocs.push({
          [doc.id]: doc.data()['transactionsInDay']
        })
      });
      return allDocs;
    }
    asyncFun().then(res => {
      console.log('res :: ', res);
      setAllRecords(res.reverse())
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

  const submitForm = async ({ formData, txtDate }) => {
    try {
      const docRef = await doc(firebaseConfigData.db, 'users', userId, 'transactions', txtDate);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) { 
        let docData = docSnap.data();
        docData['transactionsInDay'].unshift(formData);
        await updateDoc(docRef, docData);
      } else {
        let docData = { transactionsInDay: [formData] }
        await setDoc(doc(firebaseConfigData.db, 'users', userId, 'transactions', txtDate), docData);
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

  
  return (
    <div className="w-full h-full bg-gray-300" >
      <div className='grid sm:grid-cols-1 gap-4   md:grid-cols-2 gap-4' >
        <div className="rounded-2xl bg-gray-200" >
          <Form submitForm={submitForm}  />
          <div className=''>
            <div className='hidden text-white text-center py-2 px-5 rounded-2xl' ref={toastRef}>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-gray-200" >
          {allRecords.map((data, i) => <div key={i} >
            <TxtCard data={data} />
          </div>)}
        </div>
      </div>
    </div>
  )
}

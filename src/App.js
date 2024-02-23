import { useState } from "react";
import "./App.css";
import Alert from "./components/Alert";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

const App = () => {

  // state 생성
  const [charge, setCharge] = useState("")
  const [amount, setAmount] = useState("")

  const [expenses, setExpenses] = useState(
    [
      { id: 1, charge: '렌트비', amount: 1600 },
      { id: 2, charge: '교통비', amount: 400 },
      { id: 3, charge: '식비', amount: 1200 }
    ]
  )

  const [alert, setAlert] = useState({show: false})

  const [id, setId] = useState('')
  const [edit, setEdit] = useState(false)
  
  // state 핸들 함수
  const handleDelete = id => { 
    const newExpenses = expenses.filter(expense => 
      expense.id !== id
    )
    // console.log(newExpenses)
    setExpenses(newExpenses)

    handleAlert({type: "danger", text: "아이템이 삭제됨"})
  } 

  const handleCharge = e => {
    // console.log(e.target.value)
    setCharge(e.target.value)
  }
  const handleAmount = e => {
    setAmount(e.target.valueAsNumber)
  }
  const handleSubmit = e => {
    e.preventDefault()
    if( charge !== "" && amount > 0 ) {
      if(edit) {
        const newExpenses = expenses.map(item => {
          console.log(item)
          console.log(charge)
          console.log(amount)
          return item.id === id ? {...item, charge, amount} : item
        })
        console.log(newExpenses)
        setExpenses(newExpenses)
        setEdit(false)
        handleAlert({type: 'success', text: '수정됨'})
      } else {
        const newExpense = {id: crypto.randomUUID(), charge, amount}

        // 불변성(원본 유지)을 지켜주기 위해 새로운 배열 생성
        const newExpenses = [...expenses, newExpense]
        setExpenses(newExpenses)

        handleAlert({type: "success", text: "성공적으로 생성"})
      }
      setCharge("")
      setAmount("")
    } else {
      console.log("error")
      handleAlert({
        type: "danger", 
        text: "charge는 빈 값일 수 없으며 amount는 0보다 커야함"
      })
    }
  }
  const handleAlert = ({type, text}) => {
    setAlert({show: true, type, text})

    setTimeout(() => {
      setAlert({show: false})
    }, 7000)
  }
  const handleEdit = id => {
    const expense = expenses.find(item => item.id === id)
    const {charge, amount} = expense
    setCharge(charge)
    setAmount(amount)
    setEdit(true)
    setId(id)
  }
  const clearItems = () => {
    setExpenses([])
  }

  return (
    <main className="main-container">
      {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}
      <h1>예산 계산기</h1>

      <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem' }}>
        { /* Expense Form */ }
        <ExpenseForm 
          charge = {charge}
          handleCharge = {handleCharge} 
          amount = {amount}
          handleAmount = {handleAmount}
          handleSubmit = {handleSubmit}
          edit = {edit}
        />
      </div>

      <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem' }}>
        { /* Expense List */ }
        { /* initialExpenses props 데이터 전달 */ }
        <ExpenseList 
          /*initialExpenses = {this.initialExpenses}*/
          expenses = {expenses}
          handleDelete = {handleDelete}
          handleEdit = {handleEdit}
          clearItems = {clearItems}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'end', marginTop: '1rem' }}>
        <p style={{ fontSize: '2rem' }}>
          총지출:
          <span>
            {expenses.reduce((acc, curr) => {
              return acc += curr.amount
            }, 0)}
            원
          </span>
        </p>
      </div>
    </main>
  )
}

export default App
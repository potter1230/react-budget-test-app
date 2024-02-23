import React from 'react'
import { MdDelete } from 'react-icons/md'
import ExpenseItem from './ExpenseItem'
import './ExpenseList.css'

const ExpenseList = ({ expenses, handleDelete, handleEdit, clearItems }) => {
  return (
    <>
      <ul className='list'>
        { /* Expense Item */ }
        {expenses.map(expense => {
          return (
            <ExpenseItem 
              expense = {expense}
              key = {expense.id} 
              handleDelete = {handleDelete}
              handleEdit = {handleEdit}
            />
          )
        })}
      </ul>
      {expenses.length > 0 && (
        <button className='btn' onClick={clearItems}>
          목록 지우기
          <MdDelete className='btn-icon' />
        </button>
      )}
      {/*
        위의 &&는 리액트 JSX에서 쓰는 if문 축약
        { 1 === 1 ? <p>asd</p> ? null }
        위 조건문은
        { 1 === 1 && <p>asd</p> }
        https://codingapple.com/unit/react-if-else-patterns-enum-switch-case/

        https://developerntraveler.tistory.com/54
      */}
    </>
  )
}

export default ExpenseList
"use client";
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Page() {

  // Type definition for a single todo item
  interface todo {
    id: number,
    title: string,
    time: string,
    hasDone: boolean,
  }

  // State to generate unique IDs for todos
  const [count, setCount] = useState(1)

  // State to hold the list of todos
  const [todos, setTodos] = useState<todo[]>([])

  /**
   * Remove a todo item from the list by its ID
   * @param id - The ID of the todo to remove
   */
  const removeTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  /**
   * Toggle the "hasDone" status of a todo item
   * @param id - The ID of the todo to update
   */
  const doneTodo = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, hasDone: !todo.hasDone } : todo
    );
    setTodos(updatedTodos);
  };

  /**
   * Toggle the "hasDone" status for all todos at once
   */
  const checkAll = () => {
    const updatedTodos = todos.map(todo => ({ ...todo, hasDone: !todo.hasDone }));
    setTodos(updatedTodos);
  }

  // State to control the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to track the current input value in the modal form
  const [inputValue, setInputValue] = useState('')

  /**
   * Handle changes in the input field for a new todo title
   * @param event - The input change event
   */
  const inputHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value)
  };

  // Type definition for a new todo item (same as existing todos)
  interface NewTodo {
    id: number,
    title: string,
    time: string,
    hasDone: boolean,
  }

  // State to hold the current formatted time string
  const [time, setTime] = useState<string>("");

  /**
   * On component mount, get and format the current time (e.g. 08:30 PM)
   */
  useEffect(() => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');

    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    if (hours === 0) hours = 12;    

    const currentTime = `${hours.toString().padStart(2, '0')}:${minutes} ${period}`;
    setTime(currentTime);
  }, []);

  /**
   * Store the ID of the todo currently being edited
   */
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

  /**
   * Prepare the UI to edit a todo: set input value and open modal
   * @param todo - The todo item to edit
   */
  const updateTodo = (todo: todo) => {
    setInputValue(todo.title);
    setIsModalOpen(true);
    setEditingTodoId(todo.id);
    setInputValue('') // Clear input after setting? (Might be redundant)
  }

  /**
   * Handle form submission for adding or updating a todo
   * @param event - The form submission event
   */
  const submitted = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Close modal on submit
    setIsModalOpen(false);

    if (editingTodoId !== null) {
      // Edit mode: update existing todo title
      const updatedTodos = todos.map(todo =>
        todo.id === editingTodoId ? { ...todo, title: inputValue } : todo
      );
      setTodos(updatedTodos);
      setEditingTodoId(null); // Reset edit mode
    } else {
      // Add mode: create a new todo with current input and time
      const newTodo: NewTodo = {
        id: count,
        title: inputValue,
        time: time,
        hasDone: false,
      };
      setCount(prev => prev + 1);
      setTodos(prev => [...prev, newTodo]);
    }

    // Clear input field after submission
    setInputValue('');
  };

  /**
   * Load todos from localStorage on component mount, if any exist
   */
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  /**
   * Save the current todos list to localStorage whenever it changes
   */
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // ... your JSX goes here inside the return statement
 
  return (
    <section className='flex-row-center min-h-screen select-none'>
      {/* Left-side decorative image positioned absolutely near the top */}
      <div className='absolute left-0 -top-20'>
        <Image src="images/pic1.svg" alt="" width={1300.05} height={100}/>
      </div>

      {/* Right-side decorative image positioned absolutely at the top */}
      <div className='absolute right-0 top-0'>
        <Image src="images/pic2.svg" alt="" width={333} height={0}/>
      </div>

      {/* Main container box for the Todo List */}
      <div className='primaryShadow bg-[#151515] border border-black rounded-3xl text-white z-50 w-[369px]'>

        {/* Header section of the Todo List box */}
        <div className='bg-[#152C2B] px-3 py-7 rounded-t-3xl flex items-center justify-between'>

          {/* Left arrow icon (could be used for back navigation) */}
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </span>

          {/* Header title */}
          <h1 className='font-bold text-lg'>Todo List</h1>

          {/* Three-dots menu icon (for options) */}
          <div className='options'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.7" stroke="currentColor" className="w-7 h-7 cursor-pointer">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
            </svg>

            <div className='primaryShadow options__wrapper flex-col-center gap-2 absolute rounded-lg top-6 right-0 bg-[#151515] w-[127px] px-1 py-3 flex-row-center border border-[#152C2B]'>
              <div onClick={()=> setTodos([])}  className='hover:bg-[#152C2B] rounded py-1 px-2 flex items-center justify-between w-full hover:cursor-pointer'>
                Delete all
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path></svg>
              </div>
              <div onClick={checkAll} className='hover:bg-[#152C2B] rounded py-1 px-2 flex items-center justify-between w-full hover:cursor-pointer'>
                Check all
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className='px-4 py-7 overflow-hidden flex flex-col justify-center gap-4'>
          {/* Header section showing today's date */}
          <div className='flex flex-col justify-center'>
            <h2 className='font-bold'>Today</h2>
            <span className='text-[#7D7878]'>1July, 2025</span>
          </div>

          {/* Container for the list of todo items */}
          <div className='flex flex-col justify-center gap-2'>

            {/* Todo item - completed task */}
            {todos.map((todo) => (
              <React.Fragment key={todo.id}>
                <div className={`${todo.hasDone ? 'text-[#7A7777]' : ''} select-none bg-[#201F1F] hover:bg-[#152C2B] p-3 rounded-lg flex items-center justify-between`}>

                  {/* Left side: checkmark icon and crossed-out task name */}
                  <div className="flex items-center gap-1">
                    {todo.hasDone ? (
                      <span onClick={()=> doneTodo(todo.id)} className='hover:cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" > <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                      </span>
                    ) : (
                      <span onClick={()=> doneTodo(todo.id)} className='hover:cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" > <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" /> </svg>
                      </span>
                    )}

                    {/* Task text with line-through to indicate completion */}
                    <span className={`${todo.hasDone ? 'line-through' : ''}`}>{todo.title}</span>
                  </div>

                  {/* Right side: time of the task */}
                  <div className='flex items-center gap-1'>
                    <span>{todo.time}</span>
                    <svg onClick={()=> removeTodo(todo.id)}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 cursor-pointer">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>

                    <svg onClick={()=> updateTodo(todo)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 cursor-pointer">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* Floating Add button at the bottom right */}
          <div className='mt-7 flex justify-end items-center hover:cursor-pointer'>
            <div onClick={()=> setIsModalOpen((prevState) => !prevState)} className='secoundaryShadow bg-[#152C2B] h-16 w-16 rounded-full flex-row-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {isModalOpen && (
      <>
        {/* Modal Overlay */}
        <div className='z-50 bg-black/80 flex-row-center min-h-screen absolute right-0 left-0 top-0 bottom-0'>

          {/* Modal Box */}
          <div className='primaryShadow bg-[#201F1F] w-[90%] sm:w-[50%] lg:w-[30%] rounded-md text-white'>

            {/* Modal Header / Close Button */}
            <div className='flex items-center justify-end bg-[#152C2B] px-3 py-4 rounded-t-md'>
              <span onClick={()=> setIsModalOpen((prevState) => !prevState)} className='hover:cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </span>
            </div>

            {/* Modal Content / Form */}
            <div className='px-3 py-4'>
              <form onSubmit={submitted} action="" className='flex-col-center gap-2'>
                <input value={inputValue} onChange={inputHandler} type="text" placeholder='Add Todo...' className='border-b w-[70%]'/>
                <button type="submit" className='border border-gray-600 px-11 py-2 mt-4 rounded-lg secoundaryShadow hover:bg-[#152C2B]'>Enter</button>
              </form>
            </div>
          </div>
        </div>
      </>
      )}

    </section>
  )
}


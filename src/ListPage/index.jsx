import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';
import { GetContext } from '../_main/context';
import { Formik, Form, Field } from 'formik';
import { FormControl } from '@material-ui/core';
import { HiOutlinePlusSm } from "react-icons/hi";
import { Button } from '@material-ui/core';
import { postTask, getTasks, updateTask, clearTask } from './action';
import { getuserid, getuserDetails } from '../Login/action';
import { GoPencil } from "react-icons/go";
import { RiDeleteBin5Line } from "react-icons/ri";
import './style.css';

function ListPage({ history, match}) {
    const { state, dispatch } = GetContext();
    const { login, trailList } = state;
    const initials = {
        task_msg:'',
        task_date: '',
        task_time: '',
        assigned_user: ''
    }
    const [store, updateStore] = useImmer({
     open: false,
     taskDetail: false
    });
    useEffect(() => {
        getuserid(dispatch).then(()=>{
            getuserDetails(dispatch);
        });
       
    }, []);
    const newTask = () =>{
        updateStore((draft) => {
            draft.open= true
           })
    }
    const cancelTask = () =>{
        updateStore((draft) => {
            draft.open= false
            draft.taskDetail= true
           })
    }
    const handleSubmit = (form) => {
        if (trailList?.tasklist?.data?.form) {
            getuserDetails(dispatch);
            getTasks(dispatch);
            updateTask(dispatch,{form},trailList?.tasklistGet?.data[0]?.id).then(() => {
                localStorage.task_id = trailList?.tasklistGet?.data[0]?.id;
                updateStore((draft) => {
                    draft.open= false
                    draft.taskDetail= true
                   })
            });
        } else {
        getuserDetails(dispatch);
        getTasks(dispatch);
        postTask(dispatch,{
            form,
        }).then(() => {
            updateStore((draft) => {
                draft.open= false
                draft.taskDetail= true
               })
        });    
    }
    };
    const deleteTask = () => {
        clearTask(dispatch, trailList?.tasklistGet?.data[0]?.id).then(()=>{
            updateStore((draft) => {
                draft.open= false
                draft.taskDetail= false
               })   
        });   
    }
    const editTask = () =>{
        updateStore((draft) => {
            draft.open= true
            draft.taskDetail= false
           })   
    }
 
    return (     
        <div id='tracker-container' className='flex'>
           <div className='leftContainer'/>
           <div className='rightContainer'>
               <div className='right-header'></div>
               <div className='right-body'>
                   <div className='taskcontainer'>
                       <div className='taskHeader flex space-between'>
                           <div>{trailList?.tasklist?.data?.form ? "TASKS 1 ":" TASKS 0" }</div> <div className='plus-icon flex flex-center' onClick={newTask}><HiOutlinePlusSm fontSize='1.2em'/>  <span className="tooltiptext">New Task</span></div>
                       </div>
               {store.open && <Formik
                enableReinitialize
                initialValues={ trailList?.tasklist?.data?.form
                    ? trailList?.tasklist?.data?.form
                    : initials }
                onSubmit={handleSubmit}
                >
                {({ submitForm }) => (
                    <Form className='form-box'>
                        <div className='desc-container'>
                                <div> Task Description</div>
                                <Field
                                    className='text-area '
                                    name='task_msg'
                                    type='text'
                                    variant='outlined'
                                    label='task_msg'
                                    size='small'
                                    disabled={false}
                                />
                        </div>
                        <div className='date-container flex'>
                            <div className='date'> 
                            <div>Date</div>
                            <Field
                                className='field dateInput'
                                name='task_date'
                                type="date"
                                variant='outlined'
                                label='task_date'
                                size='small'
                                disabled={false}
                            />
                            </div>
                            <div className='time'>
                            <div>Time</div>
                            <Field
                                className='field dateInput'
                                name='task_time'
                                type="time" 
                                variant='outlined'
                                label='task_time'
                                size='small'
                                step='1'
                                disabled={false}
                            />
                            </div>
                        </div>
                        <div className='user-container'>
                            <div>Assign User</div>
                            <FormControl
                                            variant='outlined'
                                            className='select-field'
                                            size='small'
                                            focused={false}
                                            hiddenLabel={true}
                                        >
                                            <Field
                                                as='select'
                                                className='select-area'
                                                name='assigned_user'
                                            >
                                           <option value=''>Select</option>
                                                {
                                                    login?.list?.userDetails?.map(
                                                        (item, i) => (
                                                            <option
                                                                value={item.user_id}
                                                                key={i}
                                                            >
                                                                {item.first}
                                                            </option>
                                                        )
                                                    )}
                                            </Field>
                                        </FormControl>
                        </div>
                        <div className='button-container flex flex-end'>
                            {trailList?.tasklist?.data?.form &&<span className='deleteIcon' onClick={deleteTask}><RiDeleteBin5Line/></span>}
                            <span className='cancel-button' onClick={cancelTask}>Cancel</span>
                            <Button
                                className='save-button flex flex-center'
                                variant='contained'
                                disabled={false}
                                onClick={submitForm}>
                                 Save
                            </Button>
                        </div>
                    </Form>
                    // eslint-disable-next-line indent
                )}
            </Formik>
            }
           {store.taskDetail && <div className='updateTask flex space-between'>
              <div className='flex flex-vert-center'>
                <img src={login?.list?.userDetails && login?.list?.userDetails[0]?.icon}/>
                <div className='detail-container flex flex-vert-center flex-column'>
                    <p>{trailList?.tasklist?.data?.form?.task_msg}</p>
                    <p>{trailList?.tasklist?.data?.form?.task_date}</p>
                </div>
              </div>
              <div className='edit-icon flex flex-center'>
                  <GoPencil fontSize='1.2em' onClick={editTask}/>
              </div>
            </div>}
                   </div>
               </div>
           </div>
        </div>
    );
}

export default ListPage;

import { addHours } from 'date-fns';
import React from 'react'
import { useCalendarstore } from '../../hooks/useCalendarstore';
import { useUiStore } from '../../hooks/useUiStore'

export const FabAddNew = () => {

   const { openDateModal } = useUiStore();
   const { setActiveEvent }  = useCalendarstore();

   const handleClickNew = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours( new Date(), 2 ),
            bgColor: '#fafafa',
            user: {
                _id: '123',
                name: 'Agustin',
        }
    })
        openDateModal();
   }

  return (
    <button
        className='btn btn-primary fab'
        onClick={ handleClickNew }
    >
        <i className='fas fa-plus'></i>
    </button>
  )
}

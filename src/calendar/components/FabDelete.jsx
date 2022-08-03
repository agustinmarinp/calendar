
import { useCalendarstore } from '../../hooks/useCalendarstore';
import { useUiStore } from '../../hooks/useUiStore'
import { ondDeleteEvent } from '../../store';

export const FabDelete = () => {

   const { startDeletingEvent, hasEventSelected } = useCalendarstore();


   const handleDelete = () => {
        startDeletingEvent();
   }

  return (
    <button
        className='btn btn-danger fab-danger'
        onClick={ handleDelete }
        style={{
          display: hasEventSelected ? '' : 'none'
        }}
    >
        <i className='fas fa-trash-alt'></i>
    </button>
  )
}

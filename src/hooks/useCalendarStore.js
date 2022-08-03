
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import calendarApi from '../api/calendarApi';
import { convertEventsToDate } from '../helpers/convertEventsToDate';
import { onAddNewEvent, ondDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store';

export const useCalendarstore = () => {

  const dispatch = useDispatch();
  
  const { events, activeEvent } = useSelector( state => state.calendar );
  const { user } = useSelector( state => state.auth );

  const setActiveEvent = ( calendarEvent ) => {
      dispatch( onSetActiveEvent( calendarEvent ) )
  }

  const startSavingEvent = async( calendarEvent ) => {

      try {
        
        if ( calendarEvent.id ) {
          //actualzando
          const { data } = await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent);
          dispatch( onUpdateEvent( { ...calendarEvent, user } ) );
          return;
  
        }
          //creando
          const { data } = await calendarApi.post('/events', calendarEvent);
  
          dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }) )
      
      } catch (error) {
        console.log(error);
        Swal.fire('Error al guardar', error.response.data.msg, 'error')
    }


  }


  const startDeletingEvent = async() => {
    // todo: llegar al backend
    try {
        
        //actualzando
        await calendarApi.delete(`/events/${ activeEvent.id }`);
        dispatch( ondDeleteEvent() );

    } catch (error) {
      console.log(error);
      Swal.fire('Error al eliminar', error.response.data.msg, 'error')
  }

   
  }


  const startLoadingEvents = async() => {

    try {
      
      const { data } = await calendarApi.get('/events');
      const events = convertEventsToDate( data.eventos );
      dispatch( onLoadEvents( events ) )
      

    } catch (error) {
      console.log('Error cargando eventos');
      console.log(error)
    }

  }
  
  return {
      //propiedades
      
      activeEvent,
      events,
      hasEventSelected: !!activeEvent,

      //metodos

      setActiveEvent,
      startSavingEvent,
      startDeletingEvent,
      startLoadingEvents

  }
}

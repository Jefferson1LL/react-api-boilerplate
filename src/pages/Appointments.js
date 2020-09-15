import React, { useState } from 'react';
import API from '../data';
import { translateMessage } from '../utils/translateMessage';
import AppointmentList from '../components/AppointmentList';
import ArticleForm from '../components/ArticleForm';
import { Button, message, Skeleton, Row, Col } from 'antd';
import { useAuth } from '../providers/Auth';
import { useCategories } from '../data/useCategories';
import ShowError from '../components/ShowError';
import { mutate } from 'swr';

/**
 * Fetch Appointments from DB
 */
export const fetchAppointments = async() => {
  // console.log( `Show data fetched. Appointments: ${ JSON.stringify( articles ) }` );

  return await API.get( '/appointments' );
};

/**
 * Appointments list page
 * @param props
 * @constructor
 */
const Appointments = (props ) => {

  const [ visible, setVisible ] = useState( false );
  const categories = useCategories();

  const auth = useAuth();

  console.log( 'categories', categories );

  /**
   * Executed after the form is submitted
   * Fetches all the articles and refreshes the list
   * Closes the modal
   */
  const afterCreate = async() => {
    try {
      // show skeleton
      await mutate( '/appointments', async appointments => {
        return { data: [ {}, ...appointments.data ] };
      }, false );

      await mutate( '/appointments' );
      setVisible( false ); // close the modal
    } catch( error ) {
      console.error(
        'You have an error in your code or there are Network issues.',
        error
      );

      message.error( translateMessage( error.message ) );
    }
  };

  return (
    <div>

         Citas


      <AppointmentList  />
    </div>
  );
};


export default Appointments;

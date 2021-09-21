import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import { LIST_ROUTE } from '../../../_main/routeConstants';
import './styles.css';

export const InnerMenu = (props)  => {
  const { history, name, home } = props;
  const navigateHome = () => {
    history.push(LIST_ROUTE);
   }; 
  return (
    <div id='innerMenu-container'>
        <div className='innerMenu'>
          <div>
            <Breadcrumbs aria-label="breadcrumb">
              <Typography className='color-link' onClick={navigateHome}>{home}</Typography>
              <Typography className='color-linkTwo'>{name}</Typography>)
            </Breadcrumbs>
          </div>
        </div>
    </div>
  );
}

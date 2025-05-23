


import React, { } from 'react';


import { Outlet, } from 'react-router-dom';
import Side_bar from './Side_bar';
import Admin_Headbaar from './Admin_Headbaar';






export default function AdminProfile() {

  return (

    <div className='flex flex-col md:grid md:grid-cols-5 h-screen'>
      <div className=' '>

        <Side_bar/>
        
      </div>
      <div className=' flex-1 md:col-span-4'>
        <Admin_Headbaar/>
        
          <Outlet />
       
      </div>
    </div>
  );

  
}

import { Routes, Route, Navigate } from 'react-router-dom';
import Login from "./Authentication/login"
import Signup from './Authentication/signup';

import Layout from './dashboard/layout';
import Home from './dashboard/components/home';
import Add_contacts from './dashboard/components/add_contacts';
import Contacts_inBusiness from './dashboard/components/contacts_inBusiness';
import Deleted_contacts from './dashboard/components/deleted_contacts';
import Send_message from './dashboard/components/send_message';

import { useAuth } from './providers/AuthProvider';

const Routing = () => {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Signup />} />
      {user ? (
        <Route path="/home" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='add-contacts' element={<Add_contacts />} />
          <Route path='in-business-contacts' element={<Contacts_inBusiness />} />
          <Route path='deleted-contacts' element={<Deleted_contacts />} />
          <Route path='send-messages' element={<Send_message />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/" replace />} />
      )}
    </Routes>
  )
}

export default Routing
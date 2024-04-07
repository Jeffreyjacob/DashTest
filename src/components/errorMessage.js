import React, { useState } from 'react';
import { Modal, Placeholder } from 'rsuite';
import { Notification} from 'rsuite';

const Message = React.forwardRef(({ type, ...rest }, ref,message) => {
    return (
      <Notification ref={ref} {...rest} type={type} header={type} className='shadow-none'>
        
      </Notification>
    );
  });

const Error = ({message,handleclose,open}) => {
  const [backdrop, setBackdrop] = useState('static');
  return (
      <Modal open={open} onClose={handleclose} size={300} backdrop={backdrop}> 
      <div className='flex flex-col justify-center items-center'>
      <Message type='error'>
            {message}
        </Message>
        <button type='button' className='bg-[#3366FF] text-white px-7 py-2 rounded-[6px]' onClick={handleclose}>
            Ok
        </button>
      </div>
        
      </Modal>
  )
}

export default Error
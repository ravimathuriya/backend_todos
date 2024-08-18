import React from 'react'
import Notes from './Notes'


const Home = (props) => {

  const {alertmode} = props;

  return (
    <>
      <Notes alertmode={alertmode} />
    </>
  )
}

export default Home

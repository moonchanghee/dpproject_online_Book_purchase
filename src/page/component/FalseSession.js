import React from 'react';
import { Link, useHistory } from 'react-router-dom';
const FalseSession = () => {
  let history = useHistory();
  return (
    <div>
      {/**<button>
        <Link to="user/login">로그인</Link>
      </button>**/}
      <button onClick={() => history.push('/user/login')}>로그인</button>
    </div>
  );
};

export default FalseSession;

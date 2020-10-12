import React from 'react';
import {Link} from 'react-router-dom'
const FalseSession = () => {
    return (
        <div>
           <button><Link to ="user/login">로그인</Link></button>
        </div>
    );
};

export default FalseSession;
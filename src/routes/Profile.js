import React from 'react';
import { authService } from '../firebase';

function Profile() {
    const onLogOutClick = () => {;
        authService.signOut();
    }
    return (
        <div>
            <button onClick={onLogOutClick}>Log out</button>
        </div>
    );
}

export default Profile;
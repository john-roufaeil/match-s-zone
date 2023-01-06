import React, { useContext, useState, createContext } from 'react';

// const UserContext = React.createContext();
// const UserUpdateContext = React.createContext();

// export function useUser() {
//     return useContext(UserContext);
// }

// export function useUserUpdate(newUsername) {
//     return useContext(UserUpdateContext(newUsername));
// }

// export function UserProvider({children}) {
//     const [loggedInUser, setLoggedInUser] = useState({});
    
//     // function changeLoggedInUser(newUsername) {
//     //     setLoggedInUser(newUsername);
//     // }

//     return (
//         <UserProvider value={{loggedInUser, setLoggedInUser}}>
//             {children}
//         </UserProvider>
//     )
// }

export const UserContext = createContext(null);
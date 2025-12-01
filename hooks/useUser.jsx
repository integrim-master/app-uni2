// import { View, Text } from 'react-native'
// import React, { useCallback, useEffect, useState } from 'react'
// import wpService from '../services/wordpress';

// export const useUser = (token) => {
//     const [user, setUser] = useState(null);
//     const [loadingUser, setLoading] = useState(null);
//     const [error, setError] = useState(null);

//     const fetchUser = useCallback(async () =>{
//         try{
//             setLoading(true);
//             const userData = await wpService.getCurrentUser();
//             setUser(userData);
//         } catch (err) {
//             setError(err)
//         } finally {
//             setLoading(false)
//         }
//     }, []);

//     useEffect(() => {
//         if(token) {
//             fetchUser();
//         }
//     }, [token, fetchUser]);

//     const updateEmail = () => {
        
//     }
//     const updatePassword = () => {

//     }

//     //valores derivados

//     const firstName = user?.first_name || '';
//     const lastName = user?.last_name || '';
//     const email = user?.email || '';
//     const membresia = user?.membresia || '';


//     return {
//         user,
//         loadingUser,
//         error,
//         fetchUser,
//         updateEmail,
//         updatePassword,
//         firstName,
//         lastName,
//         email,
//         membresia,
//     }
// }
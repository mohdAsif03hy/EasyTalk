import React from 'react'
import { login } from '../lib/api';

import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useLogin = ()=> {
            const queryClient = useQueryClient();
        const {
        mutate,
        isPending,
        error,
    } = useMutation({
        mutationFn: login,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),

        onError:(error) =>{
        queryClient.invalidateQueries({ queryKey: ["authUser"] });

   toast.error(error.response.data.message);
},
    });

return { error, isPending, loginMutation:mutate};
};

export default useLogin

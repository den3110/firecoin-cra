import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "@/store/authReducer";
import { useCallback } from "react";

const useAuth = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const _setAuth = useCallback(
        (auth) => {
            dispatch(setAuth(auth));
        },
        [dispatch],
    );

    return [auth, _setAuth];
};

export default useAuth;

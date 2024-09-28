import { useContext } from "react";
//
import LocaleContext from "../contexts/LocaleContext";
// import { AuthContext } from '../contexts/Auth0Context';
// import { AuthContext } from '../contexts/FirebaseContext';
// import { AuthContext } from '../contexts/AwsCognitoContext';

// ----------------------------------------------------------------------

const useLocale = () => {
    const context = useContext(LocaleContext);

    if (!context) throw new Error("Locale context must be use inside LocaleProvider");

    return context;
};

export default useLocale;

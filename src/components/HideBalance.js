import { useContext } from "react";
import UIContext from "@/contexts/UIContext";

const HideBalance = ({ children, placehodler = "******" }) => {
    
    const { hideBalances } = useContext(UIContext);

    if (hideBalances) {
        return <span>{placehodler}</span>;
    }

    return children;
};

export default HideBalance;

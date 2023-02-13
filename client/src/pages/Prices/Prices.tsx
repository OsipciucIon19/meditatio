import {FC} from "react";
import {useTitle} from "../../hooks/useTitle";

const Prices: FC = () => {
    useTitle('Prețuri')
    
    return (
        <div>
            <h1>This is the prices page</h1>
        </div>
    )
}

export default Prices

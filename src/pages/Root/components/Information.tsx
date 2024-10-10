import { useState } from "react";
import InfoContent from "./InfoContent.tsx";
import InfoIcon from "./InfoIcon.tsx";

const Information = () => {
    const [openInformation, setOpenInformation] = useState(false);

    const toggleOpen = () => setOpenInformation((prevState) => !prevState);

    return (
        <div
            data-testid="information"
            className="fixed bottom(60) right(60) z(20000)"
            onClick={toggleOpen}
        >
            {openInformation ? <InfoContent /> : <InfoIcon />}
        </div>
    );
};

export default Information;

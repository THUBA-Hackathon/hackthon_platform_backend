import React from "react"
import MineTabs from "./mineTab";
import UserContext from "../../context/user-context";

class Mine extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div >
                <div className="container">
                    <UserContext.Consumer>
                        {value => <MineTabs props={value} />}
                    </UserContext.Consumer>
                </div>
            </div>
        )
    }
}

export default Mine;
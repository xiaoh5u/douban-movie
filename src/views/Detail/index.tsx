import React, { PureComponent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
interface IProps {
    match: any
}
interface IState {
    id: number
}
class detail extends PureComponent<IProps, IState, RouteComponentProps>{
    state = {
        id: this.props.match.params.id
    }

    render() {
        return (
            <>
                {this.state.id}
            </>
        )
    }

    componentDidMount() {
        console.log(this.state.id)
    }
}
export default detail
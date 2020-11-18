import React,{Component} from 'react';
import propTypes from 'prop-types'
import myContext from './myContext'
class ClickCounter extends Component {
    constructor(props) {
        super(props);
        this.onClickButton = this.onClickButton.bind(this);
        this.state = {count: 0};
        
    }
    
    onClickButton() {
        this.setState({count: this.state.count + 1});
    }

    render() {
        return (
          <div>
            <button onClick={this.onClickButton}>Click Me</button>
            <div>
              Click Count: {this.state.count}
            </div>
            <div>
              {this.props.name}
            </div>
            <div>
              
            </div>
          </div>
        );
    };
}
ClickCounter.propTypes={
  name:propTypes.string.isRequired
}
export default ClickCounter;
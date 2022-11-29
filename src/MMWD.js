import React from "react";
import "./MMWD.scss"
import Flip from 'react-reveal/Flip';

class MMWD extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showMidnight: false, showDate: false };
    this.handleMignightChange = this.handleMignightChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);

    setTimeout(() => {
        this.handleMignightChange();
        
        setTimeout(() => {
            this.handleDateChange();
        }, 1300);
    }, 1700);
  
      
  }
  handleMignightChange() {
    this.setState({ showMidnight: !this.state.showMidnight });
  }
  handleDateChange() {
    this.setState({ showDate: !this.state.showDate });
  }
  render() {
    return (
      <section>
        <Flip left when={this.state.showMidnight}>
          <div>Midnight</div>
        </Flip>
        <Flip left when={this.state.showDate}>
          <div>12.2</div>
        </Flip>
      </section>
    );
  }
}

export default MMWD;
 
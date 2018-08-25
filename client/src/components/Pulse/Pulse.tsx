import * as React from 'react';
import './Pulse.css';

interface IProps {
  enabled: boolean;
}

interface IState {
  height: string | number
}


export default class Pulse extends React.PureComponent<IProps, IState> {
  private containerRef = React.createRef();

  constructor(props: IProps) {
    super(props);

    this.state = {
      height: '100%'
    }
  }

  public componentDidMount() {
    const container = this.containerRef.current;

    const width = container && (container as any).offsetWidth;

    this.setState({ height: width });
  }

  public render() {
    return (
      <div 
        className={this.props.enabled ? "pulse" : ""} 
        ref={this.containerRef as any} 
        style={{ height: this.state.height }}
      >
        {this.props.children}
      </div>
    )
  }
}

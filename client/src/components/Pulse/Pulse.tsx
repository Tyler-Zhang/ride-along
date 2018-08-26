import * as React from 'react';
import './Pulse.css';

interface IProps {
  enabled: boolean;
  color?: 'red' | 'blue';
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
    const { color = 'red' } = this.props;
    return (
      <div 
        className={`pulse${ this.props.enabled ? ` pulse-enabled-${color}` : "" }`} 
        ref={this.containerRef as any} 
        style={{ height: this.state.height }}
      >
        {this.props.children}
      </div>
    )
  }
}
